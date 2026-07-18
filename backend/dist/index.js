import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("⚡ DevAgent Clean Backend is Running Smoothly, Mama!");
});
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
});
