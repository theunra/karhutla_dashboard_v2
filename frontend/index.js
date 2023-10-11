const express = require('express')
const http = require('http');
const {Server} = require('socket.io');
const fs = require('fs');

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
app.use('/datas',express.static(__dirname + '/public/datas'));

io.on('connection', (socket) => {
    console.log('new connection');
    var idx = 0;
    setInterval(()=>{
        if(idx > sensor_datas.length) return;
        socket.emit('update', sensor_datas[idx]);
        idx++;
    }, 1000);
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


///////////parse sensor data
const sensor_datas = []

fs.readFile('./public/datas/takeoff_1_sensor_edit.csv', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    function processSensorData(data){
        const NORMAL_DATA_LEN = 74;
        const data_arr = data.split(',');
        if(data_arr.length != NORMAL_DATA_LEN)            
            return null;//reject

        const thermal_datas_arr = data_arr.slice(9 ,data_arr.length - 1);
        const thermal_datas = []
        thermal_datas_arr.forEach(thermal_d => {
            thermal_datas.push(parseFloat(thermal_d));
        });

        var idx = -1
        const payload = {
            time            : data_arr[++idx],
            cjmcu_co        : parseFloat(data_arr[++idx]), 
            bme_humidity    : parseFloat(data_arr[++idx]), 
            dust_density    : parseFloat(data_arr[++idx]), 
            tgs2600_co      : parseFloat(data_arr[++idx]), 
            tgs2600_ch4     : parseFloat(data_arr[++idx]), 
            tgs2600_h2s     : parseFloat(data_arr[++idx]), 
            tgs2602_nh3     : parseFloat(data_arr[++idx]), 
            tgs2602_voc     : parseFloat(data_arr[++idx]), 
            thermal_data    : thermal_datas, 
            fire: parseFloat(data_arr[data_arr.length - 1])
        }

        return payload;
    }

    var out = ''
    for(let i in data){
        out += data[i];
        if(data[i] == '\n')
        {
            const sensor_data = processSensorData(out);
            sensor_datas.push(sensor_data);
            out='';
        }
    }
});