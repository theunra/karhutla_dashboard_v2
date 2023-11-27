// const sequelize = require('../lib/mysql');
const postgres = require('../lib/postgres');

const {enose_model, EnoseData} = require('../models/enose.model');

syncDb();
//////////////////////////////
async function syncDb(){
    //await postgres.sync({force:true})////TESTING////////////////////////////
    await postgres.sync();
	/*
    const record = enose_model.createEnoseData({
        time:'2023-01-02 11:03:24',
        airspeed: 20.1,
        altitude: 0,
        bme_humidity: 0.22,
        cjmcu_co: 10.2,
        dust_density: 124.0,
        fire: 0,
        latitude: -8.420,
        longitude: 102.01,
        pitch: 0.213,
        roll: 0.241,
        tgs2600_ch4: 10.231,
        tgs2600_co: 23.20,
        tgs2600_h2s: 12.3,
        tgs2602_nh3: 1.0,
        tgs2602_voc: 1.2,
        thermal_data: [10, 20, 10.2 ,103.4 , 0.1],
        version:'0.0.1b',
        yaw: 0.125
    });

    console.log(record)

    await enose_model.insertEnoseData(record);*/

}
module.exports= {enose_model: enose_model};
