const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for active sessions
const sessions = new Map();

// Cleanup old sessions every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.createdAt > 10 * 60 * 1000) { // 10 min timeout
      if (session.sock) {
        try { session.sock.end(undefined); } catch(e) {}
      }
      sessions.delete(id);
    }
  }
}, 5 * 60 * 1000);

// Generate Session ID in NAWAZ MD format
function generateSessionId(phoneNumber, creds) {
  // NAWAZ MD uses a custom session ID format: base64 encoded credentials
  // We'll store the auth credentials as a JSON and encode it
  const authData = {
    creds: creds,
    phone: phoneNumber,
    timestamp: Date.now()
  };
  return Buffer.from(JSON.stringify(authData)).toString('base64');
}

// API: Start pairing process
app.post('/api/pair', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Clean phone number - remove +, spaces, dashes
    const cleanNumber = String(phoneNumber).replace(/[^0-9]/g, '');
    
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    const sessionId = uuidv4();
    
    // Store session
    sessions.set(sessionId, {
      id: sessionId,
      phoneNumber: cleanNumber,
      createdAt: Date.now(),
      status: 'connecting',
      pairingCode: null,
      creds: null
    });

    // Import Baileys dynamically
    const baileys = require('@whiskeysockets/baileys');
    const { makeWASocket, useMultiFileAuthState, Browsers } = baileys;

    // Create temp auth directory
    const authDir = `/tmp/auth_${sessionId}`;
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    const sock = makeWASocket({
      auth: state,
      browser: Browsers.ubuntu('NAWAZ MD'),
      printQRInTerminal: false,
    });

    sessions.get(sessionId).sock = sock;

    sock.ev.on('creds.update', () => {
      saveCreds();
    });

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;
      
      const session = sessions.get(sessionId);
      if (!session) return;

      if (connection === 'connecting' || qr) {
        try {
          const pairingCode = await sock.requestPairingCode(cleanNumber);
          session.pairingCode = pairingCode;
          session.status = 'pairing_code_ready';
        } catch (err) {
          session.status = 'error';
          session.error = err.message;
        }
      }

      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        if (statusCode === baileys.DisconnectReason.restartRequired) {
          // Session restarted successfully after pairing
          session.status = 'connected';
          try {
            // Read saved creds
            const credsPath = path.join(authDir, 'creds.json');
            if (fs.existsSync(credsPath)) {
              const creds = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
              session.creds = creds;
              session.sessionId = generateSessionId(cleanNumber, creds);
            }
          } catch (e) {}
          // Clean up
          try { fs.rmSync(authDir, { recursive: true }); } catch(e) {}
        }
      }

      if (connection === 'open') {
        session.status = 'connected';
        try {
          const credsPath = path.join(authDir, 'creds.json');
          if (fs.existsSync(credsPath)) {
            const creds = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
            session.creds = creds;
            session.sessionId = generateSessionId(cleanNumber, creds);
          }
        } catch (e) {}
        try { fs.rmSync(authDir, { recursive: true }); } catch(e) {}
      }
    });

    res.json({
      success: true,
      sessionId: sessionId,
      message: 'Connecting... Please wait for pairing code.',
      status: 'connecting'
    });

  } catch (error) {
    console.error('Pair error:', error);
    res.status(500).json({ error: 'Failed to start pairing: ' + error.message });
  }
});

// API: Check session status
app.get('/api/status/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const response = {
    status: session.status,
    pairingCode: session.pairingCode
  };

  if (session.status === 'connected' && session.sessionId) {
    response.sessionId = session.sessionId;
  }

  if (session.status === 'error') {
    response.error = session.error;
  }

  res.json(response);
});

// API: Poll for pairing code
app.get('/api/pairing-code/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  if (session.status === 'pairing_code_ready' && session.pairingCode) {
    return res.json({
      status: 'pairing_code_ready',
      pairingCode: session.pairingCode,
      message: 'Enter this pairing code on your WhatsApp: Linked Devices > Link with phone number'
    });
  }

  if (session.status === 'connected' && session.sessionId) {
    return res.json({
      status: 'connected',
      sessionId: session.sessionId
    });
  }

  if (session.status === 'error') {
    return res.json({
      status: 'error',
      error: session.error
    });
  }

  res.json({
    status: session.status,
    message: 'Waiting for pairing code...'
  });
});

// Root route - serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NAWAZ MD Session Pairing running on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
});
