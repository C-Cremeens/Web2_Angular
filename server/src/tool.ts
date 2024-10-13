import * as mongodb from "mongodb";

export interface Tool {
    _id?: mongodb.ObjectId;
    name: string;
    description: string;
    count: number;
}
