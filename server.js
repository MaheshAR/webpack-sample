const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const db = require('./server/db').mongoConnection;
const api = require('./server/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, 'build')));

app.use(express.static('build'));
app.use(express.static('views'));

app.use('/api', api);

io.on('connection', function (socket) {
  socket.on('send', function (data) {
  	socket.emit('message', data);
  	socket.broadcast.emit('message', data);
  });
});

db.connect().then(() => {
    server.listen(port);	
    console.log('Magic happens on port ' + port);
})