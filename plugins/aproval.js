const { bot } = require('../lib/')

bot(
  {
    pattern: 'aproval ?(.*)',
    fromMe: true,
    onlyGroup: true,
    desc: 'Approve pending join requests',
    type: 'Ayaz'
  },
  async (message, match) => {
    const limit = parseInt(match.trim()) || 100
    const client = message.client

    ;(async () => {
      const r = await client.groupRequestParticipantsList(message.jid)
      const toApprove = r.slice(0, limit).map(p => p.jid)
      await client.groupRequestParticipantsUpdate(message.jid, toApprove, 'approve')
    })()
  }
)