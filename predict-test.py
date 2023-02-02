import requests
import os
import uuid

os.environ["API_KEY"] = "b6f97a69-428b-4e74-862d-4ad22d7e0de8"

api_key = os.getenv("API_KEY")


candidate = [{"gender": "M",
  "ssc_p": 71.0,
  "ssc_b": 'Central',
  "hsc_p": 58.66,
  "hsc_b": 'Central',
  "hsc_s": 'Science',
  "degree_p": 58.0,
  "degree_t": 'Sci&Tech',
  "etest_p": 56.0,
  "mba_p": 61.3,
  "specialisation": 'Mkt&Fin',
  "workex": 'Yes',
  "api_key": api_key
  }]


# make a request
url = "http://127.0.0.1:6000/request"
response = requests.post(url=url,json=candidate).json()
print('Get Request id' + response["request_id"])

# get result
request_id = [{"RequestId": response["request_id"]}]
url2 =  "http://127.0.0.1:6000/get-result"
print(f'Get Result By Request id {requests.post(url=url2,json=request_id).json()}')
