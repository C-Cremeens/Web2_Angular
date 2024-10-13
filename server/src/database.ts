import * as mongodb from "mongodb";
import { Tool } from "./tool";

export const collections: {
    tools?: mongodb.Collection<Tool>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("tool-manager");
    //await applySchemaValidation(db);

    const toolsCollection = db.collection<Tool>("tools");
    collections.tools = toolsCollection;
}
