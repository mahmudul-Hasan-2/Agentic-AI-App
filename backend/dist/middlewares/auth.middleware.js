import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
    let token;
    // ১. হেডার থেকে টোকেন চেক করা (Authorization: Bearer <token>)
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // হেডার থেকে টোকেন আলাদা করা
            token = req.headers.authorization.split(" ")[1];
            // ২. টোকেন ভেরিফাই করা
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // ৩. তোমার তৈরি করা CustomRequest-এর 'user' প্রপার্টিতে পেলোড সেট করা
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            };
            next(); // সব ঠিক থাকলে পরের কন্ট্রোলারে পাঠিয়ে দেবে
        }
        catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed!" });
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token found!" });
    }
};
