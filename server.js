var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    console.log('new connection has been made');
});

server.listen(3000, function() {
    console.log('all is good');
});
