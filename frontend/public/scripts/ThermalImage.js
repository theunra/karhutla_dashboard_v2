var width = 8,
    height = 8,
    buffer = new Uint8ClampedArray(width * height * 4);
    // buffer_in = new Uint8ClampedArray(64 * 64 * 4);

export function createThermalImage(id) {
    const c_thermal_camera = document.getElementById(id);
    const ctx_thermal_camera = c_thermal_camera.getContext("2d");
    ctx_thermal_camera.scale(4,4);
}
export function drawToBuffer(data) {
    const min = Math.min(...data);
    // if(min < 0) min = 0;

    const new_data = [];
    data.forEach(data_ => {
        // if(data_ < 0) data_ = 0;
        // if(data_ > 80) data_ = 50 + Math.random * 20;
        new_data.push(data_ - min);
    });
    const max = Math.max(...new_data);
    const scale = 255.0/max;

    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            const ran = Math.floor(Math.random() * 200);
            var pos = (y * width + x) * 4; // position in buffer based on x and y
            const val = new_data[x+y*width] * scale;
            buffer[pos  ] = val;           // some R value [0,255]
            buffer[pos+1] = val;           // some G value
            buffer[pos+2] = val;           // some B value
            buffer[pos+3] = 255;           // set alpha channel
        }
    }
}

export function updateImage(id, data){
    drawToBuffer(data);
    const c_thermal_camera = document.getElementById(id);
    const ctx_thermal_camera = c_thermal_camera.getContext("2d");
    var img = new ImageData(buffer, width, height);

    createImageBitmap(img).then(renderer => 
        ctx_thermal_camera.drawImage(renderer, 0,0, 40, 40)
    )
}