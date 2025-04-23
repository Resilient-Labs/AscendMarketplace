//Environment & Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import listingsRouter from "./routes/listings";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/listings", listingsRouter);
app.get("/", (_req, res) => {
  res.send("Express + TypeScript Server is running");
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
