import {createStatusMonitor, createStatusMonitorImage, updateSensorMonitorValue} from './StatusMonitor.js'
import {createSensorGraph, createSensorMonitor, insertToGraph, setDataToGraph} from './SensorGraph.js'
import { createMap, rad_to_deg , updatePlane} from './Map.js';
import { createThermalImage, updateImage } from './ThermalImage.js';
import socket_handler from './SocketHandler.js';
import { SensorView } from './SensorView.js';
import serialHandler from './SerialHandler.js';

var status_messages = [];

export function Status(){
    const content = document.getElementById("content");
    content.innerHTML =
    `
    <div class="col m-3"style="height: 86vh;">
        <div class="row">
            <div class="text-start status-head-text">UAV</div>
            <img class="status-plane" src="/images/plane_w.png">
            <button class="status-button" id="connect-uav">Connect</button>
        </div>
        <div class="row" style="margin-top: 5vh;">
            <div class="text-start status-head-text">Database</div>
            <img class="status-plane" src="/images/db.png">
            <button class="status-button text-center">Download</button>
            <button class="status-button" style="background-color: red;">Reset</button>
        </div>
    </div>
    <div class="col m-3" id="status-monitor" style="height: 86vh;">
        <div class="row">
            <img class="status-log-button" src="/images/don.png">
            <img class="status-log-button" src="/images/res.png">
            <img class="status-log-button" src="/images/pause.png">
        </div>
        <div class="row status-log-panel">
            <div class="status-log-head">
                <div style="margin-bottom: 10px; padding: 20px;">Log Status</div>
                <div class="text-start status-log-messages" id="status-messages"></div>
            </div>
        </div>
    </div>
    <div id="modal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <button class="status-button-modal text-center" id="inter-btn">Internet</button>
            <button class="status-button-modal text-center" id="telem-btn">Telemetry</button>
        </div>

    </div>
    `;
    // Get the modal
    var modal = document.getElementById("modal");

    // Get the button that opens the modal
    var btn = document.getElementById("connect-uav");
    var interbtn = document.getElementById("inter-btn");
    var telembtn = document.getElementById("telem-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    interbtn.onclick = function(){
        modal.style.display = "none";
        socket_handler.mode = "internet";
        socket_handler.changeMode(socket_handler.mode);
    }

    telembtn.onclick = function(){
        modal.style.display = "none";
        socket_handler.mode  = "telemetry";
        socket_handler.changeMode(socket_handler.mode);
        serialHandler.RequestSerial(57600);
    }
    
    telembtn.disabled = !serialHandler.isSupported();
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    // const connect_uav = document.getElementById("connect-uav");
    // console.log(serialHandler.isSupported());
    // connect_uav.addEventListener("click", (event)=>{
    //     console.log('hello')
    //     serialHandler.RequestSerial(57600);
    // });

    function updateStatusMessages(msg){
        if(status_messages.length > 10){
            status_messages.shift();
        }

        if(msg) status_messages.push(msg);
        
        const sm = document.getElementById("status-messages");
        sm.innerText = "";

        const time = new Date().toLocaleString();

        status_messages.forEach((msg)=>{
            sm.innerText += time + " [INFO] " + msg + "\n";
        });
    }

    socket_handler.handleOnUAV = (msg) => {
        console.log("on uav");
        console.log(msg);

        updateStatusMessages("New data received from UAV");
    }

    updateStatusMessages();

    socket_handler.sendSerialData({data : 'ok'});
}
