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
	...
	
	-- components
		-- database.js	# api that communicate with sqlite DB
	-- context
		-- UsersContext.js	# call database.js to get users, add users
	-- hooks
		-- useSqlite.js		# setup databse using hook

-- database

-- backend
	server.js			# Website Node.Js server, comunication with MongoDB and SQLite
```



SQLite

Account_Info

| Email (varchar 30) | Password (varchar 30) | Account_Balance   |
| ------------------ | --------------------- | ----------------- |
| Adam@usc.edu       | "Aa123456"            | default 0         |
| ...                |                       |                   |
| The constraint     | need to be            | futher considered |

```sqlite
CREATE TABLE Account_Info (Email varchar(30) primary key, Password varchar(30) NOT NULL, Account_Balance real DEFAULT 0);

insert into Account_Info(Email, Password) values("Adam@usc.edu", "Aa123456");
```



MongoDB:

model_request

| Request_id                 | Email        | Request_Time          | Request_Type | Request_Status |
| -------------------------- | ------------ | --------------------- | ------------ | -------------- |
| "63d9c7447fb0edda4d6b0172" | Adam@usc.edu | "31/01/2023 21:58:58" | Model1       | Pending/Done   |
|                            |              |                       |              |                |

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



![image-20230201122936042](C:\Users\jh628\AppData\Roaming\Typora\typora-user-images\image-20230201122936042.png)





![image-20230201122927806](C:\Users\jh628\AppData\Roaming\Typora\typora-user-images\image-20230201122927806.png)