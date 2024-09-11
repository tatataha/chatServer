
# Chat Server

this project is a simple chat server as mentioned in the title. **HTML&CSS** and **JavaScript** were used in its construction.
for sockets, I used the **socket.io** library, which is a ready-made package

In addition, while building this server, I thought about how to make it more secure and installed an encryption system. The system keeps the ip addresses of the users and bans any user who tries to log in to the server if they enter the wrong password.

Finally, as you can guess, this server, which is hosted on localhost via docker, is not open to the outside world. I used **pinggy.io**, a tunnel generator, to solve this issue.
## Socket.io

Socket.io is a JavaScript library that enables real-time, bidirectional, and event-driven communication between web clients (browsers) and servers. It is widely used in applications that require fast, real-time interactions, like chat applications, online games, or live updates.

It works primarily on WebSocket, but also provides fallbacks to older technologies (such as long polling) when WebSockets are not available in the user's browser.

  
#### Key Features of Socket.io:

- Real-Time Communication: It provides a persistent connection between the client and the server, allowing them to send and receive data in real time.
- Event-Based: You can define and handle custom events, making communication more structured and easier to manage.
- Automatic Reconnection: If the connection is lost, Socket.io automatically tries to reconnect.
- Cross-Browser Compatibility: It gracefully falls back to other communication methods when WebSockets aren't supported.
## How To Use Socket.io

### Installation

To use Socket.io, you need to install it for both server-side (Node.js) and client-side (browser).

```bash 
  npm install socket.io
```
    
#### Simple Example

Socket.io works on top of an HTTP server. Here’s how you can set it up:

```javascript
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// When a client connects
io.on('connection', (socket) => {
  console.log('a user connected');

  // Sending and receiving messages
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg); // Broadcast message to all clients
  });

  // When a client disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
```
# Bilgisayarınızda Çalıştırın

Clone repository

```bash
  git clone https://github.com/tatataha/chatServer.git
```

Go to Project folder

```bash
  cd chatServer
```

Build Docker image
```bash
    docker build -t "image-name" .
```

Run Docker container
```bash
    docker run -d -p 3000:3000 --name "container-name" -e PASSWORD="your-password" "image-name"
```

here I used the **-d (detach)** flag so that the logs do not clutter the terminal screen. With the 
```bash
docker exec -it “container-id” bash
````
 command, you can enter the container and follow the logs.

You can now access the website at **"localhost:3000"**

**All you have to do is enter the password and set a username.**


## More

### Pinggy.io

If you want to open this server to the outside world, there are many ways to do it, but I chose to use pinggy.io.

**Pinggy.io** is a service that allows developers to expose their local development servers or applications to the internet using a public URL. It's similar to services like **ngrok**, which create a tunnel between your local environment and the internet, allowing external access to your local server.

## What Pinggy.io Does:
- **Expose Localhost:** It allows you to share your local development environment with others without deploying it to a live server. For example, if you're developing a web application on `localhost:3000`, Pinggy can create a public URL that anyone can use to access that local application.
- **Bypass Firewalls/NAT:** Since it creates a tunnel, it bypasses any network limitations such as firewalls or NAT (Network Address Translation), allowing external access without requiring complex configurations like port forwarding.
- **Custom Domains:** Pinggy may offer the ability to configure custom domains for your tunnels, making the URLs more recognizable or tailored to your needs.
  
## How Pinggy.io Is Used:
Typically, you would install a client or use a command-line interface (CLI) to create a tunnel. For example:

1. Use a command like:
   ```bash
   ssh -p 443 -R0:localhost:3000 -L4300:localhost:4300 qr@a.pinggy.io ⚡️
   ```
   This would expose your local server running on port 3000 to a public Pinggy URL.

## Use Cases:
- **Testing Webhooks:** Services that require public URLs (e.g., Stripe, Twilio) can send data to your local development environment via a Pinggy tunnel.
- **Collaborating:** Developers can share their in-progress projects with colleagues or clients without needing to deploy them.
- **Demonstrations:** It allows you to showcase your local work to a wider audience without setting up a live server.

Pinggy.io is a handy tool for developers needing temporary or quick access to their local servers from the internet.
