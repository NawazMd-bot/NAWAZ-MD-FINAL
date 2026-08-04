const {
  addSpace,
  textToStylist,
  getUptime,
  getRam,
  getDate,
  getPlatform,
  bot,
  lang,
} = require('../lib/')

// ═══════════════════════════════════════════
// NAWAZ MD - HEAVY DESIGN MENU
// Owner: NAWAZ SHAIKH (+923461280347)
// Channel: https://whatsapp.com/channel/0029VaE71PfH5JLw4XgVn50z
// DP: https://files.catbox.moe/0ygua7.jpeg
// ═══════════════════════════════════════════

const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VaE71PfH5JLw4XgVn50z'
const OWNER_NUMBER = '923461280347'
const OWNER_NAME = 'NAWAZ SHAIKH'
const DP_URL = 'https://files.catbox.moe/0ygua7.jpeg'

bot(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    const [date, time] = getDate()

    const CMD_HELP = [
      lang.plugins.menu.help.format(
        ctx.PREFIX,
        message.pushName,
        time,
        date.toLocaleString('en', { weekday: 'long' }),
        date.toLocaleDateString('hi'),
        ctx.VERSION,
        ctx.pluginsCount,
        getRam(),
        getUptime('t'),
        getPlatform()
      ),
      '╭────────────────',
    ]

    sorted.forEach((command, i) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        CMD_HELP.push(
          `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(
            command.name.toUpperCase(),
            'mono'
          )}`
        )
      }
    })

    CMD_HELP.push('╰────────────────')

    return await message.send(CMD_HELP.join('\n'))
  }
)

bot(
  {
    pattern: 'list ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    const commandList = sorted
      .filter((command) => !command.dontAddCommandList && command.pattern !== undefined)
      .map((command) => `- *${command.name}*\n${command.desc}\n`)
      .join('\n')

    await message.send(commandList)
  }
)

bot(
  {
    pattern: 'menu ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    const commands = {}

    ctx.commands.forEach((command) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        let cmdType = command.type.toLowerCase()
        if (!commands[cmdType]) commands[cmdType] = []

        let isDisabled = command.active === false
        let cmd = command.name.trim()
        commands[cmdType].push(isDisabled ? `${cmd} [${lang.plugins.menu.disabled}]` : cmd)
      }
    })

    const sortedCommandKeys = Object.keys(commands).sort()

    const [date, time] = getDate()

    // ═══ HEAVY DESIGN MENU - NAWAZ MD ═══
    let msg = `╭━━━💋━━━•⊹\n`
    msg += `┃  𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘\n`
    msg += `┃  ✦ 𝐍𝐀𝐖𝐀𝐙 𝐌𝐃 ✦\n`
    msg += `┃  ─────────────\n`
    msg += `┃  👤 User: ${message.pushName}\n`
    msg += `┃  ⚡ Prefix: ${ctx.PREFIX}\n`
    msg += `┃  🕐 Time: ${time}\n`
    msg += `┃  📅 Day: ${date.toLocaleString('en', { weekday: 'long' })}\n`
    msg += `┃  🗓️ Date: ${date.toLocaleDateString('hi')}\n`
    msg += `┃  🔧 Version: ${ctx.VERSION}\n`
    msg += `┃  📦 Plugins: ${ctx.pluginsCount}\n`
    msg += `┃  💾 Ram: ${getRam()}\n`
    msg += `┃  ⏱️ Uptime: ${getUptime('t')}\n`
    msg += `┃  🖥️ Platform: ${getPlatform()}\n`
    msg += `┃  ─────────────\n`
    msg += `┃  👑 Owner: ${OWNER_NAME}\n`
    msg += `┃  📱 ${OWNER_NUMBER}\n`
    msg += `┃  📢 Channel:\n`
    msg += `┃  ${CHANNEL_LINK}\n`
    msg += `┃  🖼️ DP:\n`
    msg += `┃  ${DP_URL}\n`
    msg += `╰━━━💋━━━•⊹\n`

    if (match && commands[match]) {
      msg += `\n ╭─❏ ${textToStylist(match.toLowerCase(), 'smallcaps')} ❏\n`
      commands[match]
        .sort((a, b) => a.localeCompare(b))
        .forEach((plugin) => {
          msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
        })
      msg += ` ╰─────────────────`
      return await message.send(msg)
    }

    for (const command of sortedCommandKeys) {
      msg += `\n ╭─❏ ${textToStylist(command.toLowerCase(), 'smallcaps')} ❏\n`
      commands[command]
        .sort((a, b) => a.localeCompare(b))
        .forEach((plugin) => {
          msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
        })
      msg += ` ╰─────────────────\n`
    }

    msg += `\n╭━━━💋━━━•⊹\n`
    msg += `┃  🌟 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘\n`
    msg += `┃  ✦ 𝐍𝐀𝐖𝐀𝐙 𝐌𝐃 ✦\n`
    msg += `┃  👑 ${OWNER_NAME}\n`
    msg += `╰━━━💋━━━•⊹`

    await message.send(msg.trim())
  }
)

