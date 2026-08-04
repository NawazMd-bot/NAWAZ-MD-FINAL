const { bot } = require('../lib/')

bot(
  {
    pattern: 'totalgc',
    fromMe: true,
    desc: 'Show total groups',
    type: 'raza'
  },
  async (message) => {
    try {
      const groups = await message.client.groupFetchAllParticipating()
      const total = Object.keys(groups).length

      await message.send(`📊 *Total Groups:* ${total}`)

    } catch (err) {
      console.log("TotalGC Error:", err)
    }
  }
)

bot(
  {
    pattern: 'totalgcname',
    fromMe: true,
    desc: 'Show total groups with names',
    type: 'raza'
  },
  async (message) => {
    try {
      const groups = await message.client.groupFetchAllParticipating()
      const total = Object.keys(groups).length

      const names = Object.values(groups)
        .map(g => g.subject)
        .join('\n')

      await message.send(
        `📊 *Total Groups:* ${total}\n\n📋 *Group List:*\n${names}`
      )

    } catch (err) {
      console.log("TotalGCName Error:", err)
    }
  }
)