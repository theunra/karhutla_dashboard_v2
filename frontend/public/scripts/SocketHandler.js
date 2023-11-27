const addr = "vmserver";
var socket = io(addr, { path : "/api/socket.io"},{
});

const socket_handler = {
    request: (msg) =>{
        socket.emit('api', msg);
    },

    handleOnUpdate: (msg) => {
        console.log(msg);
    },

    handleOnUAV: (msg) => {
        console.log(msg);
    },

    compareQuery: (query, key) => {
        if(query.id    !== key.id) return false;
        if(query.type  !== key.type) return false;
        if(query.key   !== key.key) return false;
        if(query.value !== key.value) return false;

        return true;
    }
};

socket.on('update', (msg) => {
    socket_handler.handleOnUpdate(msg)
});

socket.on('uav', (msg) => {
    socket_handler.handleOnUAV(msg)
});

socket.on('connect', (msg) => {
    console.log('backend connected');
});

export default socket_handler;