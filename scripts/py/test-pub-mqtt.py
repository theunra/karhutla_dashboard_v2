from paho.mqtt import client as mqtt_client
from time import sleep
import json

broker = 'localhost'
port = 1883
topic = '/uav'
client_id = 'uav-0'
data = {
    "altitude"        : 0,
    "airspeed"        : 1,
    "latitude"        : -6.914859197932094, 
    "longitude"       : 107.61678805076352,
    "roll"            : 2,
    "pitch"           : 3,
    "yaw"             : 4,
    "cjmcu_co"        : 5,
    "bme_humidity"    : 6,
    "dust_density"    : 7,
    "tgs2600_co"      : 8,
    "tgs2600_ch4"     : 9,
    "tgs2600_h2s"     : 10,
    "tgs2602_nh3"     : 12,
    "tgs2602_voc"     : 12,
    "thermal_data"    : [4.54, 53.69, 0.26, 0.72, 0.89, 0.72, 1.55, 0.93, 19.75, 19.75, 18.75, 18.5, 17.5, 16.75, 16.5, 14.75, 19.5, 19.5, 18.75, 18.75, 17.25, 17.5, 16.5, 15.5, 20.0, 19.75, 18.5, 17.75, 18.0, 17.0, 17.5, 16.0, 20.5, 19.5, 19.0, 17.75, 17.25, 16.75, 16.25, 16.25, 20.25, 19.5, 19.0, 18.25, 17.25, 16.75, 16.25, 16.5, 19.75, 19.25, 19.0, 19.0, 17.25, 16.75, 16.5, 15.5, 19.75, 19.5, 19.25, 18.25, 17.75, 16.5, 16.25, 15.25, 18.5, 18.5, 17.75, 16.75, 17.25, 16.5, 15.5, 14.0],
    "fire"            : 1,
    "version"         : "0.0.1"
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
        break
        
def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
    client.loop_stop()


if __name__ == '__main__':
    run()
