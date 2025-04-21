import { Request, Response } from "express";
const Listing = require("../models/listing.schema");

//Create Listing Logic
const createListing = async (req: Request, res: Response) => {
  try {
    // Access uploaded files from Multer + Cloudinary
    const files = req.files as Express.Multer.File[];
    // Cloudinary URLs will be in the `path` field
    const imageUrls = files.map((file) => file.path);

    // Combine form fields and image URLs
    const newListing = new Listing({
      ...req.body,
      images: imageUrls,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
//Update Listing Logic
const updateListing = async (req: Request, res: Response) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    updatedListing ? res.json(updatedListing) : res.status(404).end();
  } catch {
    res.status(400).json({ error: "Malformatted ID" });
  }
};
//Delete Listing Logic
const deleteListing = async (req: Request, res: Response) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    deletedListing
      ? res.json({ message: "Deleted", deletedListing })
      : res.status(404).json({ message: "Not found" });
  } catch {
    res.status(400).json({ error: "Malformatted ID" });
  }
};

export { createListing, updateListing, deleteListing };
