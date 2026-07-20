import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const generateAIContent = async (prompt: string) => {
  try {
    const fullPrompt = `Act as an expert developer. Create a professional project description for: ${prompt}. Provide a short description and a detailed full description.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "API Request Failed");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI Content Generation Failed");
  }
};

export const chatWithAI = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string,
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    const chat = model.startChat({ history: history });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw new Error("AI Chat Failed");
  }
};
