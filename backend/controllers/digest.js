const {enose_model} = require('../models/model');

const digest = {
    processDataUAV: async (payload) => {
        console.log(`Processing data ${payload}`);
        
        const data = JSON.parse(payload);
    },
    
    processData: async (payload) => {
        
    },
    
}

module.exports= digest;