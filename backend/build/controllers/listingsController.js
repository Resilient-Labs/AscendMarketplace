"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListing = exports.createListing = void 0;
const listing_schema_1 = __importDefault(require("../models/listing.schema"));
//Create Listing Logic
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Access uploaded files from Multer + Cloudinary
        const files = req.files;
        // Cloudinary URLs will be in the `path` field
        const imageUrls = files.map((file) => file.path);
        // Combine form fields and image URLs
        const newListing = new listing_schema_1.default(Object.assign(Object.assign({}, req.body), { images: imageUrls }));
        const savedListing = yield newListing.save();
        res.status(201).json(savedListing);
    }
    catch (error) {
        console.error("Error creating listing:", error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createListing = createListing;
//Update Listing Logic
const updateListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedListing = yield listing_schema_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        updatedListing ? res.json(updatedListing) : res.status(404).end();
    }
    catch (_a) {
        res.status(400).json({ error: "Malformatted ID" });
    }
});
exports.updateListing = updateListing;
//Delete Listing Logic
const deleteListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedListing = yield listing_schema_1.default.findByIdAndDelete(req.params.id);
        deletedListing
            ? res.json({ message: "Deleted", deletedListing })
            : res.status(404).json({ message: "Not found" });
    }
    catch (_a) {
        res.status(400).json({ error: "Malformatted ID" });
    }
});
exports.deleteListing = deleteListing;
