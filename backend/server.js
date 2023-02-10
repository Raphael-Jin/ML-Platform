const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dao =  require("./db/sqlite_dao.js");
const { authenticated, authMiddleware } = require("./controllers/auth.controller.js");


const session = require('express-session');
const cookieParser = require('cookie-parser');
const sqlite3 = require("sqlite3");
// const sqliteStoreFactory = require("express-session-sqlite");

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.use(bodyParser.json());
app.use(authMiddleware);
app.use(cookieParser());

// app.use(session({ secret: "super secret string" }));
// const SqliteStore = sqliteStoreFactory(session)

// app.use(session({
//   store: new SqliteStore({
//       driver: sqlite3.Database,
//       path: ':memory:',
//       ttl: 604800000, // 1 week in miliseconds
//   }),
// }));

dao.setupDbForDev();    // init db

dashboardRoutes = require("./routes/dashboard.record.js")
userRoutes = require("./routes/auth.routes.js")
app.use("/record", dashboardRoutes);
app.use('/auth', userRoutes);

// get driver connection
const dbo = require("./db/mongo_conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});