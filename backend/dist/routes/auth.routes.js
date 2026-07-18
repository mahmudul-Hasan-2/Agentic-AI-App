import { Router } from "express";
import { registerUser, loginUser } from "../controllers/";
const router = Router();
// 📝 ইউজার রেজিস্ট্রেশন রাউট -> POST /api/auth/register
router.post("/register", registerUser);
// 🔑 ইউজার লগইন রাউট -> POST /api/auth/login
router.post("/login", loginUser);
export default router;
