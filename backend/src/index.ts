import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("⚡ DevAgent Clean Backend is Running Smoothly, Mama!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});
