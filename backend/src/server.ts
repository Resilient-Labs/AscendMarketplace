// import express, { Request, Response } from "express";
// import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Express + TypeScript Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