// ═══ ALLMENU Command ═══
bot(
  {
    pattern: 'allmenu ?(.*)',
    dontAddCommandList: true,
    desc: 'Show all commands with full details',
    type: 'menu',
  },
  async (message, match, ctx) => {
    const sorted = ctx.commands
      .slice()
      .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))

    let msg = `╭━━━💋━━━•⊹\n`
    msg += `┃  ✦ 𝐍𝐀𝐖𝐀𝐙 𝐌𝐃 ✦\n`
    msg += `┃  ─────────────\n`
    msg += `┃  👤 User: ${message.pushName}\n`
    msg += `┃  📦 Total: ${sorted.length} Commands\n`
    msg += `╰━━━💋━━━•⊹\n\n`

    sorted.forEach((command, i) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        msg += `*[${i + 1}]* *${textToStylist(command.name.toUpperCase(), 'mono')}*\n`
        msg += `  └ ${command.desc || 'No description'}\n\n`
      }
    })

    msg += `╭━━━💋━━━•⊹\n`
    msg += `┃  🌟 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐍𝐀𝐖𝐀𝐙 𝐌𝐃\n`
    msg += `┃  👑 ${OWNER_NAME}\n`
    msg += `┃  📢 ${CHANNEL_LINK}\n`
    msg += `╰━━━💋━━━•⊹`

    await message.send(msg.trim())
  }
)

// ═══ INDEX Command (alias for menu) ═══
bot(
  {
    pattern: 'index ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match, ctx) => {
    // Redirect to menu
    const commands = {}

    ctx.commands.forEach((command) => {
      if (!command.dontAddCommandList && command.pattern !== undefined) {
        let cmdType = command.type.toLowerCase()
        if (!commands[cmdType]) commands[cmdType] = []
        let isDisabled = command.active === false
        let cmd = command.name.trim()
        commands[cmdType].push(isDisabled ? `${cmd} [${lang.plugins.menu.disabled}]` : cmd)
      }
    })

    const sortedCommandKeys = Object.keys(commands).sort()
    const [date, time] = getDate()

    let msg = `╭━━━💋━━━•⊹\n`
    msg += `┃  ✦ 𝐍𝐀𝐖𝐀𝐙 𝐌𝐃 𝐈𝐍𝐃𝐄𝐗 ✦\n`
    msg += `┃  ─────────────\n`
    msg += `┃  👤 User: ${message.pushName}\n`
    msg += `┃  ⚡ Prefix: ${ctx.PREFIX}\n`
    msg += `┃  🕐 Time: ${time}\n`
    msg += `┃  📅 Day: ${date.toLocaleString('en', { weekday: 'long' })}\n`
    msg += `┃  🗓️ Date: ${date.toLocaleDateString('hi')}\n`
    msg += `┃  🔧 Version: ${ctx.VERSION}\n`
    msg += `┃  📦 Plugins: ${ctx.pluginsCount}\n`
    msg += `┃  💾 Ram: ${getRam()}\n`
    msg += `┃  ⏱️ Uptime: ${getUptime('t')}\n`
    msg += `┃  👑 Owner: ${OWNER_NAME}\n`
    msg += `┃  📢 Channel: ${CHANNEL_LINK}\n`
    msg += `╰━━━💋━━━•⊹\n`

    for (const command of sortedCommandKeys) {
      msg += `\n ╭─❏ ${textToStylist(command.toLowerCase(), 'smallcaps')} ❏\n`
      commands[command]
        .sort((a, b) => a.localeCompare(b))
        .forEach((plugin) => {
          msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
        })
      msg += ` ╰─────────────────\n`
    }

    msg += `\n╭━━━💋━━━•⊹\n`
    msg += `┃  🌟 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐍𝐀𝐖𝐀𝐙 𝐌𝐃\n`
    msg += `┃  👑 ${OWNER_NAME}\n`
    msg += `╰━━━💋━━━•⊹`

    await message.send(msg.trim())
  }
)
