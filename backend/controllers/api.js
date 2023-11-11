const digest = require('./digest');

var callbacks = new Map();

const api={
    /**
     * API Query Guide
     * 
     * 'name'                   : is a value of variable, const, must-have
     * varA!                    : varA is a variable. must-have varA
     * varA?                    : can-have varA. optional
     * varA! & varB!            : must-have varA AND varB
     * varA! & varB? & varC!    : must-have varA AND varC AND can-have varB
     
     * (varA! / varB!)          : must-have either varA OR varB
     * (varA? / varB?)          : can-have either varA OR varB, OR none
     * (varA! &/ varB!)         : must-have either varA OR varB, OR both
     * (varA? &/ varB?)         : can-have either varA OR varB, OR both OR none
     * 
     * varA[...]!               : must-have varA and more than one
     * varA[3]!                 : must-have varA exactly 3
     * varA[..3]!               : must-have maximum 3 varA
     * varA[3..]!               : must-have minimum 3 varA
     * varA[3..10]!              : must-have minimum 3 and maximum 10 of varA
     * varA[...]?               : can-have more than one varA, or none
     * 
     */

    /**
     * Athus API
     * 
     * Query type! & key! & value! & (extra params if needed)
     * 
     * Location and Mapping
     * GetLocationDetail        'location' & locationType! & ( locationId! / locationName! ) & ( only[...]? / except[...]? )
     * GetAllProvince           'location' & 'province' & 'get-all' & ( only[...]? / except[...]? )
     * GetAllRegencyInProvince  'location' & 'regency' & 'get-in-province' & ( provinceId! / provinceName! ) & ( only[...]? / except[...]? )
     * GetAllDistrictInRegency  'location' & 'district' & 'get-in-regency'  & ( regencyId! / regencyName! ) & ( only[...]? / except[...]? )
     * GetAllUrbanInDistrict    'location' & 'urban' & 'get-in-district' & ( districtId! / districtName! ) & ( only[...]? / except[...]? )
     * 
     * Device
     * GetAllDevice             'device' & 'info' & 'get-all'
     * GetDevice                'device' & 'info' & 'get' & (id? &/ name?)
     * GetAllDeviceInUrban      'device' & 'info' & 'get-in-urban' & ( urbanId? / urbanName? )
     * CreateDevice             'device' & 'data' & 'create' & admin_key! & name! & version! 
     * UpdateDevice             'device' & 'data' & 'update' & admin_key! & id! & (name! &/ version!)
     * 
     * Sensor and Data
     * GetAllSensorData         'sensor' & 'data' & 'get-all'
     * GetSensorData            'sensor' & 'data' & 'get' & ( (startId? &/ endId?) &/ (startTime? &/ endTime?) ) & ( only[...]? / except[...]? )
     * GetAllSensorDataInDevice 'sensor' & 'data' & 'get-in-device' & ( deviceId? / deviceName? )
     
     * 
     * locationType : province, regency, district, urban
     * 
     * 
     * 
     * Example :
     * To query using GetSensorData for data id between 0 -> 100 , after 13:00:00, only humidity and pitch data 
     * http get query : /api?id=athus&type=sensor&key=data&value=get&startId=0&endId=100&startTime=13:00:00&only=humidity&only=pitch
     * websocket json : {"id" : "athus", "type" : "sensor", "key" : "data", "value" : "get", "startId" : 0, "endId" : 100, "startTime" : "13:00:00", "only" : ["humidity", "pitch"]}
     */

    ///////////Callback Functions//////////////////////////////////
    // getAthusSensorData : async (query) => {
    //     const payload = await digest.getDataAthus({
    //         startId         : query.startId   ? parseInt(query.startId) : undefined,
    //         endId           : query.endId     ? parseInt(query.endId)   : undefined,
    //         startTime       : query.startTime ? query.startTime         : undefined,
    //         endTime         : query.endTime   ? query.endTime           : undefined,
    //         athusDeviceId   : 1,
    //         // attributes      : ['id'], 
    //         order           : {by: 'time', dir: 'asc'}
    //     });
    //     return {'message' : payload};
    // },

    // getSipuberSensorData : async (query) => {
    //     const payload = await digest.getDataSipuber({
    //         startId         : query.startId   ? parseInt(query.startId) : undefined,
    //         endId           : query.endId     ? parseInt(query.endId)   : undefined,
    //         startTime       : query.startTime ? query.startTime         : undefined,
    //         endTime         : query.endTime   ? query.endTime           : undefined,
    //         sipuberDeviceId : 1,
    //         order           : {by: 'time', dir: 'asc'}
    //     });
    //     return {'message' : payload};
    // },

    // getAthusAllDevice : async (query) => {
    //     const payload = {devices : []};
    //     return {'message' : payload};
    // },

    // getProvinceWithAthusDevice : async (query) => {
    //     const payload = {provinces : ['Jogjakarta']};
    //     return {'message': payload};
    // },

    // getRegencyWithAthusDevice : async (query) => {
    //     const payload = {regencies : ['Sleman']};
    //     return {'message' : payload};
    // },

    // getDistrictWithAthusDevice : async (query) => {
    //     const payload = {districts : ['Depok']};
    //     return {'message' : payload};
    // },

    // getUrbanWithAthusDevice : async (query) => {
    //     const payload = {urbans : ['Caturtunggal']};
    //     return {'message' : payload};
    // },
    

    assignCallback : (id, type, key, value, callback) => {
        const params = {
            id : id,
            type : type,
            key : key,
            value : value,
        };

        callbacks.set(params, callback);
    },

    /////////Handler Functions/////////////////////////////////////

    handleGet : async (query) => {
        for (let [key,val] of callbacks){
            if(query.id    !== key.id) continue;
            if(query.type  !== key.type) continue;
            if(query.key   !== key.key) continue;
            if(query.value !== key.value) continue;

            const cb = val;
            console.log(cb);

            return cb(query);
        }

        return 404;
    },
}

// api.assignCallback('athus', 'device', 'info', 'get-all', api.getAthusAllDevice)

module.exports=api;