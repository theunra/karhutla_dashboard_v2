export function createStatusMonitor(id, data, color='rgb(211, 211, 5), yellow'){
    const monitor = document.getElementById(id);
    const val_id = data.name.replace(/\s/g, "").toLowerCase();
    monitor.innerHTML += 
    `
    <div class="col me-2" style="background-color: #1D1C1C;">
        <div class="m-1 mt-3" style="background-image: linear-gradient(to right, ${color}); height: 3vh;"></div>
        <div id="${val_id}_value" style="font-size: 3vw; padding-top: 2vh; height: 13vh;">${data.value}</div>
        <div style="font-size: 1.2vw; padding-top: 0.5vh; height: 4vh;">${data.name}</div>
    </div>
    `;
    return val_id;
}

export function createStatusMonitorImage(id, data){
    const monitor = document.getElementById(id);
    const val_id = data.name.replace(/\s/g, "").toLowerCase();
    monitor.innerHTML += 
    `
    <div class="col me-2" style="background-color: #1D1C1C;">
        <canvas id="${val_id}" width=140 height=140 style="background-color: greenyellow; margin-top:10px"></canvas>
        <div style="font-size: 1.2vw; padding-top: 0.5vh; height: 4vh;">${data.name}</div>
    </div>
    `;
    return val_id;
}

export function updateSensorMonitorValue(id, value){
    const val = document.getElementById(id+'_value');
    val.innerText = value;
}