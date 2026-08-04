const { bot } = require('../lib/')
const fs = require('fs')
const { exec } = require('child_process')

bot(
  {
    pattern: 'tovn',
    fromMe: true,
    desc: 'Convert audio/video to voice note',
    type: 'tools'
  },
  async (message) => {

    if (!message.reply_message) {
      return await message.send("❌ Reply to audio or video")
    }

    const reply = message.reply_message

    if (!reply.audio && !reply.video) {
      return await message.send("❌ Reply to audio/video only")
    }

    try {
      // 📥 Download media
      const inputPath = await reply.downloadAndSaveMediaMessage("input")
      const outputPath = "output.ogg"

      // 🎧 Convert to WhatsApp voice format (opus)
      exec(
        `ffmpeg -i "${inputPath}" -vn -c:a libopus -b:a 128k "${outputPath}"`,
        async (err) => {
          if (err) {
            console.log(err)
            return await message.send("❌ Conversion failed")
          }

          // 📤 Send as voice note
          await message.client.sendMessage(message.jid, {
            audio: fs.readFileSync(outputPath),
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
          })

          // 🧹 Clean files
          fs.unlinkSync(inputPath)
          fs.unlinkSync(outputPath)
        }
      )

    } catch (e) {
      console.log(e)
      await message.send("❌ Error occurred")
    }
  }
)