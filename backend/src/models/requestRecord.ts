import { ObjectId } from "mongodb";

export default class RequestRecord {
    constructor(public API_Key: string, public Request_Time: String, public Request_Type: string, public Request_Status: string, public id?: ObjectId) {}
}