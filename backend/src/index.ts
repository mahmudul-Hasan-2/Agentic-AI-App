import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { MongoClient, ObjectId, Db } from "mongodb";
import { generateContent, handleChat } from "./controllers/ai.controller.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI as string);
let dbInstance: Db;

const startServer = async () => {
  await client.connect();
  dbInstance = client.db(process.env.DB_NAME || "devagent_db");
  console.log("Database Connected!");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};
startServer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// AI Routes
app.post("/api/ai/generate", generateContent);
app.post("/api/ai/chat", handleChat);

app.post("/api/ai", aiRoutes);

// CRUD Routes
app.get("/api/projects", async (req, res) => {
  const projects = await dbInstance.collection("projects").find({}).toArray();
  res.json(projects);
});

app.get("/api/project/:id", async (req, res) => {
  const { id } = req.params;

  const project = await dbInstance
    .collection("projects")
    .findOne({ _id: new ObjectId(id) });
  if (!project) {
    res.status(404).json({ error: "Project not found." });
    return;
  }
  res.json(project);
});

app.post("/api/project", async (req, res) => {
  const result = await dbInstance
    .collection("projects")
    .insertOne({ ...req.body, createdAt: new Date() });
  res.status(201).json(result);
});

// app.delete("/api/project", async (req, res) => {
//   await dbInstance
//     .collection("projects")
//     .deleteOne({ _id: new ObjectId(req.params.id) });
//   res.status(200).json({ message: "Deleted" });
// });
