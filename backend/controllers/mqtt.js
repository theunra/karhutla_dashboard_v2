const mqttClient = require('../lib/mqtt')

var topicCallbacks = {}

const mqttHandler = {
    connected : false,

    subscribeToTopic : (topic, callback) => {
        mqttClient.subscribe([topic], () => {
            console.log(`Subscribed to topic '${topic}'`);
        });

        topicCallbacks[topic] = callback;
    },
};

mqttClient.on('connect', () => {
    mqttHandler.connected = true;
});

mqttClient.on('message', (msg_topic, msg_payload) => {
    topicCallbacks[msg_topic](msg_payload);
});

module.exports = mqttHandler;