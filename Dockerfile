FROM quay.io/lyfe00011/md:beta

# Install system dependencies for media processing
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    graphicsmagick \
    webp \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root/LyFE/
COPY . .

# Remove any existing yarn files to prevent conflicts
RUN rm -f yarn.lock .yarnrc .yarnrc.yml

# Install dependencies using npm
RUN npm install --legacy-peer-deps

# Set environment variables
ENV VPS=true
ENV NODE_ENV=production

# Start the bot
CMD ["npm", "run", "docker"]
