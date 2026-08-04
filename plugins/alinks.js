const { bot, getData, setData } = require('../lib')
const fetch = require('node-fetch')

const DB_KEY = 'alinks_settings'

async function loadSettings() {
  let data = await getData(DB_KEY)

  if (!data) {
    data = {
      targetJids: [],
      customMsg: '',
      enabled: false
    }

    await setData(DB_KEY, data)
  }

  return data
}

async function saveSettings(data) {
  await setData(DB_KEY, data)
}

const delay = (ms) =>
  new Promise(r => setTimeout(r, ms))

// Prevent duplicate links
const sentLinks = new Set()

bot(
{
  pattern: 'alinks ?(.*)',
  fromMe: true,
  desc: 'Alinks Control System',
  type: 'tools'
},
async (message, match) => {

  const settings = await loadSettings()

  const args = match.trim().split(' ')
  const cmd = args.shift()?.toLowerCase()
  const value = args.join(' ').trim()

  if (!cmd || cmd === 'check') {

    return await message.send(
`Status: ${settings.enabled ? 'ON' : 'OFF'}

Targets:
${settings.targetJids.length
? settings.targetJids.join('\n')
: 'No JIDs'}

Message:
${settings.customMsg || 'No Message'}`
    )
  }

  if (cmd === 'on') {

    settings.enabled = true
    await saveSettings(settings)

    return await message.send('✅ Enabled')
  }

  if (cmd === 'off') {

    settings.enabled = false
    await saveSettings(settings)

    return await message.send('❌ Disabled')
  }

  if (cmd === 'add') {

    if (!value.includes('@')) {
      return await message.send('❌ Invalid JID')
    }

    if (!settings.targetJids.includes(value)) {
      settings.targetJids.push(value)
      await saveSettings(settings)
    }

    return await message.send('✅ Added')
  }

  if (
    cmd === 'del' ||
    cmd === 'remove'
  ) {

    settings.targetJids =
      settings.targetJids.filter(
        j => j !== value
      )

    await saveSettings(settings)

    return await message.send('❌ Removed')
  }

  if (cmd === 'msg') {

    settings.customMsg = value
    await saveSettings(settings)

    return await message.send('✅ Updated')
  }

  if (cmd === 'clear') {

    settings.targetJids = []
    settings.customMsg = ''

    await saveSettings(settings)

    return await message.send('✅ Cleared')
  }

  return await message.send(
`alinks on
alinks off
alinks check

alinks add jid
alinks del jid

alinks msg text

alinks clear`
  )
})

bot(
{
  on: 'text',
  fromMe: false
},
async (message) => {

  try {

    const settings =
      await loadSettings()

    if (!settings.enabled) return

    if (
      !settings.targetJids.length
    ) return

    const text =
      message.text ||
      message.body ||
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    if (!text) return

    const regex =
      /https?:\/\/chat\.whatsapp\.com\/[0-9A-Za-z]+/gi

    const matches = text.match(regex)

    if (!matches) return

    await delay(1500)

    for (const link of matches) {

      // Skip already sent links
      if (sentLinks.has(link))
        continue

      const code =
        link.split('/').pop()

      try {

        const meta =
          await message.client.groupGetInviteInfo(code)

        const groupName =
          meta.subject ||
          'WhatsApp Group'

        const groupId = meta.id

        let thumbBuffer = null

        try {

          const ppUrl =
            await message.client.profilePictureUrl(
              groupId,
              'image'
            )

          const res =
            await fetch(ppUrl)

          thumbBuffer =
            await res.buffer()

        } catch {}

        for (const jid of settings.targetJids) {

          await message.client.sendMessage(
            jid,
            {
              text:
`${settings.customMsg || ''}
${link}`,

              contextInfo: {
                externalAdReply: {
                  title: groupName,
                  body:
`Invite to join "${groupName}"`,
                  mediaType: 1,
                  previewType: 'PHOTO',
                  renderLargerThumbnail: true,
                  thumbnail: thumbBuffer,
                  sourceUrl: link
                }
              }
            }
          )
        }

        // Save sent link
        sentLinks.add(link)

        if (sentLinks.size > 500) {
          sentLinks.clear()
        }

      } catch (err) {

        for (const jid of settings.targetJids) {

          await message.client.sendMessage(
            jid,
            {
              text:
`${settings.customMsg || ''}
${link}`
            }
          )
        }

        // Save failed links too
        sentLinks.add(link)

        if (sentLinks.size > 500) {
          sentLinks.clear()
        }
      }
    }

  } catch (err) {
    console.log(err)
  }
})