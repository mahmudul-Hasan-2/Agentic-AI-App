import { Router } from "express";
import { generateContent } from "../controllers/ai.controller.js";

const router = Router();
router.post("/generate", generateContent);

export default router;