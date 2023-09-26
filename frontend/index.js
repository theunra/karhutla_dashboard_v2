const express = require('express')
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/styles',express.static(__dirname + '/style'))

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});