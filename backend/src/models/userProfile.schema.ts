import mongoose, { Schema, Document } from 'mongoose';

interface IUserProfile extends Document {
  name: string;
  email: string;
  location: string;
  budget: number;
  interests: string[];
  itemsLookingFor: string[];
  favorites: mongoose.Types.ObjectId[]; 
}

const UserProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  budget: { type: Number, required: true },
  interests: { type: [String], default: [] },
  itemsLookingFor: { type: [String], default: [] },
  favorites: [
    { type: Schema.Types.ObjectId, ref: 'Listing' }
  ],
});

const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;
