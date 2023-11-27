import {createStatusMonitor, createStatusMonitorImage, updateSensorMonitorValue} from './StatusMonitor.js'
import { createMap, updatePlane} from './Map.js';
import { createThermalImage, updateImage } from './ThermalImage.js';
import socket_handler from './SocketHandler.js';

export function Location(){
    const content = document.getElementById("content");
    content.innerHTML =
    `
    <div class="col m-3" style="height: 86vh;">
        <div class="row" style="height: 60vh;">
            <div class="col me-3" style="height: 86vh; background-color: #1D1C1C;"> 
                <div id="map-l"></div>
            </div>
            <div class="col-3 ">
                <div class="row mb-3" id="monitor-container-1" style="height: 24vh;"></div>
                <div class="row mb-3" id="monitor-container-2" style="height: 24vh;"></div>
            </div>
        </div>
    </div>
    `;

    const airspeed = createStatusMonitor("monitor-container-1", {name : "Airspeed", value:"- m/s"});
    const humidity = createStatusMonitor("monitor-container-1", {name : "Humidity", value:"- %"});
    const thermal_peak = createStatusMonitor("monitor-container-2", {name : "Thermal Peak", value:"- °C"});
    // createStatusMonitor("monitor-container-2", {name : "Humidity", value:"12 %"});
    const thermal_camera = createStatusMonitorImage("monitor-container-2", {name: "Thermal Camera", value:"20 C"})
    

    const thermal_image = createThermalImage(thermal_camera);

    const plane = createMap("map-l");

    socket_handler.handleOnUpdate = (msg) => {
        console.log("handle in loc");

        const data = msg.message;

        if(socket_handler.compareQuery(msg.query, {id: 'enose',type: 'data',key: 'raw',value: 'get'})){
            const last_data = data[data.length - 1];

            updatePlane(plane, data);

            const therm_p = Math.max(...last_data.thermal_data);
            updateSensorMonitorValue(humidity, (last_data.bme_humidity).toFixed(1));
            updateSensorMonitorValue(airspeed, (last_data.airspeed).toFixed(1));
            updateSensorMonitorValue(thermal_peak, (therm_p).toFixed(1));

            updateImage(thermal_camera, last_data.thermal_data);
        }
        
    };

    socket_handler.handleOnUAV = (msg) => {
        console.log("on uav");
        console.log(msg);

        socket_handler.request({
            id: 'enose',
            type: 'data',
            key: 'raw',
            value: 'get'
        });
    }

    socket_handler.request({
        id: 'enose',
        type: 'data',
        key: 'raw',
        value: 'get'
    });
}