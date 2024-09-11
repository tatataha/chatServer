const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PASSWORD = process.env.PASSWORD || 'defaultpassword';
const bannedIPs = {};

app.set('trust proxy', true);

app.use(bodyParser.json());

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (bannedIPs[ip]) {
    console.log(`Banned IP attempted access: ${ip}`);
    return res.status(403).json({ success: false, message: 'Your IP is banned.' });
  }
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/auth', (req, res) => {
  const { password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`Login attempt from IP: ${ip}`);

  if (password === PASSWORD) {
    console.log(`Successful login from IP: ${ip}`);
    res.json({ success: true });
  } else {
    console.log(`Failed login attempt from IP: ${ip}. IP is now banned.`);
    bannedIPs[ip] = true;
    res.json({ success: false, message: 'Incorrect password. Your IP is now banned.' });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('set nickname', (nickname) => {
    socket.nickname = nickname;
    socket.ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    console.log(`User ${nickname} with IP ${socket.ip} successfully connected.`);
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', { nickname: socket.nickname, message: data.message });
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.nickname} disconnected`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});