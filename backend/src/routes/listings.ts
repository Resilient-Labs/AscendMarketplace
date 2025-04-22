import express from "express";
import multer from "multer";
import {
  createListing,
  updateListing,
  deleteListing,
} from "../controllers/listingsController";
import { storage } from "../utils/cloudinary";

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.array("images", 5), createListing);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);

export default router;
