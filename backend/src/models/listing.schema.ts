import mongoose, { Schema, Document } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[]; // URLs from Cloudinary
  location: string;
  condition: string;
  sellerId?: string;
  datePosted: Date;
}

const listingSchema: Schema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    condition: {
      type: String,
      enum: ["new", "likeNew", "good", "fair"],
      required: true,
    },
    sellerId: { type: String },
    datePosted: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model<IListing>("Listing", listingSchema);
export default Listing;
