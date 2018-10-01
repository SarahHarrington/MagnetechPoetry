const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/public`));

io.on('connection', socket => {
  socket.emit('newClientConnection', socket.id);


})

http.listen(PORT, '127.0.0.1');
console.log(`Listening on port: ${PORT}`);