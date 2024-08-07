const express = require('express')
const http = require('http');
const {Server} = require('socket.io');
const Client = require('socket.io-client');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 7070;
const backend_socket = Client.io('http://localhost:7071/')

const {api: api_front} = require('./controllers/api_front');
const {get: api_back_get, post: api_back_post} = require('./controllers/api_back')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/styles',express.static(__dirname + '/style'));
app.use('/images',express.static(__dirname + '/public/images'));
app.use('/scripts',express.static(__dirname + '/public/scripts'));
app.use('/datas',express.static(__dirname + '/public/datas'));
app.use('/pages',express.static(__dirname + '/public/pages'));

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('api', async (msg) =>{
        const payload = await api_front.handleApi(socket, msg);
        socket.emit('update', payload);
    })
});


backend_socket.on('connect_error', (error) => {
    console.log(`Cannot connect to backend socket.io`);
});

backend_socket.on('update', async (msg) => {
    await api_back_post.handleApi(null, msg);
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


///////////parse sensor data
// const sensor_datas = [];
// const filename = 'kebakaran';
// fs.readFile(`./public/datas/${filename}.csv`, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     function processSensorData(data){
//         const DATA_UAV_LEN = 7;
//         const DATA_SENSOR_LEN = 9;
//         const DATA_THERMAL_LEN = 64;
//         const DATA_FIRE_LEN = 1;
//         const NORMAL_DATA_LEN = DATA_UAV_LEN + DATA_SENSOR_LEN + DATA_THERMAL_LEN + DATA_FIRE_LEN;
//         const data_arr = data.split(',');
//         if(data_arr.length != NORMAL_DATA_LEN)            
//             return null;//reject

//         const thermal_datas_arr = data_arr.slice(DATA_UAV_LEN + DATA_SENSOR_LEN,data_arr.length - 1);
//         const thermal_datas = []
//         thermal_datas_arr.forEach(thermal_d => {
//             thermal_datas.push(parseFloat(thermal_d));
//         });

//         var idx = -1;
//         const latlon_mult = 1e-7;
//         const payload = {
//             time            : data_arr[++idx],
//             roll            : parseFloat(data_arr[++idx]),
//             pitch           : parseFloat(data_arr[++idx]),
//             yaw             : parseFloat(data_arr[++idx]),
//             altitude        : parseFloat(data_arr[++idx]),
//             latitude        : parseFloat(data_arr[++idx]) * latlon_mult,
//             longitude       : parseFloat(data_arr[++idx]) * latlon_mult,
//             airspeed        : parseFloat(data_arr[++idx]),
//             cjmcu_co        : parseFloat(data_arr[++idx]), 
//             bme_humidity    : parseFloat(data_arr[++idx]), 
//             dust_density    : parseFloat(data_arr[++idx]), 
//             tgs2600_co      : parseFloat(data_arr[++idx]), 
//             tgs2600_ch4     : parseFloat(data_arr[++idx]), 
//             tgs2600_h2s     : parseFloat(data_arr[++idx]), 
//             tgs2602_nh3     : parseFloat(data_arr[++idx]), 
//             tgs2602_voc     : parseFloat(data_arr[++idx]), 
//             thermal_data    : thermal_datas, 
//             fire: parseFloat(data_arr[data_arr.length - 1])
//         }

//         return payload;
//     }

//     var out = ''
//     for(let i in data){
//         out += data[i];
//         if(data[i] == '\n')
//         {
//             const sensor_data = processSensorData(out);
//             sensor_datas.push(sensor_data);
//             out='';
//         }
//     }
// });
