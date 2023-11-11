export function createSensorMonitor(id, graph_id, sensors){
    const monitor = document.getElementById(id);
    const linecolors = ['red', 'aqua', 'greenyellow', 'purple']; 
    var labels = "";
    var graph_val_idx = 0;

    sensors.forEach(sensor => {
        labels += `
        <div class="row">
            <div class="col-2"><i class="bi bi bi-circle-fill" style="font-size: 1.2vw;color: ${linecolors[graph_val_idx]};"></i></div>
            <div class="col-3" style="text-align: start; color: ${linecolors[graph_val_idx]};"><span style="font-size: 1.2vw;">${sensor.type}</span><br><span style="position: relative; top: -5px; font-size: 0.8vw;">${sensor.name}</span></div>
            <div class="col" id="${graph_id}_val_${graph_val_idx}" style="text-align: center; font-size: 1.1vw;">-</div>
        </div> `;

        graph_val_idx++;
    });

    monitor.innerHTML +=
    `
    <div class="row bg-dash-graph mb-3" style="height: 42vh;">
        <div class="col-9 m-2" style="height: 40vh;"><canvas class="graph" id="${graph_id}" style="height: 40vh; width: 30vw;"></canvas></div>
        <div class="col py-2 m-1" style="height: 40vh;">
            ${labels}
        </div>
    </div>
    `
}

export function createSensorGraph(id, label, datas) {
    const ctx = document.getElementById(id);
    const datasets = [];
    const linecolors = ['red', 'aqua', 'greenyellow', 'purple']; 
    let linecolors_idx = 0;

    datas.forEach(data => {
        if(data.color){
            
        }
        
        datasets.push({
            label: label,
            data: [],
            fill: false,
            tension: 0.3,
            backgroundColor: linecolors[linecolors_idx],
            borderColor: linecolors[linecolors_idx],
            color: '#444444',
        });

        linecolors_idx++;
    });

    const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: datasets
    },
    options: {
        responsive:false,
        // animation: false,
        scaleFontColor: '#FFFFFF',
        spanGaps:true,
        scales:{
            x:{
                grid: {
                    color:'#444444',
                }
            },
            y:{
                grid: {
                    color:'#444444',
                }
            }
        },
        plugins:{
            legend:{
                display:false,
            }
        }
    }
    });

    return chart;
}