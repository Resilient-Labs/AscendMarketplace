import mongoose, { Schema, Document } from 'mongoose';

interface IUserProfile extends Document {
  name: string;
  email: string;
  location: string;
  budget: number;
  interests: string[];
  itemsLookingFor: string[];
}

const UserProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  budget: { type: Number, required: true },
  interests: { type: [String], default: [] },
  itemsLookingFor: { type: [String], default: [] }
});

const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;
