const { bot } = require('../lib')

bot(
{
  pattern: 'tshare ?(.*)',
  fromMe: true,
  desc: 'Share replied message in groups',
  type: 'Raza'
},
async (message, match) => {

  if (!message.reply_message) {
    return await message.send("❌ Reply to a message")
  }

  const client = message.client
  const reply = message.reply_message

  const groups = await client.groupFetchAllParticipating()

  // IF NO NUMBER => ALL GROUPS
  const groupIds = match
    ? Object.keys(groups).slice(0, parseInt(match))
    : Object.keys(groups)

  const buffer = await reply.downloadMediaMessage().catch(() => null)

  // ORIGINAL TEXT / CAPTION
  const finalText =
    reply.text ||
    reply.caption ||
    reply.message?.conversation ||
    ""

  let sent = 0

  for (const jid of groupIds) {

    try {

      let mentions = []

      try {
        const group = await client.groupMetadata(jid)
        mentions = group.participants.map(p => p.id)
      } catch {}

      // IMAGE
      if (reply.image && buffer) {
        await client.sendMessage(jid, {
          image: buffer,
          caption: finalText,
          mentions
        })
      }

      // VIDEO
      else if (reply.video && buffer) {
        await client.sendMessage(jid, {
          video: buffer,
          caption: finalText,
          mentions
        })
      }

      // AUDIO / VOICE
      else if (reply.audio && buffer) {
        await client.sendMessage(jid, {
          audio: buffer,
          mimetype: reply.mimetype || 'audio/mpeg',
          ptt: reply.ptt || false
        })
      }

      // DOCUMENT
      else if (reply.document && buffer) {
        await client.sendMessage(jid, {
          document: buffer,
          mimetype: reply.mimetype || 'application/octet-stream',
          fileName: reply.fileName || 'file',
          caption: finalText
        })
      }

      // STICKER
      else if (reply.sticker && buffer) {
        await client.sendMessage(jid, {
          sticker: buffer
        })
      }

      // LOCATION
      else if (reply.location) {
        await client.sendMessage(jid, {
          location: reply.location
        })
      }

      // TEXT
      else {
        await client.sendMessage(jid, {
          text: finalText,
          mentions
        })
      }

      sent++

    } catch (e) {
      console.log(e)
      continue
    }
  }

  await message.send(`✅ Sent in ${sent} groups`)
}
)