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

export function createSensorMonitor1(id, graph_ids, sensors){
    const monitor = document.getElementById(id);
    const linecolors = ['red', 'aqua', 'greenyellow', 'purple']; 
    var labels = "";
    var graph_val_idx = 0;

    // sensors.forEach(sensor => {
    //     labels += `
    //     <div class="row">
    //         <div class="col-2"><i class="bi bi bi-circle-fill" style="font-size: 1.2vw;color: ${linecolors[graph_val_idx]};"></i></div>
    //         <div class="col-3" style="text-align: start; color: ${linecolors[graph_val_idx]};"><span style="font-size: 1.2vw;">${sensor.type}</span><br><span style="position: relative; top: -5px; font-size: 0.8vw;">${sensor.name}</span></div>
    //         <div class="col" id="${graph_id}_val_${graph_val_idx}" style="text-align: center; font-size: 1.1vw;">-</div>
    //     </div> `;

    //     graph_val_idx++;
    // });

    monitor.innerHTML +=
    `
    <div class="row bg-dash-graph mb-3" style="height: 42vh;">
        <div class="col m-2" style="height: 40vh;"><canvas class="graph" id="${graph_ids[0]}" style="height: 40vh; width: 18vw;"></canvas></div>
        <div class="col m-2" style="height: 40vh;"><canvas class="graph" id="${graph_ids[1]}" style="height: 40vh; width: 18vw;"></canvas></div>
        <div class="col m-2" style="height: 40vh;"><canvas class="graph" id="${graph_ids[2]}" style="height: 40vh; width: 18vw;"></canvas></div>
    </div>
    `
}

export function createSensorGraph(id, label, datas) {
    const ctx = document.getElementById(id);
    const datasets = [];
    const linecolors = ['red', 'aqua', 'greenyellow', 'purple']; 
    let linecolors_idx = 0;

    datas.forEach(data => {
        var backgroundColor = linecolors[linecolors_idx];
        var borderColor = linecolors[linecolors_idx];
        if(data.color){
            backgroundColor = data.color;
            borderColor = data.color;
        }
        
        datasets.push({
            label: label,
            data: [],
            fill: false,
            tension: 0.3,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
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
                // type: 'time',
                // time: {
                //     tooltipFormat: 'HH '
                //   },
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


export function insertToGraph(graph, time_data, value){
    if(graph.data.labels.length > 20)
    {
        graph.data.labels.shift();
        graph.data.datasets.forEach((dataset)=>{
            dataset.data.shift();
        });
    }
    graph.data.labels.push(time_data);
    for(let i in graph.data.datasets){
        graph.data.datasets[i].data.push(value[i]);
    }
    graph.update();
}

export function setDataToGraph(graph, time_datas, values){
    graph.data.labels = time_datas;
    for(let i in graph.data.datasets){
        graph.data.datasets[i].data = values[i];
    }
    graph.update();
}