const { bot, forwardOrBroadCast } = require('../lib/');

bot(
  {
    pattern: 'sharjeel ?(.*)',
    fromMe: true, // Optional: add if you only want the bot owner to use it
    desc: 'Tag members with plain text only',
    type: 'group',
  },
  async (message, match) => {
    // Split input to get JID and Count
    const [groupJid, countStr] = match.split(' ');
    const count = parseInt(countStr) || 1;

    // Validation: Check for JID and if user is replying to a message
    if (!groupJid || !message.reply_message) {
      return await message.send(
        '*Usage:*\n.mtag <groupJID> <count>\n_Reply to a message to tag everyone with text only._',
        { quoted: message.data }
      );
    }

    try {
      // Get all group participants for tagging
      const participants = await message.groupMetadata(groupJid);
      const mentionIds = participants.map(({ id }) => id);

      // Clean options: No link preview, no image, only mentions
      const options = {
        contextInfo: {
          mentionedJid: mentionIds,
        },
      };

      // Loop based on requested count
      for (let i = 0; i < count; i++) {
        await forwardOrBroadCast(groupJid, message, options);
      }

    } catch (err) {
      console.error(err);
      await message.send('*Error: Ensure the JID is correct and I am in that group.*', { quoted: message.data });
    }
  }
);