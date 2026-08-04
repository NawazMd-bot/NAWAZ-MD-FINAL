const { bot, getBuffer, jidToNum, genThumbnail } = require('../lib/')
const image = 'https://i.imgur.com/0WBZacj.jpeg'
const logo = 'https://i.imgur.com/0WBZacj.jpeg'

bot(
    {
        pattern: 'intro ?(.*)',
        desc: 'Shows My Intro',
        type: 'misc',
    }, async (message, match) => {
        const jid = message.jid
        const number = message.client.user.jid
        const thumb = await getBuffer(image)
        const thumbnail = await getBuffer(logo)
        const introData = {}

        // Configuring link preview
        introData.linkPreview = {
            renderLargerThumbnail: true,
            showAdAttribution: true,
            head: "ɪͥᴛͭsᷤ ᴍͫᴇͤ ⏤͟͞ꪶ 𝑨𝒚𝒂𝒛 ꫂ⛧͢",
            body: "ᴄʟɪᴄᴋ ʜᴇʀᴇ ᴛᴏ ᴳᵉᵗ🫂 !",
            mediaType: 1,
            thumbnail: thumb.buffer,
            sourceUrl: "http://instagram.com/ayazaliofc"
        }

        // Setting a contact message as a quote
        introData.quoted = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                'contactMessage': {
                    'displayName': `${message.pushName}`, // Client User Name
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${message.client.user.name},;;;\nFN:${message.client.user.name},\nitem1.TEL;waid=${jidToNum(number)}\nitem1.X-ABLabel:WhatsApp\nEND:VCARD`,
                    'jpegThumbnail': await genThumbnail(thumbnail.buffer)
                }
            }
        }

        // Sending the intro message
        await message.send(`0ཻུ۪۪ꦽꦼ̷⸙‹•══════════════♡᭄
│       *「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」*
│ *Name      :* ꪶsharjeelꫂ
│ *Place       :* jampur 
│ *Gender   :*  Male
│ *Age          :* 99999+
│ *Hobby     :* awara pan
│ *Phone     :*  
│ *IG ID        :* BROKEN 
│ *Status     :* 💀
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙`, introData)
    }
);