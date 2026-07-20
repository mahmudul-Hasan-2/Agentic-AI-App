import { Router } from "express";
import { generateProjectContent, recommendDevelopers, } from "../controllers/ai.controller.js";
const router = Router();
// Content Generator Route
router.post("/generate-content", generateProjectContent);
// Smart Recommendation Engine Route
router.get("/recommend/:projectId", recommendDevelopers);
export default router;
