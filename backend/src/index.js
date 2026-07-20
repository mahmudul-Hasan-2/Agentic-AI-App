import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import aiRoutes from "./routes/ai.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = process.env.MONGO_URI;
let dbInstance = null;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// ডাটাবেস ইন্সট্যান্স পাওয়ার ফাংশন
export const getDB = () => {
    if (!dbInstance)
        throw new Error("Database not initialized yet.");
    return dbInstance;
};
// --- ১. রাউটস ডিফাইন করো সার্ভার স্টার্ট হওয়ার আগে ---
app.use("/api/ai", aiRoutes);
app.get("/api/projects", async (req, res) => {
    try {
        const db = getDB();
        const { search, category, minBudget, maxBudget, sortBy } = req.query;
        const query = {};
        if (search && String(search).trim() !== "") {
            query.$or = [
                { title: { $regex: String(search), $options: "i" } },
                { fullDescription: { $regex: String(search), $options: "i" } },
                { shortDescription: { $regex: String(search), $options: "i" } },
            ];
        }
        if (category && String(category).trim() !== "") {
            query.category = String(category);
        }
        if (minBudget && String(minBudget).trim() !== "") {
            query["estimatedBudgetRange.min"] = { $gte: Number(minBudget) };
        }
        if (maxBudget && String(maxBudget).trim() !== "") {
            query["estimatedBudgetRange.max"] = {
                ...query["estimatedBudgetRange.max"],
                $lte: Number(maxBudget),
            };
        }
        let sortOptions = { createdAt: -1 };
        if (sortBy === "budget_low")
            sortOptions = { "estimatedBudgetRange.min": 1 };
        if (sortBy === "budget_high")
            sortOptions = { "estimatedBudgetRange.max": -1 };
        const projects = await db
            .collection("projects")
            .find(query)
            .sort(sortOptions)
            .toArray();
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("❌ API Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// --- ২. সার্ভার স্টার্ট ফাংশন ---
const startServer = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("🍃 Connected to MongoDB!");
        dbInstance = client.db(process.env.DB_NAME || "devagent_db");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    }
    catch (error) {
        console.error("❌ Failed to start:", error);
        process.exit(1);
    }
};
startServer();
