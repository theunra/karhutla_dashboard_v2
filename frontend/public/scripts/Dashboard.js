import {createStatusMonitor, createStatusMonitorImage} from './StatusMonitor.js'
import {createSensorGraph, createSensorMonitor, updateSensorMonitorValue, insertToGraph, setDataToGraph} from './SensorGraph.js'
import { createMap } from './Map.js';
import { createThermalImage, updateImage } from './ThermalImage.js';
import socket_handler from './SocketHandler.js';

export function Dashboard(){
    const content = document.getElementById("content");
    content.innerHTML =
    `
    <div class="col-5 m-3" id="sensor-monitors" style="height: 86vh;"></div>
    <div class="col m-3" style="height: 86vh;">
        <div class="row" style="height: 60vh; background-color: #1D1C1C;"><div id="map"></div></div>
        <div class="row my-3" id="monitor-container" style="height: 24vh;"></div>
    </div>
    `;

    const airspeed = createStatusMonitor("monitor-container", {name : "Airspeed", value:"- m/s"});
    const humidity = createStatusMonitor("monitor-container", {name : "Humidity", value:"- %"});
    const thermal_peak = createStatusMonitor("monitor-container", {name : "Thermal Peak", value:"- °C"});
    const thermal_camera = createStatusMonitorImage("monitor-container", {name: "Thermal Camera", value:"20 C"})

    createSensorMonitor(
        "sensor-monitors", 
        "graph1",
        [
            {name: "CJMCU", type: "CO"},
            {name: "TGS2600", type: "CO"},
            {name: "TGS2600", type: "CH4"},
            {name: "TGS2600", type: "H2S"},
        ]
    );

    createSensorMonitor(
        "sensor-monitors", 
        "graph2",
        [
            {name: "TGS2602", type: "NH3"},
            {name: "TGS2602", type: "VOC"},
            {name: "Density", type: "Dust"}
        ]
    );

    const sensor_graph_1 = createSensorGraph(
        "graph1", 
        "sensor1", 
        [
            {name: "CJMCU", type: "CO"},
            {name: "TGS2600", type: "CO"},
            {name: "TGS2600", type: "CH4"},
            {name: "TGS2600", type: "H2S"},
        ]
    );

    const sensor_graph_2 = createSensorGraph(
        "graph2", 
        "sensor2", 
        [
            {name: "TGS2602", type: "NH3"},
            {name: "TGS2602", type: "VOC"},
            {name: "Density", type: "Dust"}
        ]
    );

    const thermal_image = createThermalImage(thermal_camera);
    
    const plane = createMap("map");

    socket_handler.handleOnUpdate = (msg) => {
        console.log("handle in dash");
        console.log(msg);
        
        const data = msg.message;

        if(socket_handler.compareQuery(msg.query, {id: 'enose',type: 'data',key: 'raw',value: 'get'})){
            const last_data = data[data.length - 1];
            const therm_p = Math.max(...last_data.thermal_data);

            updateSensorMonitorValue(humidity, (last_data.bme_humidity).toFixed(1));
            updateSensorMonitorValue(airspeed, (last_data.airspeed).toFixed(1));
            updateSensorMonitorValue(thermal_peak, (therm_p).toFixed(1));

            const time_datas = data.map((data) => data.time.split('T')[1].split('.')[0]);
            const tgs2602_nh3_datas = data.map((data) => data.tgs2602_nh3);
            const tgs2602_voc_datas = data.map((data) => data.tgs2602_voc);
            const dust_density_datas = data.map((data) => data.dust_density);
            setDataToGraph(sensor_graph_1, time_datas, [tgs2602_nh3_datas, tgs2602_voc_datas, dust_density_datas]);

            updateImage(thermal_camera, last_data.thermal_data);
        }
    };

    socket_handler.handleOnUAV = (msg) => {
        console.log("on uav");
        console.log(msg);

        const data = msg.message;
        const therm_p = Math.max(...data.thermal_data);

        updateSensorMonitorValue(humidity, (data.bme_humidity).toFixed(1));
        updateSensorMonitorValue(airspeed, (data.airspeed).toFixed(1));
        updateSensorMonitorValue(thermal_peak, (therm_p).toFixed(1));

        insertToGraph(sensor_graph_1, data.time.split('T')[1].split('.')[0], [data.tgs2602_nh3, data.tgs2602_voc, data.dust_density]);

        updateImage(thermal_camera, data.thermal_data);
    };

    socket_handler.request({
        id: 'enose',
        type: 'data',
        key: 'raw',
        value: 'get'
    });
}
