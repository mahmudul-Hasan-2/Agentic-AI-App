import { Request, Response } from "express";
import { generateAIContent, chatWithAI } from "../services/gemini.service.js";

export const generateContent = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const content = await generateAIContent(title);
    res.status(200).json({ content });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

export const handleChat = async (req: Request, res: Response) => {
  const { history, message } = req.body;
  try {
    const reply = await chatWithAI(history, message);
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};
