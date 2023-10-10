const express = require('express')
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/styles',express.static(__dirname + '/style'));
app.use('/images',express.static(__dirname + '/public/images'));
app.use('/scripts',express.static(__dirname + '/public/scripts'));

io.on('connection', (socket) => {
    console.log('new connection');
    // setInterval(()=>{
    //     socket.emit('update', {data:20});
    // }, 3000);
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

