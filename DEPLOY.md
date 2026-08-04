# NAWAZ MD - Deployment Guide

## Quick Start

### 1. Get Session ID

First, you need a WhatsApp session ID. You can get it by:

1. Visit the session pairing site
2. Connect your WhatsApp number
3. Copy the session ID

### 2. Deploy on Railway (Recommended)

1. Go to [railway.app](https://railway.app) and login with GitHub
2. Click "New Project" → "Deploy from GitHub"
3. Select your fork: `NawazMd-bot/NAWAZ-MD`
4. Add the following environment variables:

| Variable | Value |
|----------|-------|
| `SESSION_ID` | Your session ID |
| `PREFIX` | `.` |
| `SUDO` | `923461280347` |
| `BOT_LANG` | `en` |
| `STICKER_PACKNAME` | `💋,NAWAZ MD` |
| `ALWAYS_ONLINE` | `true` |
| `AUTO_STATUS_VIEW` | `true` |

5. Click Deploy!

### 3. Deploy on Render

1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set Build Command: `yarn install`
5. Set Start Command: `yarn start`
6. Add environment variables (same as above)
7. Deploy!

### 4. Deploy on Heroku

1. Go to [heroku.com](https://heroku.com)
2. Create a new app
3. Connect to GitHub
4. Add environment variables
5. Deploy branch

### 5. Deploy on VPS/Panel

```bash
# Step 1: Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Step 2: Install yarn and ffmpeg
sudo npm install -g yarn
sudo apt install ffmpeg -y

# Step 3: Clone the repo
git clone https://github.com/NawazMd-bot/NAWAZ-MD.git
cd NAWAZ-MD

# Step 4: Install dependencies
yarn install

# Step 5: Create config file
cat > config.env << EOF
SESSION_ID="your_session_id_here"
PREFIX="."
SUDO="923461280347"
BOT_LANG="en"
STICKER_PACKNAME="💋,NAWAZ MD"
ALWAYS_ONLINE="true"
AUTO_STATUS_VIEW="true"
VPS="true"
EOF

# Step 6: Start the bot
yarn start
```

### 6. Deploy on Replit

1. Go to [replit.com](https://replit.com)
2. Create a new Repl from GitHub
3. Select `NawazMd-bot/NAWAZ-MD`
4. Add secrets (environment variables)
5. Run!

---

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `SESSION_ID` | WhatsApp session ID (required) | - |
| `PREFIX` | Command prefix | `.` |
| `SUDO` | Owner/sudo numbers | `923461280347` |
| `BOT_LANG` | Bot language | `en` |
| `STICKER_PACKNAME` | Sticker pack name | `💋,NAWAZ MD` |
| `ALWAYS_ONLINE` | Show bot online | `true` |
| `AUTO_STATUS_VIEW` | Auto view status | `true` |
| `SEND_READ` | Send blue tick | `true` |
| `VPS` | Running on VPS | `true` |
| `DATABASE_URL` | PostgreSQL URL (optional) | - |
| `HEROKU_APP_NAME` | Heroku app name | - |
| `HEROKU_API_KEY` | Heroku API key | - |
| `GROQ_API_KEY` | Groq AI API key | - |
| `GEMINI_API_KEY` | Gemini AI API key | - |
| `RMBG_KEY` | Remove.bg API key | - |

---

## After Deployment

Once deployed, send `.menu` to your bot number to see all commands.

### Setting Up Sudo

```
.setsudo 923461280347
```

### Changing Prefix

```
PREFIX=!
```

---

## Troubleshooting

1. **Bot not responding?** Check if SESSION_ID is correct
2. **Getting errors?** Check the logs on your hosting platform
3. **Can't install dependencies?** Make sure Node.js 20+ is installed
4. **Session expired?** Generate a new session ID

---

> **Powered by NAWAZ MD**
> **Owner: NAWAZ SHAIKH (+923461280347)**
