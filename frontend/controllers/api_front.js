const {ApiHandler} = require('../lib/api');

const api = new ApiHandler();

api.assignCallback(
    'saveforest-ai',
    'sensor',
    'data',
    'get-all',
    (socket, query) => {
        return {message: 200};
    }
)

module.exports={api: api};