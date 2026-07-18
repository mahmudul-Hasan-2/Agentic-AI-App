import { Router, Response } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { CustomRequest } from "../types/index.js";

const router = Router();

// /api/items/add -> শুধুমাত্র লগইন করা ইউজারই অ্যাক্সেস পাবে
router.post("/add", protect, (req: CustomRequest, res: Response) => {
  // req.user এখন টাইপ সেফ এবং এভেলেবল!
  res.status(200).json({
    message: "Welcome to the protected route!",
    currentUser: req.user, // এখানে ইউজারের আইডি, ইমেইল আর রোল দেখাবে
  });
});

export default router;
