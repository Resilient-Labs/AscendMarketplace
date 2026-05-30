import { useState } from "react";
import axios from "axios";

interface UserProfile {
  _id?: string; 
  name: string;
  email: string;
  location: string;
  budget: number;
  interests: string[];
  itemsLookingFor: string[];
  favorites: string[];
}

const emptyProfile: UserProfile = {
  name: "",
  email: "",
  location: "",
  budget: 0,
  interests: [],
  itemsLookingFor: []
};

const ProfileSetupForm = () => {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/profiles', profile);
      console.log('Profile saved:', response.data);
      setProfile(emptyProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Name</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Location</label>
        <input
          name="location"
          value={profile.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Budget</label>
        <input
          name="budget"
          type="number"
          value={profile.budget}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Interests (comma separated)</label>
        <input
          name="interests"
          value={profile.interests.join(', ')}
          onChange={(e) => handleArrayChange(e, 'interests')}
        />
      </div>

      <div>
        <label>Items Looking For (comma separated)</label>
        <input
          name="itemsLookingFor"
          value={profile.itemsLookingFor.join(', ')}
          onChange={(e) => handleArrayChange(e, 'itemsLookingFor')}
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileSetupForm;
