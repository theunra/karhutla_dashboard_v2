from paho.mqtt import client as mqtt_client
from time import sleep
import json

broker = 'test.mosquitto.org'
port = 1883
topic = '/athus/mqtt'
client_id = 'athus-0'
data = {
    "deviceId" : 'd4d00810-5719-44d5-b319-6710ec8aa8fb',
    "rainfall" : 2.0,
    "version" : "1.0.0"
}

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    # Set Connecting Client ID
    client = mqtt_client.Client(client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def publish(client):
    global data
    msg_count = 1
    while True:
        sleep(0.3)
        msg = json.dumps(data)
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
        if msg_count > 100:
            break
        data["rainfall"] = data["rainfall"] + 1.2
        
def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
    client.loop_stop()


if __name__ == '__main__':
    run()
