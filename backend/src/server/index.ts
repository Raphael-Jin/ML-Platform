import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
/*

Copyright (c) 2019 - present AppSeed.us

*/
import express from 'express';
import passport from 'passport';

import initPassport from '../config/passport';
import routes from '../routes/users';
import { connect } from '../database/sqliteConn';

// Instantiate express
const server = express();
server.use(compression());

// Passport Config
initPassport(passport);
server.use(passport.initialize());

// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
  connect();
}
console.log("SQlite connected")

// connect to MongoDB
import {connectToMongoDB} from "../database/mongoConn"
connectToMongoDB()
console.log("MongoDB connected")

import {recordRouter} from "../routes/dashboardRecord";
server.use("/requestRecord", recordRouter);

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use('/api/users', routes);

export default server;
