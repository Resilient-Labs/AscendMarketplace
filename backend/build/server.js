"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Environment & Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const listings_1 = __importDefault(require("./routes/listings"));
const profile_1 = __importDefault(require("./routes/profile"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/listings", listings_1.default);
app.use('/api/profiles', profile_1.default);
app.get("/", (_req, res) => {
    res.send("Express + TypeScript Server is running");
});
//Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
