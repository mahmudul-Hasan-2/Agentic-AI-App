import { Router } from "express";
import { generateContent, handleChat } from "../controllers/ai.controller.js";

const router = Router();

// POST: /api/ai/generate
router.post("/generate", generateContent);

// POST: /api/ai/chat
router.post("/chat", handleChat);

export default router;
