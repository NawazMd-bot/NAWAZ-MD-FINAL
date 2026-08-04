const { bot } = require('../lib/');
const axios = require('axios');

// ==========================================
// SIM SEARCH - BROKEN INXIDE DATABASE
// ==========================================
bot({
  pattern: 'sim ?(.*)',
  fromMe: true,
  desc: 'BROKEN INXIDE - SIM DATABASE',
  type: 'SAJID X NIGHTMARE',
}, async (message, match) => {
  
  try {
    let number = match?.trim();
    
    if (!number) {
      return message.send(
        '*╔════════════════════════════╗*\n' +
        '*║     📱 BROKEN INXIDE         ║*\n' +
        '*║      SIM DATABASE           ║*\n' +
        '*╚════════════════════════════╝*\n\n' +
        '*❓ EXAMPLE NUMBERS:*\n' +
        '`.sim 3140910051`\n' +
        '`.sim 3464979247`\n' +
        '`.sim 3339887313`\n\n' +
        '*✅ KISI BHI NUMBER KA DATA CHECK KARO:*\n' +
        '➤ Agar database mein data hoga to dikhayega\n' +
        '➤ Agar nahi hoga to "No Data Found" batayega\n\n' +
        '👑 *BROKEN INXIDE*'
      );
    }
    
    // Clean number format
    number = number.replace(/[\+\s\-]/g, '');
    number = number.replace(/^92/, '').replace(/^0/, '');
    
    // Remove 'dp' prefix if present
    if (number.startsWith('dp')) {
      number = number.replace('dp', '');
    }
    
    if (number.length < 10) {
      return message.send('❌ *BROKEN INXIDE:* Invalid number! Use 10-13 digits');
    }
    
    await message.send('🔍 *BROKEN INXIDE:* Searching database...');
    
    const res = await axios.get(`https://famofc.site/api/database.php?q=${number}`, {
      timeout: 15000
    });
    
    let data = res.data;
    
    // Extract data from API response
    let extractedData = {};
    let hasData = false;
    
    if (data && typeof data === 'object') {
      const metaFields = ['success', 'timestamp', 'credit', 'usage', 'examples', 'custom_example', 'error', 'message', 'status'];
      for (const field of metaFields) {
        delete data[field];
      }
      
      if (Array.isArray(data) && data.length > 0) {
        for (const item of data) {
          for (const [key, value] of Object.entries(item)) {
            if (value && value !== '' && value !== null && value !== 'null') {
              hasData = true;
              extractedData[key] = value;
            }
          }
        }
      } else if (data.data?.records && Array.isArray(data.data.records) && data.data.records.length > 0) {
        for (const record of data.data.records) {
          for (const [key, value] of Object.entries(record)) {
            if (value && value !== '' && value !== null && value !== 'null') {
              hasData = true;
              extractedData[key] = value;
            }
          }
        }
      } else if (data.result && typeof data.result === 'object') {
        for (const [key, value] of Object.entries(data.result)) {
          if (value && value !== '' && value !== null && value !== 'null') {
            hasData = true;
            extractedData[key] = value;
          }
        }
      } else {
        for (const [key, value] of Object.entries(data)) {
          if (value && value !== '' && value !== null && value !== 'null' && !metaFields.includes(key)) {
            hasData = true;
            extractedData[key] = value;
          }
        }
      }
    }
    
    if (!hasData || Object.keys(extractedData).length === 0) {
      return message.send(
        '*╔════════════════════════════╗*\n' +
        '*║     ❌ BROKEN INXIDE         ║*\n' +
        '*║      NO DATA FOUND          ║*\n' +
        '*╚════════════════════════════╝*\n\n' +
        `📱 *NUMBER:* ${number}\n` +
        `⏰ *TIME:* ${new Date().toLocaleString()}\n\n` +
        '*⚠️ Is number ka data database mein nahi hai*\n\n' +
        '👑 *BROKEN INXIDE*'
      );
    }
    
    // Display all data
    let text = '*╔════════════════════════════╗*\n';
    text += '*║     📱 BROKEN INXIDE         ║*\n';
    text += '*║      SIM RESULT             ║*\n';
    text += '*╚════════════════════════════╝*\n\n';
    
    // Field name mapping for better display
    const fieldMapping = {
      'full_name': 'FULL NAME',
      'name': 'FULL NAME',
      'phone': 'PHONE',
      'number': 'PHONE',
      'mobile': 'PHONE',
      'cnic': 'CNIC',
      'nic': 'CNIC',
      'address': 'ADDRESS',
      'full_address': 'ADDRESS',
      'location': 'ADDRESS',
      'operator': 'NETWORK',
      'network': 'NETWORK',
      'carrier': 'NETWORK',
      'city': 'CITY',
      'district': 'CITY',
      'status': 'STATUS',
      'date': 'DATE',
      'registered': 'DATE'
    };
    
    // Icon mapping
    const iconMap = {
      'FULL NAME': '📞',
      'PHONE': '📱',
      'CNIC': '📷',
      'ADDRESS': '🔘',
      'NETWORK': '📡',
      'CITY': '📍',
      'STATUS': '✅',
      'DATE': '📅'
    };
    
    for (const [key, value] of Object.entries(extractedData)) {
      if (value && value !== '' && value !== 'null' && value !== 'N/A') {
        const lowerKey = key.toLowerCase();
        let displayKey = key.replace(/_/g, ' ').toUpperCase();
        
        // Use mapped field name if available
        for (const [mapKey, mapValue] of Object.entries(fieldMapping)) {
          if (lowerKey.includes(mapKey)) {
            displayKey = mapValue;
            break;
          }
        }
        
        let icon = iconMap[displayKey] || '📌';
        text += `${icon} *${displayKey}:*\n${value}\n\n`;
      }
    }
    
    text += '━═━═━═━═━═━═━═━\n';
    text += `🔍 *SEARCHED:* ${number}\n`;
    text += `⏰ *TIME:* ${new Date().toLocaleString()}\n`;
    text += `👑 *OWNER:* BROKEN INXIDE\n`;
    text += `📡 *SOURCE:* BROKEN INXIDE Database\n`;
    text += '━═━═━═━═━═━═━═━';
    
    await message.send(text);
    
  } catch (err) {
    console.error('Error:', err.message);
    await message.send(
      '*╔════════════════════════════╗*\n' +
      '*║     ❌ BROKEN INXIDE         ║*\n' +
      '*║      API ERROR              ║*\n' +
      '*╚════════════════════════════╝*\n\n' +
      `*ERROR:* ${err.message}\n\n` +
      '👑 *BROKEN INXIDE*'
    );
  }
});

