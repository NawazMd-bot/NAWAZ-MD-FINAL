const { bot, parsedJid, isGroup } = require('../lib/')

bot(
  {
    pattern: 'gst ?(.*)',
    desc: 'Update group status',
    type: 'tools'
  },
  async (message, match) => {
    if (
      !message.reply_message ||
      (!message.reply_message.image &&
        !message.reply_message.video &&
        !message.reply_message.text)
    ) {
      return await message.send('Reply to a message with *.gst*')
    }

    const client = message.client
    const groups = Object.values(await client.groupFetchAllParticipating())

    await Promise.all(
      groups.map(async g => {
        try {
          await message.groupStatus(message, g.id)
        } catch {}
      })
    )

    await message.send(`Updated *${groups.length}*`)
  }
)