import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDB } from "../index.js"; // 👈 ফিক্সড: সরাসরি index.ts থেকে ডাটাবেস ইন্সট্যান্স
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const aiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(aiKey || "");
const cleanJsonResponse = (rawText) => {
    let cleanText = rawText.trim();
    if (cleanText.startsWith("```json"))
        cleanText = cleanText.substring(7);
    else if (cleanText.startsWith("```"))
        cleanText = cleanText.substring(3);
    if (cleanText.endsWith("```"))
        cleanText = cleanText.substring(0, cleanText.length - 3);
    return cleanText.trim();
};
export const generateProjectContent = async (req, res) => {
    try {
        const { title, category, length = "medium" } = req.body;
        if (!title || !category) {
            res.status(400).json({ error: "Title and Category are required." });
            return;
        }
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert AI Project Manager. Project: ${title}, Category: ${category}. Generate JSON with: shortDescription, fullDescription, estimatedBudgetRange {min, max}, requiredSkills (array of 5). No markdown wrappers.`;
        const result = await model.generateContent(prompt);
        const generatedData = JSON.parse(cleanJsonResponse(result.response.text()));
        res.status(200).json(generatedData);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate AI content." });
    }
};
export const recommendDevelopers = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        if (!ObjectId.isValid(projectId)) {
            res.status(400).json({ error: "Invalid ID." });
            return;
        }
        // ⚡ এখানে আমরা getDB() ব্যবহার করছি
        const database = getDB();
        const project = await database
            .collection("projects")
            .findOne({ _id: new ObjectId(projectId) });
        const developers = await database
            .collection("developers")
            .find({})
            .toArray();
        if (!project) {
            res.status(404).json({ error: "Project not found." });
            return;
        }
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze project: ${JSON.stringify(project)} against developers: ${JSON.stringify(developers)}. Select top 3. Return JSON array with developerId, matchPercentage, reasoning. No markdown.`;
        const result = await model.generateContent(prompt);
        const recommendations = JSON.parse(cleanJsonResponse(result.response.text()));
        res.status(200).json({ projectId, recommendations });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Internal Server Error during AI reasoning." });
    }
};
