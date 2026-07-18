import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// এপিআই কী ভ্যালিডেশন ও ইনিশিয়ালাইজেশন
const aiKey = process.env.GEMINI_API_KEY;
if (!aiKey) {
  console.error(
    "❌ Critical: GEMINI_API_KEY is missing in environmental variables!",
  );
}

// SDK-এর লেটেস্ট নিয়ম অনুযায়ী সরাসরি স্ট্রিং পাস করে ইনিশিয়ালাইজেশন
const ai = new GoogleGenerativeAI(aiKey || "");

/**
 * FEATURE A: AI Content Generator (Requirement 11.A)
 * ক্লায়েন্টের টাইটেল এবং ক্যাটাগরি থেকে প্রফেশনাল প্রজেক্ট ডেসক্রিপশন ও বাজেট জেনারেট করবে।
 */
export const generateProjectContent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, category, length = "medium" } = req.body;

    if (!title || !category) {
      res.status(400).json({ error: "Title and Category are required." });
      return;
    }

    // লেটেস্ট ফ্ল্যাশ মডেল কল করা
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Custom Prompt Template
    const prompt = `You are an expert AI Project Manager. Based on the project title: "${title}" and category: "${category}", generate a comprehensive, production-ready project requirements brief. 
    The output length should be ${length}. 
    Provide the response strictly in JSON format with the following keys:
    - shortDescription: A catchy 2-line summary.
    - fullDescription: A detailed overview of the system architecture and features.
    - estimatedBudgetRange: A suggested budget object with { min: number, max: number } based on the current market in 2026.
    - requiredSkills: An array of strings representing top 5 required skills.
    Do not include any markdown wrappers like \`\`\`json in your response, just the raw JSON string.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // জেনারেটেড টেক্সট ক্লিন করে JSON পার্স করা
    const generatedData = JSON.parse(responseText.trim());
    res.status(200).json(generatedData);
  } catch (error) {
    console.error("❌ AI Content Generation Error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate AI content. Please try again." });
  }
};

/**
 * FEATURE B: AI Smart Recommendation Engine (Requirement 11.B)
 * প্রজেক্টের রিকোয়ারমেন্ট অনুযায়ী ডেভলপারদের ডেটাবেজ স্ক্যান করে বেস্ট ম্যাচ খুঁজে দেবে।
 */
export const recommendDevelopers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 🛠️ টাইপস্ক্রিপ্ট এরর ফিক্স: এক্সপ্লিসিটলি string হিসেবে টাইপ কাস্ট করা হলো
    const projectId = req.params.projectId as string;

    if (!ObjectId.isValid(projectId)) {
      res.status(400).json({ error: "Invalid Project ID format." });
      return;
    }

    const database = await connectDB();

    // প্রজেক্ট ডেটা খুঁজে বের করা
    const project = await database
      .collection("projects")
      .findOne({ _id: new ObjectId(projectId) });
    if (!project) {
      res.status(404).json({ error: "Project not found." });
      return;
    }

    // ডেটাবেজ থেকে ডেভলপারদের প্রোফাইল রিড করা
    const developers = await database
      .collection("developers")
      .find({})
      .toArray();
    if (developers.length === 0) {
      res
        .status(404)
        .json({ error: "No developers found in the database to recommend." });
      return;
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this project requirement: ${JSON.stringify(project)} 
    And match it against these available developer profiles: ${JSON.stringify(developers)}.
    Select the top 3 best-matched developers. 
    Provide the response strictly in JSON format as an array of objects, where each object contains:
    - developerId: The original ID string.
    - matchPercentage: A number between 0 and 100.
    - reasoning: A solid 2-line explanation of why they match (context-aware reasoning).
    Do not include any markdown wrappers like \`\`\`json in your response.`;

    const result = await model.generateContent(prompt);
    const recommendations = JSON.parse(result.response.text().trim());

    res.status(200).json({ projectId, recommendations });
  } catch (error) {
    console.error("❌ AI Recommendation Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during AI reasoning." });
  }
};
