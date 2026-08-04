const { bot, isUrl, getData, setData } = require('../lib/');

// 🔹 Defaults
const DEFAULTS = {
  enabled: false,
  limit: 6,
  cooldown: 2 * 60 * 1000,
  allowed: [
    "https://chat.whatsapp.com/Jqcquw5HyWl0h8A3YskW2d",
    "https://chat.whatsapp.com/B7SpWPiwnlh389hUAusHvC"
  ],
  mode: "warn" // ✅ new (default behavior same as before)
};

// Runtime trackers
const linkCount = {};
const lastTime = {};
const warned = {};
const processedMsgs = new Set();

// 🔹 Get settings
async function getSettings(jid) {
  let data = await getData(`antilink_${jid}`);
  if (!data) {
    data = DEFAULTS;
    await setData(`antilink_${jid}`, data);
  }
  return data;
}

// 🔹 Save settings
async function saveSettings(jid, newData) {
  const old = await getSettings(jid);
  const updated = { ...old, ...newData };
  await setData(`antilink_${jid}`, updated);
  return updated;
}

// 🎛️ COMMAND PANEL
bot(
  {
    pattern: 'slinkall ?(.*)',
    fromMe: true,
    onlyGroup: true,
    desc: 'Anti-link control panel',
    type: 'Raza'
  },
  async (message, match) => {
    const args = match.trim().split(' ');
    const cmd = args[0]?.toLowerCase();

    const data = await getSettings(message.jid);

    if (!cmd) {
      return await message.send(
        `*Anti-Link Settings*\n\n` +
        `Status: ${data.enabled ? 'ON' : 'OFF'}\n` +
        `Mode: ${data.mode}\n` +
        `Limit: ${data.limit}\n` +
        `Cooldown: ${data.cooldown / 1000}s\n` +
        `Allowed:\n${data.allowed.join('\n')}`
      );
    }

    if (cmd === 'on') {
      await saveSettings(message.jid, { enabled: true });
      return await message.send('_Anti-link enabled_');
    }

    if (cmd === 'off') {
      await saveSettings(message.jid, { enabled: false });
      return await message.send('_Anti-link disabled_');
    }

    // ✅ MODE CONTROL
    if (cmd === 'null') {
      await saveSettings(message.jid, { mode: 'null' });
      return await message.send('_Mode set to NULL (delete only)_');
    }

    if (cmd === 'warn') {
      await saveSettings(message.jid, { mode: 'warn' });
      return await message.send('_Mode set to WARN (warn + delete)_');
    }

    if (cmd === 'cooldown') {
      const num = parseInt(args[1]);
      if (!isNaN(num) && num > 0) {
        await saveSettings(message.jid, { cooldown: num * 1000 });
        return await message.send(`_Cooldown set to ${num}s_`);
      }
    }

    if (cmd === 'allow') {
      const link = args.slice(1).join(' ');
      if (link) {
        const current = data.allowed || [];
        if (!current.includes(link.trim())) {
          current.push(link.trim());
        }
        await saveSettings(message.jid, { allowed: current });
        return await message.send('_Link added to allowed list_');
      }
    }

    const num = parseInt(cmd);
    if (!isNaN(num) && num > 0) {
      await saveSettings(message.jid, { limit: num });
      return await message.send(`_Limit set to ${num}_`);
    }

    return await message.send('_Invalid command_');
  }
);

// 🔍 MAIN LISTENER
bot(
  {
    on: 'text',
    fromMe: false,
    onlyGroup: true,
  },
  async (message) => {
    try {
      const msgId = message.message?.key?.id;

      if (processedMsgs.has(msgId)) return;
      processedMsgs.add(msgId);
      setTimeout(() => processedMsgs.delete(msgId), 60000);

      const sender =
        message.message?.key?.participant || message.participant;
      if (!sender) return;

      const text = message.text || '';
      if (!text) return;

      const settings = await getSettings(message.jid);
      if (!settings.enabled) return;

      const { limit, cooldown, allowed, mode } = settings;

      const hasLink = text.split(' ').some(word =>
        isUrl(word) &&
        (
          word.includes('chat.whatsapp.com') ||
          word.includes('wa.me') ||
          word.includes('whatsapp.com/channel')
        )
      );

      if (!hasLink) return;

      if (allowed && allowed.some(link => text.includes(link))) return;

      await message.client.sendMessage(message.jid, {
        delete: { ...message.message.key, fromMe: false }
      });

      const meta = await message.client.groupMetadata(message.jid);
      const admins = meta.participants
        .filter(p => p.admin !== null)
        .map(p => p.id);

      if (admins.includes(sender)) return;

      const key = `${message.jid}_${sender}`;
      const now = Date.now();

      if (!lastTime[key] || now - lastTime[key] > cooldown) {
        linkCount[key] = 0;
        warned[key] = false;
      }

      lastTime[key] = now;
      linkCount[key] = (linkCount[key] || 0) + 1;

      // ⚠️ ONLY IF MODE = WARN
      if (mode === 'warn' && !warned[key]) {
        warned[key] = true;

        await message.client.sendMessage(message.jid, {
          text: `@${sender.split('@')[0]} _Link Allow Ni Han So Again Link Na Aye_ 🙂⚠️`,
          mentions: [sender],
        });
      }

      if (linkCount[key] >= limit) {
        delete linkCount[key];
        delete lastTime[key];
        delete warned[key];

        await message.Kick(sender, message.jid);
      }

    } catch (err) {
      console.log(err);
    }
  }
);