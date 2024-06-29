const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const mqttHandler = require('./controllers/mqtt');
const digest = require('./controllers/digest');
const api = require('./controllers/api');
const {Server} = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: '*',
    }
});

const port = process.env.PORT ? process.env.PORT : 7071;

const frontend_host = process.env.FRONTEND_HOST ? process.env.FRONTEND_HOST : 'localhost';
const frontend_port = process.env.FRONTEND_PORT ? process.env.FRONTEND_PORT : 7070;
const frontend_addr = `http://${frontend_host}:${frontend_port}/`;

const topic_uav = '/uav';

var comm_mode = 'internet';

mqttHandler.subscribeToTopic(topic_uav, (payload) => {
    // console.log(payload)
    console.log("received uav");
    if(comm_mode != 'internet') return;
    digest.processDataUAV(payload)
    .then(()=>{
        // const data = JSON.parse(payload);
        // data.info = 'new data';
        // data.time = new Date().toISOString();
        io.emit('uav', {message: 'data'});
    })
    .catch((err)=>{
        console.log(err);
    })
});

io.on('connection', async (socket)=>{
    console.log('New connection on socket.io');

    socket.on("disconnect", async () => {
    });

    socket.on('api', async (msg)=>{
        const payload = await api.handleGet(msg);
        payload.query = msg;
        socket.emit('update', payload);
    });

    socket.on('mode', async (msg) => {
        socket.comm_mode = msg.mode;
        comm_mode = socket.comm_mode;
        console.log(socket.comm_mode);
    });
    
    socket.on('serial', async (msg) => {
        // console.log(msg)
        if(comm_mode != 'telemetry') return;
        digest.processDataUAV(msg.data.data)
        .then(()=>{
            io.emit('uav', {});
        })
        .catch((err)=>{
            console.log(err);
        })
    });
});


app.get('/', async (req, res) => {
    console.log(req.query);
    const get = await api.handleGet(req.query);
    res.send(get);
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
