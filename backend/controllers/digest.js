const {enose_model} = require('../models/model');

const digest = {
    processDataUAV: async (payload) => {
        console.log(`Processing data ${payload}`);
        
        const data = JSON.parse(payload);
        // const device_name = data.name;

        // const sipuber_device = await sipuber_model.getSipuberDeviceByName(device_name);
        
        // if(sipuber_device){
        //     // Generate time
        //     // Time in UTC, ISO format
        //     const nowtimems = Date.now();
        //     const tm = new Date(nowtimems);
        //     const d = tm.toISOString().split('T');
        //     const x = d[1].split('.');
        //     const date = `${d[0]} ${x[0]}`;

        //     await sipuber_model.insertSipuberSensorData(
        //         sipuber_model.createSipuberSensorData(
        //             date,
        //             data.latitude,
        //             data.longitude,
        //             data.co,
        //             data.h2s,
        //             data.no2,
        //             data.o3,
        //             data.dust,
        //             sipuber_device.id
        //         ));
        // }else{
        //     console.log(`Unregistered sipuber device : ${device_name}`);
        //     return;
        // }
    },
    
    processData: async (payload) => {
        
    },
    
}

module.exports= digest;