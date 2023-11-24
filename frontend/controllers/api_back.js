const {ApiHandler} = require('../lib/api');

const get = new ApiHandler();
const post = new ApiHandler();

get.assignCallback(
    'saveforest-ai',
    'sensor',
    'data',
    'get-all',
    (socket, query) => {
        return {message: 200};
    }
)

post.assignCallback(
    'saveforest-ai',
    'sensor',
    'data',
    'new',
    (socket, query) => {
        return {message: 200};
    }
)

module.exports={get: get, post: post};