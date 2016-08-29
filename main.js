var port = 8888; // set up server to listen on port 8888

function next_uid() {
  return Math.floor(Math.random() * 100); // for test
}

function app(request, responce) {
  var fs = require('fs');

  fs.readFile('./index.html', 'utf-8', function(error, content) {
    responce.writeHead(200, {"Content-Type": "text/html"});
    responce.end(content);
  });

  // or
  // responce.writeHead(200, {"Content-Type": "text/html"}); // text/plain
  // responce.write(html_body);
  // responce.end();
}

var server = require('http').createServer(app);

var io = require('socket.io').listen(server, {log: true}); // enable sockets

// var json2csv = require('json2csv');
// see https://www.npmjs.com/package/json2csv

io.sockets.on('connection', function (socket) {
  var id = next_uid();

  console.log('A user '+ id + ' connected!');
  socket.emit('msg_id',  id);
  socket.emit('msg_key', id); // access token

  socket.on('msg_imu_data', function(data) {
    // console.log(data);
    socket.emit('msg', 'Now I know where you are!');
  });

  socket.on('msg_gnss_data', function(str) {
    console.log(data);
    socket.emit('msg', 'Now I know where you are!');
  });
});

server.listen(port);

console.log('Listening on *:' + server.address().port);