// ==========================================
// CNIC SEARCH - ALL SIMS DATA
// ==========================================
bot({
  pattern: 'cnic ?(.*)',
  fromMe: true,
  desc: 'BROKEN INXIDE - CNIC DATABASE',
  type: 'BROKEN INXIDE',
}, async (message, match) => {
  
  try {
    let cnic = match?.trim();
    
    if (!cnic) {
      return message.send(
        '*╔════════════════════════════╗*\n' +
        '*║     🆔 BROKEN INXIDE         ║*\n' +
        '*║      CNIC DATABASE          ║*\n' +
        '*╚════════════════════════════╝*\n\n' +
        '*❓ USAGE:*\n' +
        '`.cnic 3240251728118`\n\n' +
        '*✅ CNIC SE POORA DATA:*\n' +
        '➤ Us CNIC par jitney bhi sim hain\n' +
        '➤ Un sab ka data dikhayega\n\n' +
        '👑 *BROKEN INXIDE*'
      );
    }
    
    cnic = cnic.replace(/-/g, '');
    
    if (cnic.length !== 13 && cnic.length !== 15) {
      return message.send('❌ *BROKEN INXIDE:* Invalid CNIC! Use 13 digit number');
    }
    
    await message.send('🔍 *BROKEN INXIDE:* Searching CNIC database for all SIMs...');
    
    const res = await axios.get(`https://famofc.site/api/database.php?q=${cnic}`, {
      timeout: 15000
    });
    
    let data = res.data;
    
    let allRecords = [];
    let hasData = false;
    
    if (data && typeof data === 'object') {
      if (Array.isArray(data) && data.length > 0) {
        for (const item of data) {
          if (item && typeof item === 'object') {
            const record = {};
            for (const [key, value] of Object.entries(item)) {
              if (value && value !== '' && value !== null && value !== 'null' && 
                  !['success', 'timestamp', 'credit', 'usage', 'examples'].includes(key)) {
                record[key] = value;
              }
            }
            if (Object.keys(record).length > 0) {
              allRecords.push(record);
              hasData = true;
            }
          }
        }
      } else if (data.data?.records && Array.isArray(data.data.records) && data.data.records.length > 0) {
        for (const record of data.data.records) {
          const cleanRecord = {};
          for (const [key, value] of Object.entries(record)) {
            if (value && value !== '' && value !== null && value !== 'null') {
              cleanRecord[key] = value;
            }
          }
          if (Object.keys(cleanRecord).length > 0) {
            allRecords.push(cleanRecord);
            hasData = true;
          }
        }
      } else if (data.result && typeof data.result === 'object') {
        const cleanRecord = {};
        for (const [key, value] of Object.entries(data.result)) {
          if (value && value !== '' && value !== null && value !== 'null') {
            cleanRecord[key] = value;
          }
        }
        if (Object.keys(cleanRecord).length > 0) {
          allRecords.push(cleanRecord);
          hasData = true;
        }
      } else {
        const cleanRecord = {};
        const metaFields = ['success', 'timestamp', 'credit', 'usage', 'examples', 'custom_example', 'error', 'message'];
        for (const [key, value] of Object.entries(data)) {
          if (value && value !== '' && value !== null && value !== 'null' && !metaFields.includes(key)) {
            cleanRecord[key] = value;
          }
        }
        if (Object.keys(cleanRecord).length > 0) {
          allRecords.push(cleanRecord);
          hasData = true;
        }
      }
    }
    
    if (!hasData || allRecords.length === 0) {
      return message.send(
        '*╔════════════════════════════╗*\n' +
        '*║     ❌ BROKEN INXIDE         ║*\n' +
        '*║      NO DATA FOUND          ║*\n' +
        '*╚════════════════════════════╝*\n\n' +
        `🆔 *CNIC:* ${cnic}\n` +
        `⏰ *TIME:* ${new Date().toLocaleString()}\n\n` +
        '*⚠️ Is CNIC par koi SIM register nahi hai*\n\n' +
        '👑 *BROKEN INXIDE*'
      );
    }
    
    let text = '*╔════════════════════════════╗*\n';
    text += '*║     🆔 BROKEN INXIDE        ║*\n';
    text += '*║      CNIC RESULT            ║*\n';
    text += '*║  (SAB SIM KA DATA)          ║*\n';
    text += '*╚════════════════════════════╝*\n\n';
    
    text += `📇 *TOTAL SIMS FOUND:* ${allRecords.length}\n\n`;
    
    const fieldMapping = {
      'full_name': 'FULL NAME',
      'name': 'FULL NAME',
      'phone': 'PHONE',
      'number': 'PHONE',
      'cnic': 'CNIC',
      'address': 'ADDRESS',
      'operator': 'NETWORK',
      'network': 'NETWORK'
    };
    
    const iconMap = {
      'FULL NAME': '📞',
      'PHONE': '📱',
      'CNIC': '📷',
      'ADDRESS': '🔘',
      'NETWORK': '📡'
    };
    
    for (let i = 0; i < allRecords.length; i++) {
      const record = allRecords[i];
      
      if (allRecords.length > 1) {
        text += `┏━━━━━━━━━━━━━━━━━━━━┓\n`;
        text += `┃   SIM #${i + 1}      ┃\n`;
        text += `┗━━━━━━━━━━━━━━━━━━━━┛\n\n`;
      }
      
      for (const [key, value] of Object.entries(record)) {
        if (value && value !== '' && value !== 'null') {
          let displayKey = key.replace(/_/g, ' ').toUpperCase();
          for (const [mapKey, mapValue] of Object.entries(fieldMapping)) {
            if (key.toLowerCase().includes(mapKey)) {
              displayKey = mapValue;
              break;
            }
          }
          let icon = iconMap[displayKey] || '📌';
          text += `${icon} *${displayKey}:*\n${value}\n\n`;
        }
      }
      
      if (i < allRecords.length - 1) {
        text += '━═━═━═━═━═━═━═━\n\n';
      }
    }
    
    text += '━═━═━═━═━═━═━═━\n';
    text += `🔍 *SEARCHED CNIC:* ${cnic}\n`;
    text += `⏰ *TIME:* ${new Date().toLocaleString()}\n`;
    text += `👑 *OWNER:* BROKEN INXIDE\n`;
    text += `📡 *SOURCE:* BROKEN INXIDE Database\n`;
    text += '━═━═━═━═━═━═━═━';
    
    await message.send(text);
    
  } catch (err) {
    await message.send(`❌ *BROKEN INXIDE:* Error - ${err.message}`);
  }
});

