var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { generateContent, handleChat } from "./controllers/ai.controller.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const client = new MongoClient(process.env.MONGO_URI);
let dbInstance;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    dbInstance = client.db(process.env.DB_NAME || "devagent_db");
    console.log("Database Connected!");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
startServer();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// AI Routes
app.post("/api/ai/generate", generateContent);
app.post("/api/ai/chat", handleChat);
app.post("/api/ai", aiRoutes);
// CRUD Routes
app.get("/api/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield dbInstance.collection("projects").find({}).toArray();
    res.json(projects);
}));
app.get("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield dbInstance
        .collection("projects")
        .findOne({ _id: new ObjectId(id) });
    if (!project) {
        res.status(404).json({ error: "Project not found." });
        return;
    }
    res.json(project);
}));
app.post("/api/project", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dbInstance
        .collection("projects")
        .insertOne(Object.assign(Object.assign({}, req.body), { createdAt: new Date() }));
    res.status(201).json(result);
}));
// app.delete("/api/project", async (req, res) => {
//   await dbInstance
//     .collection("projects")
//     .deleteOne({ _id: new ObjectId(req.params.id) });
//   res.status(200).json({ message: "Deleted" });
// });
