class ApiHandler {
    constructor(){
        this.callbacks = new Map();
    }
    assignCallback(id, type, key, value, callback = (socket, query) => {}){
        const params = {
            id : id,
            type : type,
            key : key,
            value : value,
        };

        this.callbacks.set(params, callback);
    }

    async handleApi (socket, query) {
        for (let [key,val] of this.callbacks){
            if(query.id    !== key.id) continue;
            if(query.type  !== key.type) continue;
            if(query.key   !== key.key) continue;
            if(query.value !== key.value) continue;

            const cb = val;
            console.log(cb);

            return cb(socket, query);
        }

        return 404;
    }
}

module.exports={ApiHandler: ApiHandler};