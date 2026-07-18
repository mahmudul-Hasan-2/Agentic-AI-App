import { connectDB } from "../config/db.js";
export const getProjects = async (req, res) => {
    try {
        const { search, category, minBudget, maxBudget, sortBy } = req.query;
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        if (category) {
            query.category = category;
        }
        if (minBudget || maxBudget) {
            query.budget = {};
            if (minBudget)
                query.budget.$gte = Number(minBudget);
            if (maxBudget)
                query.budget.$lte = Number(maxBudget);
        }
        let sortOptions = { createdAt: -1 };
        if (sortBy === "budget_low")
            sortOptions = { budget: 1 };
        if (sortBy === "budget_high")
            sortOptions = { budget: -1 };
        const database = await connectDB();
        const projects = await database
            .collection("projects")
            .find(query)
            .sort(sortOptions)
            .toArray();
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("❌ Fetch error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
