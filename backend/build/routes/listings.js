"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const listingsController_1 = require("../controllers/listingsController");
const cloudinary_1 = require("../utils/cloudinary");
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
const router = express_1.default.Router();
router.post("/", upload.array("images", 5), listingsController_1.createListing);
router.put("/:id", listingsController_1.updateListing);
router.delete("/:id", listingsController_1.deleteListing);
exports.default = router;
