from flask import Flask
from flask import request,jsonify
from pymongo import MongoClient
import pickle
    
#loading the model 
with open("project_one_model.pkl","rb") as f_in:
    dv,model = pickle.load(f_in)

app = Flask(__name__)

# Mongodb
client = MongoClient('localhost', 27017)
db = client.ml_model

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
# print(client.list_database_names())


@app.route('/request',methods=['POST'])
def my_request():
    candidate = request.get_json()
    api_key = candidate[0]["api_key"]
    print(candidate)
    # get info from mysql and check

    # insert the following request
    from datetime import datetime
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    collections = db.model_request
    user_request = collections.insert_one({"API_Key":api_key, 'Request_Time':dt_string, 'Request_Type': 'Model1', 'Request_Status':'Pending'})
    request_id = user_request.inserted_id
    # doing prediction
    X = dv.transform(candidate)
    preds = model.predict_proba(X)[:,1]
    placement = preds > 0.5
    result ={
        "Placement_Probability" : float(preds),
        "Placement" :bool(placement)
    }

    import time
    # time.sleep(10)
    
    new_values = {"$set":{'Request_Status':'Complete'}}
    filter = {'_id': request_id}

    print(request_id)

    collections.update_one(filter, new_values)

    collections = db.model_result
    collections.insert_one({"Resquest_ID":str(request_id), "Result":result})

    return jsonify({"request_id":str(request_id)})


@app.route('/get-result',methods=['POST'])
def predict():
    candidate = request.get_json()
    id = candidate[0]["RequestId"]
    collections = db.model_result
    res = collections.find({"Resquest_ID":id})
    ans = list(res)[0]
    del ans["_id"]
    return jsonify(ans)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=9696)