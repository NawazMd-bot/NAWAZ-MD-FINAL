FROM quay.io/lyfe00011/md:beta
WORKDIR /root/LyFE/
COPY . .
RUN npm install --legacy-peer-deps
ENV VPS=true
CMD ["npm", "run", "docker"]
