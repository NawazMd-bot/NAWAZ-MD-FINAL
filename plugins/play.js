// © Copyright Policy Not Allowed 🚫 
// 〆͎𝐁𝐑𝐎͡͡𝐊𝐄𝐍 𝐈𝐍𝅦𝐗𝗶͜͡𝐃𝐄〆͎
// SUPER FAST & SECURE MUSIC PLUGIN

const { bot } = require('../lib/');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

bot(
  {
    pattern: 'play ?(.*)',
    type: 'play',
    desc: 'Ultra Fast Audio Downloader 🚀',
  },
  async (message, match) => {
    if (!match) return await message.send('> *Ꮋᴇʏ ʙʀᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜱᴏɴɢ ɴᴀᴍᴇ 🤧*');

    const apiUrl = `https://api.sayan-nexuswork.workers.dev/music?query=${encodeURIComponent(match)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'success') {
        
        const caption = `☘️  Ꭲɪᴛʟᴇ : ${data.title}

❒ ⏱️ Ꭰᴜʀᴀᴛɪᴏɴ : ${data.duration}

❒ 🎭 Ꮩɪᴇᴡ : ${data.viewers}

❒ 💾 Fᴏʀᴍᴀᴛ : ${data.type}

❒ 🗣️ Ꮯʀᴇᴀᴛᴏʀ : 〆͎𝐁𝐑𝐎͡͡𝐊𝐄𝐍 𝐈𝐍𝅦𝐗𝗶͜͡𝐃𝐄〆͎

*Uꜱᴇ Ꮋᴇᴀᴅᴘʜᴏɴᴇꜱ Fᴏʀ Ᏼᴇꜱᴛ Ꭼxᴘᴇʀɪᴇɴᴄᴇ... ☊*
❒ 💋 Powered by NAWAZ MD`;

        if (data.thumbnail) {
          await message.sendFromUrl(data.thumbnail, { caption: caption }, 'image');
        }

        const audioResponse = await fetch(data.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://youtube.com/'
          }
        });
        
        const buffer = await audioResponse.buffer();
        
        if (buffer) {
          await message.send(
            buffer,
            {
              mimetype: 'audio/mpeg',
              ptt: false,
              fileName: `${data.title}.mp3`,
              contextInfo: {
                externalAdReply: {
                  title: data.title,
                  body: '〆͎𝐁𝐑𝐎͡͡𝐊𝐄𝐍 𝐈𝐍𝅦𝐗𝗶͜͡𝐃𝐄〆͎',
                  mediaType: 1,
                  showAdAttribution: false,
                  renderLargerThumbnail: false,
                  thumbnailUrl: data.thumbnail
                }
              }
            },
            'audio'
          );
        }
      }
    } catch (error) {
      await message.send('> *Oops !! 😰 Server Error*');
    }
  }
);