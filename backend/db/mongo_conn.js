const { MongoClient } = require("mongodb");
// const Db = process.env.URI;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;

module.exports = {
  connectToServer: async function (callback) {
    try{
        await client.connect();
        _db = await client.db("ml_model")
        console.log("Successfully connected to MongoDB."); 
        
    }catch (e){
        console.error(e);
    }
  },
 
  getDb: function () {
    return _db;
  },
};