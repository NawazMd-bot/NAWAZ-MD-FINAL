const { bot, parsedJid, isGroup, sleep } = require('../lib/')

bot(
  {
    pattern: 'hi ?(.*)', 
    desc: 'Spam group status silently',
    type: 'tools'
  },
  async (message, match) => {
    // Check if user replied to something
    if (
      !message.reply_message ||
      (!message.reply_message.image &&
        !message.reply_message.video &&
        !message.reply_message.text)
    ) {
      return await message.send('Reply to a message with *.hi <quantity>*')
    }

    // Extract quantity from match (last number in the command)
    const matchArgs = match ? match.split(' ') : []
    let quantity = 1
    
    // Agar aakhri argument number hai toh usko quantity maan lo
    if (matchArgs.length > 0 && !isNaN(matchArgs[matchArgs.length - 1])) {
      quantity = parseInt(matchArgs.pop())
    }

    const groupJid = parsedJid(matchArgs.join(' '))

    // Case 1: Current group mein spam karna
    if (groupJid.length === 0) {
      if (!isGroup(message.jid)) {
        return await message.send('Send group JID with command or use in group')
      }

      for (let i = 0; i < quantity; i++) {
        await message.groupStatus(message, message.jid)
        if (quantity > 1) await sleep(1500) // 1.5s delay for safety
      }
      return

    } else {
      // Case 2: Multi-groups mein spam karna
      for (const jid of groupJid) {
        if (!isGroup(jid)) continue
        try {
          for (let i = 0; i < quantity; i++) {
            await message.groupStatus(message, jid)
            if (quantity > 1) await sleep(1500)
          }
        } catch (e) {
          // Ignore errors
        }
      }
      return
    }
  }
)
