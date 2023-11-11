import {createStatusMonitor, createStatusMonitorImage} from './StatusMonitor.js'
import {createSensorGraph, createSensorMonitor} from './SensorGraph.js'
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
    const temperature = createStatusMonitor("monitor-container", {name : "Thermal Peak", value:"- °C"});
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
    
    socket_handler.handleUpdate = (msg) => {
        console.log("handle in dash");
    };

    socket_handler.request({subscribe:'sensor_data'});
}
