const { bot } = require('../lib/')

// ===============================
// AUTO REPLIES
// ===============================

const SALAM_REPLIES = [
  '𝐖𝐀𝐋𝐀𝐈𝐊𝐔𝐌𝐒𝐀𝐋𝐀𝐌 ° 🎀🤍',
  '𝐖𝐀𝐋𝐀𝐈𝐊𝐔𝐌𝐒𝐀𝐋𝐀𝐌 𝐖𝐀 𝐑𝐀𝐇𝐌𝐀𝐓𝐔𝐋𝐋𝐀𝐇𝐈 𝐖𝐀 𝐁𝐀𝐑𝐀𝐊𝐀𝐓𝐎𝐇𝐔 ° 🌸🤍',
  '𝐖𝐀𝐋𝐀𝐈𝐊𝐔𝐌𝐒𝐀𝐋𝐀𝐌 ° 💫🤍',
  '𝐖𝐀𝐋𝐀𝐈𝐊𝐔𝐌𝐒𝐀𝐋𝐀𝐌 ° 🕊️🤍',
  '𝐖𝐀𝐋𝐀𝐈𝐊𝐔𝐌𝐒𝐀𝐋𝐀𝐌 ° ✨🤍'
]

const GREETING_REPLIES = [
  'ʜᴇʟʟᴏ 👋🤍',
  'ʜɪɪ 🌸🤍',
  'ʜᴇʏ 💫🤍',
  'ʜᴇʟʟᴏ ᴛʜᴇʀᴇ 🕊️🤍',
  'ʜɪ, ʜᴏᴡ ᴀʀᴇ ʏᴏᴜ? ✨🤍'
]

// ===============================
// TRIGGERS
// ===============================

const SALAM_TRIGGERS = [
  'assalamualaikum',
  'assalamu alaikum',
  'assalamu alaykum',
  'asalamualaikum',
  'aslamualaikum',
  'assalamu',
  'asalamu'
]

const GREETING_TRIGGERS = [
  'hi',
  'hello',
  'hey',
  'hy',
  'hii',
  'helo'
]

const BLOCK_WORDS = [
  'walaikum',
  'walaikumsalam',
  'w salam',
  'walikum',
  'walykum',
  'reply',
  'bot'
]

// ===============================
// SETTINGS
// ===============================

const lastReplyTime = new Map()
const COOLDOWN_MS = 5000

global.AUTO_SALAM_DISABLED = global.AUTO_SALAM_DISABLED || new Set()

// ===============================
// MAIN AUTO REPLY
// ===============================

bot(
  {
    on: 'text',
    fromMe: false
  },
  async (message) => {
    try {
      const text = (message.text || message.body || '').trim()
      if (!text) return

      const chatId = message.jid

      if (global.AUTO_SALAM_DISABLED.has(chatId)) return

      const cleanText = text.toLowerCase().replace(/\s+/g, ' ').trim()

      // Anti Spam
      const cooldownKey = `${chatId}_${message.sender}`
      const now = Date.now()

      if (
        lastReplyTime.has(cooldownKey) &&
        now - lastReplyTime.get(cooldownKey) < COOLDOWN_MS
      ) {
        return
      }

      // ===============================
      // SALAM DETECTION (WORKS EVERYWHERE)
      // ===============================

      if (!BLOCK_WORDS.some(word => cleanText.includes(word))) {
        const isSalam = SALAM_TRIGGERS.some(trigger =>
          cleanText.startsWith(trigger) ||
          cleanText === trigger
        )

        if (isSalam) {
          lastReplyTime.set(cooldownKey, now)

          const reply =
            SALAM_REPLIES[
              Math.floor(Math.random() * SALAM_REPLIES.length)
            ]

          return await message.send(reply, {
            quoted: message.data
          })
        }
      }

      // ===============================
      // HI / HELLO DETECTION
      // ===============================

      const isGreeting = GREETING_TRIGGERS.some(trigger =>
        cleanText === trigger ||
        cleanText.startsWith(trigger + ' ')
      )

      if (!isGreeting) return

      // Private Chat -> Always Reply
      if (!message.isGroup) {
        lastReplyTime.set(cooldownKey, now)

        const reply =
          GREETING_REPLIES[
            Math.floor(Math.random() * GREETING_REPLIES.length)
          ]

        return await message.send(reply, {
          quoted: message.data
        })
      }

      // Group -> Reply Only If Bot Is Mentioned
      const botNumber =
        message.client.user.id.split(':')[0] + '@s.whatsapp.net'

      const mentioned =
        message.mention ||
        message.data?.message?.extendedTextMessage?.contextInfo
          ?.mentionedJid ||
        []

      if (mentioned.includes(botNumber)) {
        lastReplyTime.set(cooldownKey, now)

        const reply =
          GREETING_REPLIES[
            Math.floor(Math.random() * GREETING_REPLIES.length)
          ]

        return await message.send(reply, {
          quoted: message.data
        })
      }
    } catch (error) {
      console.error('Auto Reply Error:', error)
    }
  }
)

// ===============================
// TOGGLE COMMAND
// ===============================

bot(
  {
    pattern: 'salam ?(.*)',
    fromMe: true,
    desc: 'Enable/Disable Auto Salam',
    type: 'tools'
  },
  async (message, match) => {
    try {
      const chatId = message.jid
      const action = (match || '').trim().toLowerCase()

      if (action === 'on') {
        global.AUTO_SALAM_DISABLED.delete(chatId)
        return await message.send('*✅ Auto Reply Enabled!*')
      }

      if (action === 'off') {
        global.AUTO_SALAM_DISABLED.add(chatId)
        return await message.send('*🚫 Auto Reply Disabled!*')
      }

      const disabled = global.AUTO_SALAM_DISABLED.has(chatId)

      await message.send(
        `*📋 Auto Reply Status*\n\n` +
        `*Chat:* ${message.isGroup ? 'Group' : 'Private'}\n` +
        `*Status:* ${disabled ? '❌ Disabled' : '✅ Enabled'}\n\n` +
        `*Usage:*\n` +
        `.salam on\n` +
        `.salam off`
      )
    } catch (error) {
      console.error('Toggle Error:', error)
      await message.send(`*❌ Error:* ${error.message}`)
    }
  }
)