import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// মিডলওয়্যার
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

// মঙ্গোডিবি কনফিগারেশন
const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "devagent_db";
let db: Db;

// ১. প্রজেক্ট/ডেভলপার লিস্টিং এবং ফিল্টারিং এপিআই (Requirement 4 & 6)
app.get("/api/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, minBudget, maxBudget, sortBy } = req.query;
    const query: any = {};

    // সার্চ ফিল্টার (টাইটেল বা ডেসক্রিপশনে খুঁজবে)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // ক্যাটাগরি ফিল্টার
    if (category) {
      query.category = category;
    }

    // বাজেট রেঞ্জ ফিল্টার
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }

    // সর্টিং লজিক (যেমন: নতুন প্রজেক্ট আগে বা বাজেট অনুযায়ী)
    let sortOptions: any = { createdAt: -1 }; // ডিফল্ট: নতুন প্রজেক্ট আগে
    if (sortBy === "budget_low") sortOptions = { budget: 1 };
    if (sortBy === "budget_high") sortOptions = { budget: -1 };

    const projectsCollection = db.collection("projects");
    const projects = await projectsCollection
      .find(query)
      .sort(sortOptions)
      .toArray();

    res.status(200).json(projects);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// হেলথ চেক রুট
app.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "healthy", database: db ? "connected" : "disconnected" });
});

// ডাটাবেজ কানেক্ট করে সার্ভার স্টার্ট
const startServer = async () => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log(`🌐 MongoDB Connected to: ${dbName}`);

    app.listen(PORT, () => {
      console.log(
        `⚡ DevAgent Clean Backend running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
