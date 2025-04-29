import { useState } from 'react';
import axios from 'axios';

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
  name: '',
  email: '',
  location: '',
  budget: 0,
  interests: [],
  itemsLookingFor: [],
  favorites: [] 
};

const ProfileSetupForm = () => {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
    const values = e.target.value.split(',').map(v => v.trim());
    setProfile(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/profiles', profile);
      console.log('Profile saved:', response.data);
      setSavedProfile(response.data); 
      setProfile(emptyProfile); 
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-red-500 text-white p-4">
  This should have a red background
</div>
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

      {/* Display the saved profile below the form */}
      {savedProfile && (
        <div className="p-4 border rounded shadow-md bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
          <p><strong>Name:</strong> {savedProfile.name}</p>
          <p><strong>Email:</strong> {savedProfile.email}</p>
          <p><strong>Location:</strong> {savedProfile.location}</p>
          <p><strong>Budget:</strong> ${savedProfile.budget}</p>
          <p><strong>Interests:</strong> {savedProfile.interests.join(', ')}</p>
          <p><strong>Items Looking For:</strong> {savedProfile.itemsLookingFor.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileSetupForm;
