import {createStatusMonitor} from './StatusMonitor.js'
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
            <div class="col-5 ">
                <div class="row mb-3" id="monitor-container-1" style="height: 24vh;"></div>
                <div class="row mb-3" id="monitor-container-2" style="height: 24vh;"></div>
            </div>
        </div>
    </div>
    `;

    createStatusMonitor("monitor-container-1", {name : "Airspeed", value:"- m/s"});
    createStatusMonitor("monitor-container-1", {name : "Humidity", value:"- %"});
    createStatusMonitor("monitor-container-2", {name : "Temperature", value:"- °C"});
    createStatusMonitor("monitor-container-2", {name : "Humidity", value:"12 %"});

    socket_handler.handleOnUpdate = (msg) => {
        console.log("handle in loc");
    };
}