const sequelize = require('../lib/mysql');
const {Op, DataTypes} = require('sequelize');

/**
 * Modified Alat Takar Hujan Sederhana (modATHUS)
 */

const AthusDevice = sequelize.define("athus_devices", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    version: {
        type: DataTypes.CHAR(10),
        allowNull: true
    }
});

const AthusData = sequelize.define("athus_datas", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
});

const AthusSensorData = sequelize.define("athus_sensor_datas", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    node_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
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
        type: DataTypes.FLOAT,
        allowNull: false
    },
    pitch: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    soil_moisture: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    pressure: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    batteryStatus: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    signalStatus: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

const model = {
    createAthusDevice: (id, name, urbanId, version) => {
        return {
            id      : id,
            name    : name,
            urbanId : urbanId,
            version : version
        };
    },

    insertAthusDevice: async (record) => {
        return AthusDevice.create(record);
    },

    createAthusSensorData: (deviceId, node_id, time, latitude, longitude, roll, pitch, rainfall, soil_moisture, pressure, temperature, humidity, batteryStatus, signalStatus) => {
        return {
            node_id         : node_id,
            time            : time,
            latitude        : latitude,
            longitude       : longitude,
            roll            : roll,
            pitch           : pitch,
            rainfall        : rainfall,
            soil_moisture   : soil_moisture,
            pressure        : pressure,
            temperature     : temperature,
            humidity        : humidity,
            batteryStatus   : batteryStatus,
            signalStatus    : signalStatus,
            athusDeviceId   : deviceId,
        };
    },

    insertAthusSensorData: async (record) => {
        return AthusSensorData.create(record);
    },

    insertBulkAthusSensorData: async (records) => {
        return AthusSensorData.bulkCreate(records);
    },

    getAthusDeviceById: async (id) =>{
        return AthusDevice.findOne({
            where:{
                id: id
            }
        });
    },

    getAthusDeviceByName: async (name) =>{
        return AthusDevice.findOne({
            where:{
                name: name
            }
        });
    },

    getAthusSensorData: async (param) => {
        const query = {}
        const where = {
            athusDeviceId : param.athusDeviceId,
        }

        // Where params
        if(param.startId){
            if(!where.id) where.id = {};
            where.id[Op.gt] = param.startId;
        }
        if(param.endId){
            if(!where.id) where.id = {};
            where.id[Op.lte] = param.endId;
        }
        if(param.startTime){
            if(!where.time) where.time = {};
            where.time[Op.gt] = param.startTime;
        }
        if(param.endTime){
            if(!where.time) where.time = {};
            where.time[Op.lte] = param.endTime;
        }
        
        query.where = where;

        if(param.attributes){
            query.attributes = param.attributes;
        }

        if(param.order){
            query.order = [[param.order.by, param.order.dir]];
        }

        return AthusSensorData.findAll(query);
    },

    getAllAthusSensorData: async () => {
        return AthusSensorData.findAll({});
    }
}

module.exports= {athus_model: model, AthusSensorData: AthusSensorData, AthusDevice: AthusDevice};