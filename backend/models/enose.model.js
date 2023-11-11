const sequelize = require('../lib/postgres');
const {Op, DataTypes} = require('sequelize');

const EnoseData = sequelize.define("enose_datas", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    altitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    airspeed: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    roll: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    pitch: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    yaw: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    cjmcu_co: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    bme_humidity: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    dust_density: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tgs2600_co: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tgs2600_ch4: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tgs2600_h2s: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tgs2602_nh3: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    tgs2602_voc: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    thermal_data: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: false
    },
    fire: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    version: {
        type: DataTypes.CHAR(10),
        allowNull: true
    }
});

const model = {
    createEnoseData: (
        {time, altitude, airspeed, latitude, longitude, roll, pitch, yaw, cjmcu_co, bme_humidity, dust_density, 
        tgs2600_co, tgs2600_ch4, tgs2600_h2s, tgs2602_nh3, tgs2602_voc, thermal_data, fire, version}
        ) => {
        return {
            time            : time,
            altitude        : altitude,
            airspeed        : airspeed,
            latitude        : latitude,
            longitude       : longitude,
            roll            : roll,
            pitch           : pitch,
            yaw             : yaw,
            cjmcu_co        : cjmcu_co,
            bme_humidity    : bme_humidity,
            dust_density    : dust_density,
            tgs2600_co      : tgs2600_co,
            tgs2600_ch4     : tgs2600_ch4,
            tgs2600_h2s     : tgs2600_h2s,
            tgs2602_nh3     : tgs2602_nh3,
            tgs2602_voc     : tgs2602_voc,
            thermal_data    : thermal_data,
            fire            : fire,
            version         : version
        }
    },

    insertEnoseData: async (record) => {
        return EnoseData.create(record);
    },
};

module.exports={enose_model: model, EnoseData: EnoseData};