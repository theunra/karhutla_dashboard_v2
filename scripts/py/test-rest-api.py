import requests

api_addr = 'http://localhost/api'
front_addr = 'http://localhost/'

payload = {'id' : 'mq135'}
# r = requests.get(api_addr, params=payload)
# print(r.url)
# print(r.json())
r = requests.post(front_addr)
