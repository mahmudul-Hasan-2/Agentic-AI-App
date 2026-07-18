import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";
// ==================== ১. ইউজার রেজিস্ট্রেশন (Register) ====================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // বেসিক ভ্যালিডেশন
        if (!name || !email || !password || !role) {
            res.status(400).json({ message: "All fields are required!" });
            return;
        }
        const db = getDB();
        const userCollection = db.collection("users");
        // ইউজার অলরেডি ডাটাবেসে আছে কিনা চেক
        const userExists = await userCollection.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists with this email!" });
            return;
        }
        // 🔒 পাসওয়ার্ড সিকিউর করার জন্য হ্যাশ করা
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // নতুন ইউজার অবজেক্ট তৈরি
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date(),
        };
        const result = await userCollection.insertOne(newUser);
        res.status(201).json({
            message: "User registered successfully!",
            userId: result.insertedId,
        });
    }
    catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// ==================== ২. ইউজার লগইন (Login) ====================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required!" });
            return;
        }
        const db = getDB();
        const userCollection = db.collection("users");
        // ইমেইল দিয়ে ইউজার খুঁজে বের করা
        const user = await userCollection.findOne({ email });
        if (!user || !user.password) {
            res.status(400).json({ message: "Invalid credentials!" });
            return;
        }
        // পাসওয়ার্ড ম্যাচ করে কিনা চেক করা
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials!" });
            return;
        }
        // 🔑 তোমার টাইপ ফাইলের UserPayload স্ট্রাকচার অনুযায়ী ডাটা রেডি করা
        const payload = {
            id: user._id?.toString(),
            email: user.email,
            role: user.role,
        };
        // JWT টোকেন সাইন করা
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        });
        // ফ্রন্টএন্ডে রেসপন্স পাঠানো
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
