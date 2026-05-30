import { useEffect, useState } from 'react';
import axios from 'axios';

interface Listing {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  location?: string;
  budget: number;
  interests: string[];
  itemsLookingFor: string[];
  favorites: Listing[];
}

const ProfilePage = ({ userId }: { userId: string }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    axios.get<UserProfile>(`http://localhost:3000/api/profiles/${userId}`)
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-gray-600">{profile.email}</p>
        {profile.location && (
          <p className="text-gray-600">Location: {profile.location}</p>
        )}
        <p className="text-gray-600">Budget: ${profile.budget}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Interests</h2>
        {profile.interests.length > 0 ? (
          <ul className="list-disc list-inside">
            {profile.interests.map((interest, idx) => (
              <li key={idx}>{interest}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No interests listed.</p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Items Looking For</h2>
        {profile.itemsLookingFor.length > 0 ? (
          <ul className="list-disc list-inside">
            {profile.itemsLookingFor.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No specific items listed.</p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Favorited Items</h2>
        {profile.favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.favorites.map((item) => (
              <div key={item._id} className="border rounded-lg shadow-md overflow-hidden">
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favorites yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
