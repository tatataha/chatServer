# chatServer
A simple user interface chat server running with Docker.


docker run -d -p 3000:3000 --name chatserver -e PASSWORD=tata server                                               
ssh -p 443 -R0:localhost:3000 -L4300:localhost:4300 qr@a.pinggy.io                                                 ⚡️
