# NAWAZ MD - Session Web Deployment Guide

This guide explains how to deploy the session pairing web on Railway, similar to levanter.site/session.

---

## Step-by-Step Railway Deployment

### Step 1: Push to GitHub First

The session-web folder has already been added to your repo. Push it:

```bash
cd NAWAZ-MD-FINAL
git add session-web/
git commit -m "Add session pairing web"
git push origin main
```

### Step 2: Deploy Session Web on Railway

1. Go to [railway.app](https://railway.app) and login
2. Click **"New Project"**
3. Click **"Deploy from GitHub repo"**
4. Select `NawazMd-bot/NAWAZ-MD-FINAL`
5. Railway will detect the project

### Step 3: Configure Railway for Session Web

In Railway project settings:

**Service Settings:**
- Go to the service settings
- Set **Root Directory** to: `session-web`
- Set **Dockerfile** to: `session-web/Dockerfile.session`

**Environment Variables:**
| Variable | Value |
|----------|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

### Step 4: Get Your Railway URL

After deployment, Railway gives you a URL like:
`https://nawaz-md-session.up.railway.app`

### Step 5: Use the Session Web

1. Open your Railway URL in browser
2. Enter your WhatsApp number (with country code)
3. Click "Get Pairing Code"
4. You'll get an 8-digit pairing code
5. On WhatsApp: Settings → Linked Devices → Link with phone number
6. Enter the 8-digit code
7. Your SESSION_ID will appear on the web page
8. Copy the SESSION_ID

### Step 6: Set SESSION_ID on Your Bot Deployment

Go to your **bot's Railway deployment** (not the session web):
- Add environment variable: `SESSION_ID` = (paste the copied session ID)
- Add: `VPS` = `true`
- Redeploy your bot

---

## Alternative: Deploy Bot + Session Web Together

If you want both on the same Railway project:

### Use Docker Compose (Railway)

Railway supports multiple services in one project. Add both:
1. Service 1: `session-web/` (for pairing)
2. Service 2: Root `/` (for bot)

Set the bot's `SESSION_ID` env var after generating it from Service 1.

---

## Troubleshooting

### Bot not connecting after setting SESSION_ID

The current SESSION_ID format needs to match what NAWAZ-MD expects. The session web generates a base64-encoded auth credentials string. If the bot expects a specific format like `nawaz-xxxxx`, you may need to adjust the `generateSessionId()` function in `session-web/server.js`.

### Pairing code not appearing

- Check Railway logs for errors
- Try a different phone number format (remove leading zero)
- Ensure Railway is not sleeping (sleepApplication: false)

### Railway URL shows 502

- Wait 30 seconds after deployment
- Check if the app is healthy: `https://your-url.railway.app/health`

---

## File Structure Added

```
NAWAZ-MD-FINAL/
├── session-web/
│   ├── server.js           # Express server with Baileys pairing
│   ├── package.json        # Node.js dependencies
│   ├── Dockerfile.session  # Docker config for Railway
│   └── public/
│       └── index.html      # Dark theme UI (Levanter-style)
```
