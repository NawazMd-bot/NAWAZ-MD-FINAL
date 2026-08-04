# NAWAZ MD BOT - PUBLIC DEPLOYMENT GUIDE

> **WhatsApp Multi-Device Bot with 117+ Plugins**
> **Powered by NAWAZ MD**
> **Owner: NAWAZ SHAIKH (+923461280347)**

---

## Repository

https://github.com/NawazMd-bot/NAWAZ-MD-FINAL

---

## Step 1: Fork the Repository

1. Go to: https://github.com/NawazMd-bot/NAWAZ-MD-FINAL
2. Click the **"Fork"** button (top right)
3. Wait for the fork to complete

---

## Step 2: Get Session ID

### Method A: Using Pairing Website (Easiest)

1. Visit: https://levanter.site
2. Enter your WhatsApp number with country code (e.g., 923001234567)
3. Click "Get Pairing Code"
4. You will get an 8-digit pairing code
5. Open WhatsApp on your phone
6. Go to **Settings > Linked Devices > Link a Device**
7. Click "Link with phone number instead"
8. Enter the 8-digit pairing code
9. **Done! Copy the Session ID**

### Method B: QR Code Method

1. Deploy the bot first (skip to Step 3, add SESSION_ID later)
2. Check the logs - a QR code will appear
3. Open WhatsApp > Settings > Linked Devices > Scan QR
4. Session ID will be automatically saved

---

## Step 3: Deploy on Railway (Recommended)

### 3.1 Create Railway Account

1. Go to: https://railway.app
2. Click "Login" > "Login with GitHub"
3. Authorize Railway to access your GitHub

### 3.2 Deploy the Bot

1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. Search and select your fork: `NAWAZ-MD-FINAL`
4. Click **"Deploy Now"**

### 3.3 Add Environment Variables

Click on your project > **"Variables"** tab > Add these:

| Variable | Value | Description |
|----------|-------|-------------|
| `SESSION_ID` | `your_session_id_here` | Session ID from Step 2 |
| `PREFIX` | `.` | Command prefix |
| `SUDO` | `your_number` | Your WhatsApp number |
| `BOT_LANG` | `en` | Bot language (en/ur/hi) |
| `STICKER_PACKNAME` | `💋,NAWAZ MD` | Sticker pack name |
| `ALWAYS_ONLINE` | `true` | Show bot always online |
| `AUTO_STATUS_VIEW` | `true` | Auto view WhatsApp status |
| `SEND_READ` | `true` | Send blue tick |

### 3.4 Bot Will Auto-Start

After adding variables, Railway will automatically rebuild and start the bot!

---

## Step 4: Deploy on Render (Alternative)

1. Go to: https://render.com
2. Login with GitHub
3. Click **"New +"** > **"Web Service"**
4. Connect your forked repo
5. Configure:
   - **Build Command:** `yarn install`
   - **Start Command:** `yarn start`
   - **Environment:** Node
6. Add the same environment variables
7. Click **"Create Web Service"**

---

## Step 5: Deploy on Heroku (Alternative)

1. Go to: https://heroku.com
2. Create a new app
3. Go to **"Deploy"** tab
4. Connect to GitHub and select your fork
5. Add environment variables in **"Settings"** tab
6. Click **"Deploy Branch"**

---

## Step 6: Deploy on VPS / Panel

### Install Dependencies

```bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Install yarn
sudo npm install -g yarn

# Install ffmpeg
sudo apt install ffmpeg -y

# Install git
sudo apt install git -y
```

### Clone and Setup

```bash
# Clone the repo
git clone https://github.com/NawazMd-bot/NAWAZ-MD-FINAL.git
cd NAWAZ-MD-FINAL

# Install dependencies
yarn install

# Create config file
cat > config.env << 'EOF'
SESSION_ID="your_session_id_here"
VPS="true"
AUTO_UPDATE="true"
PREFIX="."
SUDO="your_number"
BOT_LANG="en"
STICKER_PACKNAME="💋,NAWAZ MD"
ALWAYS_ONLINE="true"
AUTO_STATUS_VIEW="true"
EOF

# Start the bot
yarn start
```

### Keep Running with PM2

```bash
# Install PM2
sudo npm install -g pm2

# Start bot
pm2 start index.js --name "NAWAZ-MD"

# Save and auto-restart
pm2 save
pm2 startup
```

---

## Bot Commands After Deployment

Once deployed, send `.menu` to your bot number to see all commands.

### Essential Commands

| Command | Description |
|---------|-------------|
| `.menu` | Show bot menu |
| `.allmenu` | Show all commands |
| `.ping` | Check bot speed |
| `.alive` | Check if bot is alive |
| `.play <song>` | Download music |
| `.yts <search>` | YouTube search |
| `.insta <link>` | Download Instagram |
| `.tiktok <link>` | Download TikTok |
| `.setvar VARNAME value` | Set a variable |
| `.getvar VARNAME` | Get a variable |
| `.setsudo <number>` | Set sudo user |
| `.delsudo <number>` | Remove sudo user |
| `.prefix !` | Change command prefix |
| `.block` | Block a user |
| `.unblock` | Unblock a user |

---

## Troubleshooting

### Bot Not Responding?
- Check if SESSION_ID is correct
- Check logs on your hosting platform
- Re-generate session ID if expired

### "yarn install" Fails?
- Make sure Node.js 20+ is installed
- Clear cache: `yarn cache clean`
- Try: `rm -rf node_modules && yarn install`

### Session Expired?
- Generate a new session ID from the pairing website
- Update SESSION_ID variable
- Restart the bot

### Bot Crashing?
- Check logs for error messages
- Make sure all environment variables are set
- Ensure ffmpeg is installed (for media commands)

---

## Support

- **Owner:** NAWAZ SHAIKH
- **WhatsApp:** +923461280347
- **Channel:** https://whatsapp.com/channel/0029VaE71PfH5JLw4XgVn50z

---

> **💋 Powered by NAWAZ MD**
