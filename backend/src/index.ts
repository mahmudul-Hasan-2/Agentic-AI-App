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

// GET: /api/projects/user?userId=xyz
app.get("/api/projects/user", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // ডাটাবেজ থেকে নির্দিষ্ট ইউজারের প্রজেক্টগুলো ফিল্টার করা
    const projects = await dbInstance
      .collection("projects")
      .find({ userId: userId }) // প্রোজেক্টে userId সেভ থাকতে হবে
      .toArray();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch User Projects Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: /api/project/:id (প্রজেক্ট এডিট বা আপডেট করার জন্য)
app.put("/api/project/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await dbInstance
      .collection("projects")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Project updated successfully!" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: /api/project/:id (প্রজেক্ট ডিলিট করার জন্য)
app.delete("/api/project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await dbInstance
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
