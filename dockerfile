# Use Node.js as base image / Temel image olarak Node.js kullan
FROM node:14

# Set the working directory of the application / Çalışma dizinini ayarla
WORKDIR /app

# Copy package files and install dependencies / Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Copy app files / Uygulama dosyalarını kopyala
COPY . .

# Open server port / Sunucu portunu aç
EXPOSE 3000

# Run server / Sunucuyu başlat
CMD ["node", "server.js"]