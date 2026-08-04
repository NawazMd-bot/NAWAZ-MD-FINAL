# 🤖 NAWAZ MD - WhatsApp Bot

<p align="center">
  <img src="https://files.catbox.moe/0ygua7.jpeg" alt="NAWAZ MD DP" width="200" height="200">
</p>

<p align="center">
  <b>A powerful, feature-rich WhatsApp bot with 117+ plugins, built on Baileys.</b>
</p>

<p align="center">
  <a href="https://whatsapp.com/channel/0029VaE71PfH5JLw4XgVn50z"><img src="https://img.shields.io/badge/Join-Channel-25D366?style=for-the-badge&logo=whatsapp" alt="Channel"></a>
  <a href="https://github.com/NawazMd-bot/NAWAZ-MD"><img src="https://img.shields.io/github/stars/NawazMd-bot/NAWAZ-MD?style=for-the-badge&logo=github" alt="Stars"></a>
  <a href="https://github.com/NawazMd-bot/NAWAZ-MD/fork"><img src="https://img.shields.io/github/forks/NawazMd-bot/NAWAZ-MD?style=for-the-badge&logo=github" alt="Forks"></a>
</p>

---

## 👑 Owner Details

| Detail | Info |
|--------|------|
| **Owner** | NAWAZ SHAIKH |
| **Number** | +923461280347 |
| **Channel** | [Join Channel](https://whatsapp.com/channel/0029VaE71PfH5JLw4XgVn50z) |
| **DP** | [Profile Picture](https://files.catbox.moe/0ygua7.jpeg) |

---

## ✨ Features

- **117+ Plugins** with full command support
- **Multi-Session** WhatsApp Bot
- **Group Management** - Anti-link, anti-spam, warnings, anti-status
- **Media Tools** - Download from Instagram, TikTok, YouTube, Twitter, Facebook, Pinterest, Spotify
- **AI Integration** - ChatGPT, Groq, Gemini AI
- **Auto Replies** - Salam, Greetings, Jarvis AI
- **Text Tools** - Fancy text, Emoji Mix, Calculator, Time
- **Photo Editor** - Ephoto text maker
- **Group Tools** - Total GC, Tag All, Forward Messages
- **Anti Features** - Anti-edit, anti-fake, anti-mention, anti-status, anti-mod
- **Download Tools** - Audio, Document, Instagram, TikTok, YouTube
- **Fun Commands** - Sim database, Profile, Intro
- **Utility** - Link sharing, Voice to text, Image upscale

---

## 🚀 Deployment

### Deploy on Railway

1. Go to [Railway](https://railway.app) and login with GitHub
2. Create a new project → Deploy from GitHub
3. Select your forked repo: `NawazMd-bot/NAWAZ-MD`
4. Add environment variables (see below)
5. Deploy!

### Deploy on Heroku

1. Fork this repository
2. Create a Heroku app
3. Add environment variables
4. Deploy using the deploy button

### Deploy on VPS/Panel

```bash
# Clone the repository
git clone https://github.com/NawazMd-bot/NAWAZ-MD.git
cd NAWAZ-MD

# Install dependencies
yarn install

# Configure environment
cp config.env.example config.env
# Edit config.env with your SESSION_ID

# Start the bot
yarn start
```

### Deploy on Replit

1. Fork this repo
2. Create a Repl on Replit
3. Import your GitHub fork
4. Add environment variables
5. Run!

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SESSION_ID` | WhatsApp session ID | ✅ Yes |
| `PREFIX` | Command prefix (default: `.`) | No |
| `SUDO` | Owner/Sudo numbers (comma separated) | No |
| `BOT_LANG` | Bot language (en/ur/hi/es/fr) | No |
| `STICKER_PACKNAME` | Sticker pack name | No |
| `ALWAYS_ONLINE` | Show bot as always online | No |
| `AUTO_STATUS_VIEW` | Auto view status | No |
| `SEND_READ` | Send blue tick | No |
| `DATABASE_URL` | PostgreSQL database URL | No |
| `HEROKU_APP_NAME` | Heroku app name | No |
| `HEROKU_API_KEY` | Heroku API key | No |
| `GPT` | GPT model type (free/openai) | No |
| `GROQ_API_KEY` | Groq API key for AI | No |
| `GEMINI_API_KEY` | Google Gemini API key | No |

---

## 📋 Command List

### Menu & Help
| Command | Description |
|---------|-------------|
| `.menu` | Show beautiful categorized menu |
| `.help` | Show full command list |
| `.allmenu` | Show all commands with details |
| `.list` | Show all commands with descriptions |
| `.index` | Show index of all commands |

### AI & Chatbot
| Command | Description |
|---------|-------------|
| `.chatgpt` | ChatGPT AI chatbot |
| `.groq` | Groq AI fast responses |
| `.gemini` | Google Gemini AI |
| `.jarvis` | JARVIS AI Assistant |
| `.lydia` | Lydia AI chatbot |

### Downloads
| Command | Description |
|---------|-------------|
| `.play` | Download YouTube audio |
| `.y2mate` | Download YouTube video/audio |
| `.yts` | YouTube search |
| `.insta` | Download Instagram post/reel |
| `.tiktok` | Download TikTok video |
| `.facebook` | Download Facebook video |
| `.twitter` | Download Twitter/X media |
| `.pinterest` | Download Pinterest image |
| `.mediafire` | Download MediaFire file |
| `.spotify` | Download Spotify track info |
| `.apk` | Download APK files |
| `.story` | Download Instagram story |

### Group Management
| Command | Description |
|---------|-------------|
| `.warn` | Warning system (3 warns = kick) |
| `.kick` | Kick user from group |
| `.promote` | Promote user to admin |
| `.demote` | Demote admin to member |
| `.gpp` | Change group profile picture |
| `.vote` | Create poll in group |
| `.tag` | Tag all members |
| `.msgs` | Get message counter |
| `.pdm` | Promote/Demote notification |
| `.totalgc` | Show total group count |

### Anti Features
| Command | Description |
|---------|-------------|
| `.antiedit` | Anti-edit message detection |
| `.antifake` | Anti-fake number system |
| `.antigm` | Anti group mention |
| `.antilink` | Anti-link enforcement |
| `.antiwords` | Filter specific words |
| `.antispam` | Anti-spam protection |
| `.antimod` | Anti modification |
| `.antistatus` | Anti group status sharing |
| `.alinks` | Link sharing system |
| `.slinkall` | Anti-link all system |
| `.aproval` | Approve pending join requests |

### Text & Media
| Command | Description |
|---------|-------------|
| `.fancy` | Generate fancy text styles |
| `.trt` | Translate text |
| `.tts` | Text to speech |
| `.img` | Generate or search images |
| `.sticker` | Convert image/video to sticker |
| `.removebg` | Remove background |
| `.upscale` | Improve image quality |
| `.emix` | Emoji mix |
| `.emoji` | Get emoji info |

### Tools & Utilities
| Command | Description |
|---------|-------------|
| `.calc` | Calculator |
| `.time` | Show time |
| `.qr` | Generate QR code |
| `.ss` | Take website screenshot |
| `.ping` | Check bot response time |
| `.alive` | Check if bot is alive |
| `.afk` | Set AFK status |
| `.upload` | Upload media and get URL |
| `.url` | Get URL from replied media |

### Owner & Sudo
| Command | Description |
|---------|-------------|
| `.setsudo` | Add number to sudo list |
| `.delsudo` | Remove number from sudo list |
| `.getsudo` | View all sudo users |
| `.vars` | Set environment variables |
| `.getvar` | Get environment variable |
| `.tog` | Toggle features |
| `.backup` | Backup bot data |
| `.plugins` | Manage plugins |

### Fun & Social
| Command | Description |
|---------|-------------|
| `.sim` | SIM database search |
| `.find` | Find number info |
| `.profile` | Get user profile info |
| `.intro` | Show intro |
| `.salam` | Auto salam replies |
| `.hi` | Auto hi/hello replies |
| `.sharjeel` | Sharjeel info |
| `.gst` | Update group status |
| `.tshare` | Telegram share |
| `.tovn` | Text to voice note |
| `.tg` | Telegram tools |
| `.mforward` | Mass forward messages |
| `.Sajidenter` | Silent nuke |
| `.pro` | Pro features |
| `.jean` | Text image maker |
| `.ephoto` | Photo editing tools |
| `.ig` | Instagram tools |
| `.audio` | Audio tools |
| `.vv` | View once media |
| `.doc` | Document tools |
| `.caption` | Caption tools |

---

## 📂 Project Structure

```
NAWAZ-MD/
├── plugins/          # All bot commands (117+)
│   ├── _menu.js      # Menu commands
│   ├── sudo.js       # Sudo management
│   ├── play.js       # Music download
│   ├── jarvis.js     # AI assistant
│   ├── antistatus.js # Anti-status
│   └── ...           # 112+ more plugins
├── lib/              # Core library files
├── lang/             # Language files (12 languages)
├── media/            # Media files
├── config.js         # Configuration
├── index.js          # Entry point
├── package.json      # Dependencies
├── app.json          # Heroku config
└── README.md         # Documentation
```

---

## 🔧 Configuration

### Set Sudo Users
```
.setsudo 923461280347
```

### Change Prefix
```
PREFIX=!
```

### Set Language
```
BOT_LANG=ur
```

---

## 📱 Supported Languages

- English (en)
- Urdu (ur)
- Hindi (hi)
- Spanish (es)
- French (fr)
- Bengali (bn)
- Indonesian (id)
- Turkish (tr)
- Russian (ru)
- Arabic (ar)
- Malayalam (ml)
- Chinese (zh)

---

## 📞 Support

- **Owner:** [NAWAZ SHAIKH](https://wa.me/923461280347)
- **Channel:** [WhatsApp Channel](https://whatsapp.com/channel/0029VaE71PfH5JLw4XgVn50z)

---

## ⚖️ License

This project is licensed under the MIT License.

---

> **🌟 Powered by NAWAZ MD 🌟**
> **👑 Owner: NAWAZ SHAIKH (+923461280347)**
