import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import listingsRouter from "./routes/listings";
import profileRoutes from "./routes/profile";
import { connectToDB } from "./config/db";  

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (with Mongoose)
connectToDB();

// Routes
app.use("/api/listings", listingsRouter);
app.use("/api/profiles", profileRoutes);

app.get("/", (_req, res) => {
  res.send("Express + TypeScript Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
