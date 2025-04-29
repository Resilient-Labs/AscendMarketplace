import { useState } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
  location: string;
  budget: number;
  interests: string[];
  itemsLookingFor: string[];
}

const emptyProfile: UserProfile = {
  name: "",
  email: "",
  location: "",
  budget: 0,
  interests: [],
  itemsLookingFor: [],
};

const ProfileSetupForm = () => {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);

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
      await axios.post("http://localhost:3000/api/profiles", profile);
      setProfile(emptyProfile); // Reset the form after submission
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={profile.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input id="location" name="location" value={profile.location} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="budget">Budget</label>
        <input
          id="budget"
          name="budget"
          type="number"
          value={profile.budget}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="interests">Interests (comma separated)</label>
        <input
          id="interests"
          name="interests"
          value={profile.interests.join(", ")}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="itemsLookingFor">Items Looking For (comma separated)</label>
        <input
          id="itemsLookingFor"
          name="itemsLookingFor"
          value={profile.itemsLookingFor.join(", ")}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileSetupForm;
