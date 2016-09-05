var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  console.log('a user connected');

    socket.on('get-users', function() {
        socket.emit('all-users', users);
    });

  //new user
  socket.on('join', function(data){
      console.log(data);
      console.log(users);
      //User name
      socket.nickname = data.nickname;
      users[socket.nickname] = socket; 
      var userObj = {
        nickname: data.nickname,
        socketid: socket.id
    };

    users.push(userObj);
    io.emit('all-users', users);
  });

 socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

socket.on('send-message', function(data) {
    socket.broadcast.emit('message-received', data);
});

server.listen(3000, function() {
    console.log('all is good');
});
