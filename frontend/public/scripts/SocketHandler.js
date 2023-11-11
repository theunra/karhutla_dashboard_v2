var socket = io();

const socket_handler = {
    request: (msg) =>{
        socket.emit('api', msg);
    },

    handleUpdate: (msg) => {
        console.log(msg);
    }
};

socket.on('update', (msg) => {
    socket_handler.handleUpdate(msg)
});

export default socket_handler;