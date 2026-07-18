import { MongoClient, Db } from "mongodb";

let dbInstance: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (dbInstance) return dbInstance;

  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    const client = new MongoClient(uri);
    await client.connect();

    // তোমার ডাটাবেসের নাম (যেমন: agentic-ai-app)
    dbInstance = client.db();

    console.log("🍃 MongoDB Native Driver Connected Successfully!");
    return dbInstance;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

// অ্যাপের যেকোনো জায়গা থেকে কালেকশন কল করার জন্য এই ফাংশনটি ব্যবহার করব
export const getDB = (): Db => {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return dbInstance;
};
