const { bot } = require('../lib/')

bot(
{
  pattern: "pro",
  fromMe: true,
  desc: "Promote user using groupjid + number or reply",
  type: "group"
},
async (message) => {

  const args = message.text.split(" ").filter(Boolean)

  const jid = args[1]
  if (!jid) return message.send("Give group jid")

  let user = args[2]

  if (message.quoted) {
    user = message.quoted.sender || message.quoted.participant
  }

  if (!user) return message.send("Give number or reply to user")

  const userJid = user.includes("@s.whatsapp.net") ? user : user + "@s.whatsapp.net"

  await message.client.groupParticipantsUpdate(
    jid,
    [userJid],
    "promote"
  )

  await message.send("Promoted")
})