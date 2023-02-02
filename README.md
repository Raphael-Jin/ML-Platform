# ML-Platform
```
-- kubenetes
	-- data				# data to train the model
	-- kube config 		# cluster config (e.g. the images location)
		-- deployment.yaml
		-- sercvice.yaml
	train.py 			# scripts to train the model
	predict.py  		# a flask server to do the predict, comunication with MongoDB and SQLite
	Dockerfile  		# containernized the predict.py and the corresponding env

-- frontend
	...
	-- menu-items		# home page index and the correspond child info (url)
	-- routes			# url -> resource on the host
	-- views			# resource on the host
		-- ai-model
			--	record.js	# Front-end(React.js), back-end(Node.js) communication, to access the 
	...
	
	-- components
		-- database.js	# api that communicate with sqlite DB
	-- context
		-- UsersContext.js	# call database.js to get users, add users
	-- hooks
		-- useSqlite.js		# setup databse using hook
	

-- database
	-- sqlite.sql

-- backend
	-- db
		-- conn.js 		# connection to the database
	-- routes
		-- record.js		# handle different record
	-- server.js			# Website Node.Js server, comunication with MongoDB and SQLite
```



SQLite

Account_Info

| Email (varchar 30) | Password (varchar 30) | API_Key(uuid)                        | Account_Balance |
| ------------------ | --------------------- | ------------------------------------ | --------------- |
| Adam@usc.edu       | "Aa123456"            | b6f97a69-428b-4e74-862d-4ad22d7e0de8 | default 0       |
| ...                |                       |                                      |                 |
| The constraint     | need to be            | further considered                   |                 |

```sqlite
CREATE TABLE Account_Info (Email varchar(30) primary key, Password varchar(30) NOT NULL, Account_Balance real DEFAULT 0);

insert into Account_Info(Email, Password) values("Adam@usc.edu", "Aa123456");
```



MongoDB:

model_request

| Request_id                 | API_Key                              | Request_Time          | Request_Type | Request_Status |
| -------------------------- | ------------------------------------ | --------------------- | ------------ | -------------- |
| "63d9c7447fb0edda4d6b0172" | b6f97a69-428b-4e74-862d-4ad22d7e0de8 | "31/01/2023 21:58:58" | Model1       | Pending/Done   |
|                            |                                      |                       |              |                |

model_result

| Request_id                 | Result                                                       |
| -------------------------- | ------------------------------------------------------------ |
| "63d9c7447fb0edda4d6b0172" | Candidate features have been evaluated and output is {'Placement': True, 'Placement_Probability': 0.90234375} |
|                            |                                                              |

```bash
> use ml_model
switched to db ml_model
> db.model_request.insert({"UserName":"Adam", "Request_Type": "Model1"})
WriteResult({ "nInserted" : 1 }
> db.model_request.find()
{ "_id" : ObjectId("63d9c7447fb0edda4d6b0172"), "UserName" : "Adam", "Request_Type" : "Model1" }
```

Python usage of MongoDB

```python
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
# print(client.list_database_names())
db = client.ml_model
collections = db.model_request
for x in collections.find():
  print(x)
```
