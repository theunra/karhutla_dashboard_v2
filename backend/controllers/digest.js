const {enose_model} = require('../models/model');

const digest = {
    processDataUAV: async (payload) => {
        try{
            console.log(`Processing data ${payload}`);
        
            //parse
            //strip from alphabet
            // payload = payload;
            var parsed;
            try{
                var parsed = String(payload).replace(/[^\d,.^\n^\-]/g,"").split(',');
            } catch{
                return;
            }

            if(parsed.length < 77) return;
            try{
                const i = parseInt(parsed[parsed.length - 1]);
                if(i != 0 && i != 1) return;
            } catch {
                console.log('fucking stupid web serial');
                return;
            }
            console.log(parsed);
            // lat, lon, cjmcu_CO, bme.hum(), dust.getDustDensity(), tgs2600.getppm_CO(), tgs2600.getppm_CH4(), tgs2602.getppm_H2S(), 
            // tgs2602.getppm_NH3(), tgs2602.getppm_VOC(), thermal
            var i = 0;
            const data = {
                latitude: parseFloat(parsed[i++]),
                longitude: parseFloat(parsed[i++]),
                roll: -1,
                pitch: -1,
                yaw: -1,
                altitude: parseFloat(parsed[i++]),
                airspeed: parseFloat(parsed[i++]),
                cjmcu_co: parseFloat(parsed[i++]),
                bme_humidity: parseFloat(parsed[i++]),
                dust_density: parseFloat(parsed[i++]),
                tgs2600_co: parseFloat(parsed[i++]),
                tgs2600_ch4: parseFloat(parsed[i++]),
                tgs2600_h2s: parseFloat(parsed[i++]),
                tgs2602_nh3: parseFloat(parsed[i++]),
                tgs2602_voc: parseFloat(parsed[i++]),
            };
            
            data.thermal_data = [];
            for(let j = 0;j < 64; j++){
                data.thermal_data.push(parseFloat(parsed[i++]));
            }
            
            data.fire = parseInt(parsed[i++]);

            if(data){
                data.time = new Date().toUTCString();
                console.log(data)
                enose_model.insertEnoseData(enose_model.createEnoseData(data));
            }
        }
        catch{
            return;
        }
        
            
    },
    
    processData: async (payload) => {
        
    },

    getEnoseData: async (payload) => {
        return enose_model.getEnoseData(payload);
    }
    
}

module.exports= digest;