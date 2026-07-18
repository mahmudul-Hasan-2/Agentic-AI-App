import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "devagent_db";
let db;
export const connectDB = async () => {
    if (db)
        return db;
    try {
        const client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        console.log(`🌐 MongoDB Connected to: ${dbName}`);
        return db;
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};
export { db };
