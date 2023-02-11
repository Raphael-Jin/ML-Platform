// External Dependencies
import express, { Request, Response } from "express";
// import { ObjectId } from "mongodb";
import { collections } from "../database/mongoConn";
// import RequestRecord from "../models/requestRecord";

// Route
export const recordRouter = express.Router();
recordRouter.use(express.json());

// GET
import cors from "cors"

recordRouter.get("/",cors(), async (_req: Request, res: Response) => {
    try {
       const requestRecordFromDB = (await collections.resquestRecord?.find({}).toArray());
        res.json(requestRecordFromDB);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST

// PUT

// DELETE