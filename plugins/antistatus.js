const { bot, getVars, setVar } = require('../lib/');

const warnCount = new Map();

async function getMode(sessionId, jid) {
  const vars = await getVars(sessionId);
  const data = vars.ANTISTATUS ? JSON.parse(vars.ANTISTATUS) : {};
  return data[jid] || null;
}

async function setMode(sessionId, jid, mode) {
  const vars = await getVars(sessionId);
  const data = vars.ANTISTATUS ? JSON.parse(vars.ANTISTATUS) : {};
  if (mode === null) delete data[jid];
  else data[jid] = mode;
  await setVar({ ANTISTATUS: JSON.stringify(data) }, sessionId);
}

async function getWarns(sessionId, jid) {
  const vars = await getVars(sessionId);
  const data = vars.ANTISTATUS_WARNS ? JSON.parse(vars.ANTISTATUS_WARNS) : {};
  return data[jid] || {};
}

async function setWarns(sessionId, jid, warns) {
  const vars = await getVars(sessionId);
  const data = vars.ANTISTATUS_WARNS ? JSON.parse(vars.ANTISTATUS_WARNS) : {};
  data[jid] = warns;
  await setVar({ ANTISTATUS_WARNS: JSON.stringify(data) }, sessionId);
}

bot(
  {
    pattern: 'antistatus ?(.*)',
    fromMe: true,
    onlyGroup: true,
    desc: 'Anti group status',
    type: 'Raza',
  },
  async (message, match) => {
    const arg = match.trim().toLowerCase();

    if (arg === 'null' || arg === 'on') {
      await setMode(message.id, message.jid, 'null');
      return message.send('*Anti Status ON*\n_Mode: Delete_');
    }

    if (arg === 'warn') {
      await setMode(message.id, message.jid, 'warn');
      return message.send('*Anti Status ON*\n_Mode: Warn_');
    }

    if (arg === 'kick') {
      await setMode(message.id, message.jid, 'kick');
      return message.send('*Anti Status ON*\n_Mode: Kick_');
    }

    if (arg === 'off') {
      await setMode(message.id, message.jid, null);
      await setWarns(message.id, message.jid, {});
      return message.send('_Anti Status OFF_');
    }

    if (arg === 'reset') {
      await setWarns(message.id, message.jid, {});
      return message.send('_All warns reset for this group_');
    }

    const mode = await getMode(message.id, message.jid);
    const status = mode ? `✅ ON — Mode: *${mode}*` : '❌ OFF';
    return message.send(
      `*Anti Status:* ${status}\n\n*Usage:*\n.antistatus null\n.antistatus warn\n.antistatus kick\n.antistatus off\n.antistatus reset`
    );
  }
);

bot(
  {
    on: 'message',
    fromMe: false,
    onlyGroup: true,
  },
  async (message) => {
    try {
      const mode = await getMode(message.id, message.jid);
      if (!mode) return;

      const rawMsg = message.message;
      if (!rawMsg) return;

      const innerMsg = rawMsg.message;
      if (!innerMsg) return;

      const key = rawMsg.key;
      const participant = key.participant || message.participant;

      const contextInfo =
        innerMsg?.extendedTextMessage?.contextInfo ||
        innerMsg?.imageMessage?.contextInfo ||
        innerMsg?.videoMessage?.contextInfo ||
        innerMsg?.audioMessage?.contextInfo;

      const isGroupStatus =
        !!innerMsg?.groupStatusMessageV2 ||
        message.type === 'groupStatusMessageV2' ||
        innerMsg?.extendedTextMessage?.contextInfo?.isGroupStatus === true ||
        !!innerMsg?.extendedTextMessage?.contextInfo?.quotedMessage?.groupStatusMessageV2 ||
        contextInfo?.isGroupStatus === true ||
        !!contextInfo?.quotedMessage?.groupStatusMessageV2;

      if (!isGroupStatus) return;

      await message.client.sendMessage(message.jid, {
        delete: {
          remoteJid: message.jid,
          fromMe: false,
          id: key.id,
          participant,
        },
      });

      const tag = `@${participant.split('@')[0]}`;

      if (mode === 'null') return;

      if (mode === 'kick') {
        await message.client.sendMessage(message.jid, {
          text: `🚫 ${tag}\n_Removed for sharing status in this group._`,
          mentions: [participant],
        });
        await message.Kick(participant, message.jid);
        return;
      }

      if (mode === 'warn') {
        const warns = await getWarns(message.id, message.jid);
        const current = (warns[participant] || 0) + 1;
        warns[participant] = current;
        await setWarns(message.id, message.jid, warns);

        if (current < 3) {
          await message.client.sendMessage(message.jid, {
            text: `⚠️ ${tag}\n\n*Warning ${current}/3* — Do not share status!\n_${3 - current} warning(s) left before kick_`,
            mentions: [participant],
          });
        } else {
          warns[participant] = 0;
          await setWarns(message.id, message.jid, warns);
          await message.client.sendMessage(message.jid, {
            text: `🚫 ${tag}\n\n*3/3 Warnings reached!*\n_Removed from group for sharing status._`,
            mentions: [participant],
          });
          await message.Kick(participant, message.jid);
        }
      }
    } catch (err) {
      console.log('[antistatus error]', err.message);
    }
  }
);