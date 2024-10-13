import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const toolRouter = express.Router();
toolRouter.use(express.json());

toolRouter.get("/", async (req, res) => {
    const tools = await collections.tools?.find().toArray();
    res.json(tools);
});

toolRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const tool = await collections.tools?.findOne(query);

        if (tool) {
            res.status(200).send(tool);
        } else {
            res.status(404).send("Tool not found");
        }
    } catch (error) {
        res.status(500).send(
            "An error occurred while trying to retrieve the tool with the ID: ${id}"
        );
    }
});

toolRouter.post("/", async (req, res) => {
    try {
        const tool = req.body;
        const result = await collections.tools?.insertOne(tool);

        if (result?.acknowledged) {
            res.status(201).send("Created a new tool: ID=${result.insertedId}");
        } else {
            res.status(500).send(
                "An error occurred while trying to create a new tool"
            );
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "An error occurred while trying to create a new tool"
        );
    }
});

toolRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const tool = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.tools?.updateOne(query, {
            $set: tool,
        });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an Tool: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an Tool: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an Tool ID ${id}`);
        }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

toolRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.tools?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an Tool: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an Tool: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an Tool: ID ${id}`);
        }
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});
