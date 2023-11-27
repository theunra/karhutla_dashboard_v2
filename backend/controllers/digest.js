const {enose_model} = require('../models/model');

const digest = {
    processDataUAV: async (payload) => {
        console.log(`Processing data ${payload}`);
        
        const data = JSON.parse(payload);

        if(data){
            data.time = new Date().toUTCString();
            enose_model.insertEnoseData(enose_model.createEnoseData(data));
        }
            
    },
    
    processData: async (payload) => {
        
    },

    getEnoseData: async (payload) => {
        return enose_model.getEnoseData(payload);
    }
    
}

module.exports= digest;