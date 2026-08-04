const { bot, getData, setData } = require('../lib/')

bot(
    {
        pattern: 'antimod ?(.*)',
        desc: 'Toggle anti-modification protection',
        type: 'group',
        onlyGroup: true,
    },
    async (message, match) => {
        if (!match) return await message.send('*Usage:* .antimod on/off')
        if (match === 'on' || match === 'off') {
            const enabled = match === 'on'
            await setData(`antimod_${message.jid}`, enabled, message.id)
            return await message.send(
                enabled ? '*Anti-modification activated.*' : '*Anti-modification deactivated.*'
            )
        }
        return await message.send('*Usage:* .antimod on/off')
    }
)

bot(
    {
        on: 'event',
        event_action: 'demote',
    },
    async (message) => {
        const isEnabled = await getData(`antimod_${message.jid}`, message.id)
        if (!isEnabled) return
        const { eventMessage } = message.message.message
        if(!eventMessage) return

        const actor = eventMessage.from
        const participants = eventMessage.participants

        if (message.sudo || message.fromMe) return

        await message.Promote(participants)
        await message.Demote(actor)

        await message.send(
            `*Anti-Demote Triggered!*\n\n*Actor:* @${actor.split('@')[0]}\n*Action:* Unauthorized demotion reversed and actor demoted.`,
            { contextInfo: { mentionedJid: [actor, ...participants] } }
        )
    }
)

bot(
    {
        on: 'event',
        event_action: 'promote',
    },
    async (message) => {
        const isEnabled = await getData(`antimod_${message.jid}`, message.id)
        if (!isEnabled) return

        const { eventMessage } = message.message.message
        if(!eventMessage) return

        const actor = eventMessage.from
        const participants = eventMessage.participants

        if (message.sudo || message.fromMe) return

        await message.Demote(participants)
        await message.Demote(actor)

        await message.send(
            `*Anti-Promote Triggered!*\n\n*Actor:* @${actor.split('@')[0]}\n*Action:* Unauthorized promotion reversed and actor demoted.`,
            { contextInfo: { mentionedJid: [actor, ...participants] } }
        )
    }
)