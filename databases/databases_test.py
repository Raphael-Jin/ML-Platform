# ------------- SQLite --------------
import uuid
new_customer_id = uuid.uuid4()
print(new_customer_id)

# ------------ MongoDB --------------
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
# print(client.list_database_names())
db = client.ml_model
collections = db.model_request

from datetime import datetime
# datetime object containing current date and time
now = datetime.now()
dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
request_id = collections.insert_one({'User_Name': 'Adam', 'Request_Time':dt_string, 'Request_Type': 'Model1'})
print(request_id.inserted_id)