// ==========================================
// BOT INFO
// ==========================================
bot({
  pattern: 'simdb',
  fromMe: true,
  desc: 'BROKEN INXIDE - DATABASE INFO',
  type: 'BROKEN INXIDE',
}, async (message) => {
  await message.send(
    '*╔════════════════════════════════╗*\n' +
    '*║         🤖 BROKEN INXIDE        ║*\n' +
    '*║     SIM DATABASE PLUGIN         ║*\n' +
    '*║          VERSION 3.0            ║*\n' +
    '*╚════════════════════════════════╝*\n\n' +
    '*📋 COMMANDS:*\n' +
    '➤ `.sim <number>` - SIM Search\n' +
    '➤ `.cnic <cnic>` - CNIC Search (All SIMs)\n' +
    '➤ `.simdb` - Bot Info\n\n' +
    '*📱 EXAMPLE NUMBERS:*\n' +
    '➤ 3140910051\n' +
    '➤ 3464979247\n' +
    '➤ 3339887313\n\n' +
    '*✅ FEATURES:*\n' +
    '➤ Jo bhi number dalo, database mein check hoga\n' +
    '➤ Agar data hai to dikhayega\n' +
    '➤ Agar nahi hai to "No Data Found" batayega\n' +
    '➤ CNIC se us par jitney bhi SIM hain, sab ka data\n\n' +
    '👑 *BROKEN INXIDE*'
  );
});