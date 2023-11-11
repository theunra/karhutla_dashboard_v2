const mqtt = require('mqtt');

const protocol = 'mqtt';
const host = process.env.MQTT_HOST ? process.env.MQTT_HOST : 'mqtt-broker';
const port = process.env.MQTT_PORT ? process.env.MQTT_PORT : 1883;

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `${protocol}://${host}:${port}`;

console.log(`Connecting to MQTT : ${connectUrl}`);

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});

module.exports = client;