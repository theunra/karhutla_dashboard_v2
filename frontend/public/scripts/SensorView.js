import {createStatusMonitor, createStatusMonitorImage, updateSensorMonitorValue} from './StatusMonitor.js'
import {createSensorGraph, createSensorMonitor1, insertToGraph, setDataToGraph} from './SensorGraph.js'
import { createMap, rad_to_deg , updatePlane} from './Map.js';
import { createThermalImage, updateImage } from './ThermalImage.js';
import socket_handler from './SocketHandler.js';

export function SensorView(){
    const content = document.getElementById("content");
    content.innerHTML =
    `
    <div class="col m-3" id="sensor-monitors" style="height: 86vh;"></div>
    <div class="col-4 m-3" style="height: 86vh;">
        <div class="row my-3" id="monitor-container1" style="height: 24vh;"></div>
        <div class="row my-3" id="monitor-container2" style="height: 24vh;"></div>
        <div class="row my-3" id="monitor-container3" style="height: 24vh;"></div>
    </div>
    `;

    // const airspeed = createStatusMonitor("monitor-container", {name : "Airspeed", value:"- m/s"});
    // const humidity = createStatusMonitor("monitor-container", {name : "Humidity", value:"- %"});
    // const thermal_peak = createStatusMonitor("monitor-container", {name : "Thermal Peak", value:"- °C"});
    // const thermal_camera = createStatusMonitorImage("monitor-container", {name: "Thermal Camera", value:"20 C"})
    const monitor_cjmcu_co      = createStatusMonitor("monitor-container1", {name : "CJMCU CO"    , value:"-"}, 'rgb(100,100,100), red');
    const monitor_tgs2600_co    = createStatusMonitor("monitor-container1", {name : "TGS2600 CO"  , value:"-"}, 'rgb(100,100,100), blue');
    const monitor_tgs2600_ch4   = createStatusMonitor("monitor-container1", {name : "TGS2600 CH4" , value:"-"}, 'rgb(100,100,100), aqua');
    const monitor_tgs2600_h2s   = createStatusMonitor("monitor-container2", {name : "TGS2600 H2S" , value:"-"}, 'rgb(100,100,100), greenyellow');
    const monitor_tgs2602_nh3   = createStatusMonitor("monitor-container2", {name : "TGS2602 NH3" , value:"-"}, 'rgb(100,100,100), green');
    const monitor_tgs2602_voc   = createStatusMonitor("monitor-container2", {name : "TGS2602 VOC" , value:"-"}, 'rgb(100,100,100), orange');
    const monitor_humidity      = createStatusMonitor("monitor-container3", {name : "BME Humidity", value:"-"}, 'rgb(100,100,100), yellow');
    const monitor_dust          = createStatusMonitor("monitor-container3", {name : "Dust Density", value:"-"}, 'rgb(100,100,100), purple');

    createSensorMonitor1(
        "sensor-monitors", 
        [
            "graph1",
            "graph2",
            "graph3",
        ],
        [
            {name: "CJMCU", type: "CO"},
            {name: "TGS2600", type: "CO"},
        ]
    );

    createSensorMonitor1(
        "sensor-monitors", 
        [
            "graph4",
            "graph5",
            "graph6",
        ],
        [
            {name: "TGS2602", type: "NH3"},
            {name: "TGS2602", type: "VOC"},
        ]
    );

    const sensor_graph_1 = createSensorGraph(
        "graph1", 
        "sensor1", 
        [
            {name: "CJMCU", type: "CO", color: "red"},
            {name: "TGS2600", type: "CO", color: "blue"},
        ]
    );

    const sensor_graph_2 = createSensorGraph(
        "graph2", 
        "sensor2", 
        [
            {name: "TGS2600", type: "CH4", color: "aqua"},
        ]
    );

    const sensor_graph_3 = createSensorGraph(
        "graph3", 
        "sensor3", 
        [
            {name: "TGS2600", type: "NH3", color: "green"},
            {name: "TGS2602", type: "VOC", color: "orange"},
        ]
    );

    const sensor_graph_4 = createSensorGraph(
        "graph4", 
        "sensor4", 
        [
            {name: "BME", type: "Humidity", color: "yellow"},
        ]
    );

    const sensor_graph_5 = createSensorGraph(
        "graph5", 
        "sensor5", 
        [
            {name: "TGS2600", type: "H2S", color: "greenyellow"},
        ]
    );

    const sensor_graph_6 = createSensorGraph(
        "graph6", 
        "sensor6", 
        [
            {name: "Dust", type: "Density", color: "purple"},
        ]
    );

    // const thermal_image = createThermalImage(thermal_camera);
    
    // const plane = createMap("map");

    // function setGraphData(id, value){
    //     const graphvaldata = value.toFixed(2);
    //     const graph_val = document.getElementById(id);
    //     graph_val.innerText = graphvaldata;
    // }

    socket_handler.handleOnUpdate = (msg) => {
        console.log("handle in sensorview");
        console.log(msg);
        
        const data = msg.message;

        if(socket_handler.compareQuery(msg.query, {id: 'enose',type: 'data',key: 'raw',value: 'get'})){
            const last_data = data[data.length - 1];

    //         updatePlane(plane, data);

    //         const therm_p = Math.max(...last_data.thermal_data);
    //         updateSensorMonitorValue(humidity, (last_data.bme_humidity).toFixed(1));
    //         updateSensorMonitorValue(airspeed, (last_data.airspeed).toFixed(1));
    //         updateSensorMonitorValue(thermal_peak, (therm_p).toFixed(1));

            const time_datas = data.map((data) => data.time.split('T')[1].split('.')[0]);
            const tgs2602_nh3_datas = data.map((data) => data.tgs2602_nh3);
            const tgs2602_voc_datas = data.map((data) => data.tgs2602_voc);
            const dust_density_datas = data.map((data) => data.dust_density);
            const cjmcu_co_datas = data.map((data) => data.cjmcu_co);
            const tgs2600_co_datas = data.map((data) => data.tgs2600_co);
            const tgs2600_ch4_datas = data.map((data) => data.tgs2600_ch4);
            const tgs2600_h2s_datas = data.map((data) => data.tgs2600_h2s);
            const bme_humidity = data.map((data) => data.bme_humidity);

            updateSensorMonitorValue(monitor_cjmcu_co, (last_data.cjmcu_co).toFixed(1));
            updateSensorMonitorValue(monitor_tgs2600_co, (last_data.tgs2600_co).toFixed(1));
            updateSensorMonitorValue(monitor_tgs2600_ch4, (last_data.tgs2600_ch4).toFixed(1));
            updateSensorMonitorValue(monitor_tgs2600_h2s, (last_data.tgs2600_h2s).toFixed(1));
            updateSensorMonitorValue(monitor_tgs2602_nh3, (last_data.tgs2602_nh3).toFixed(1));
            updateSensorMonitorValue(monitor_tgs2602_voc, (last_data.tgs2602_voc).toFixed(1));
            updateSensorMonitorValue(monitor_humidity, (last_data.bme_humidity).toFixed(1));
            updateSensorMonitorValue(monitor_dust, (last_data.dust_density).toFixed(1));

            // setGraphData('graph1_val_0', last_data.cjmcu_co);
    //         setGraphData('graph1_val_1', last_data.tgs2600_co);
    //         setGraphData('graph1_val_2', last_data.tgs2600_ch4);
    //         setGraphData('graph1_val_3', last_data.tgs2600_h2s);

    //         setGraphData('graph2_val_0', last_data.tgs2602_nh3);
    //         setGraphData('graph2_val_1', last_data.dust_density);
    //         setGraphData('graph2_val_2', last_data.tgs2602_voc);

            setDataToGraph(sensor_graph_1, time_datas, [cjmcu_co_datas, tgs2600_co_datas]);
            setDataToGraph(sensor_graph_2, time_datas, [tgs2600_ch4_datas]);
            setDataToGraph(sensor_graph_3, time_datas, [tgs2602_nh3_datas, tgs2602_voc_datas]);
            setDataToGraph(sensor_graph_4, time_datas, [bme_humidity]);
            setDataToGraph(sensor_graph_5, time_datas, [tgs2600_h2s_datas]);
            setDataToGraph(sensor_graph_6, time_datas, [dust_density_datas]);

    //         updateImage(thermal_camera, last_data.thermal_data);
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
    };

    socket_handler.request({
        id: 'enose',
        type: 'data',
        key: 'raw',
        value: 'get'
    });
}
