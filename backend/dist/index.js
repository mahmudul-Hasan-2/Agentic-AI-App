import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/item.routes.js";
import aiRoutes from "./routes/ai.routes.js";
// এনভায়রনমেন্ট ভ্যারিয়েবল লোড করা
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// গ্লোবাল মিডলওয়্যারস
app.use(cors());
app.use(express.json());
// এপিআই রাউটস কনফিগারেশন
app.use("/api/items", itemRoutes);
app.use("/api/ai", aiRoutes);
// বেস রুট (সার্ভার হেলথ চেক)
app.get("/", (req, res) => {
    res.send("⚡ DevAgent Native Backend is Flying!");
});
// ডাটাবেস কানেক্ট করে সার্ভার স্টার্ট করার মেইন ফাংশন
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server is flying beautifully on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start the server:", error);
        process.exit(1);
    }
};
startServer();
