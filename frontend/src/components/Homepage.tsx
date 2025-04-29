import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

type User = {
  id: number;
  name: string;
  email: string;
};

type Item = {
  id: number;
  userId: number;
  title: string;
  description: string;
};

const mockUser: User = {
  id: 1,
  name: "Danny Garcia Cortes",
  email: "dannygarciadev@gmail.com",
};

const mockItems: Item[] = [
  { id: 1, userId: 1, title: "Cozy Apartment", description: "A cozy downtown place." },
  { id: 2, userId: 2, title: "Country House", description: "A quiet countryside home." },
  { id: 3, userId: 1, title: "Modern Studio", description: "Perfect for students." },
];

const getRandomImage = () => {
  return "https://picsum.photos/300/200"; 
};

const Homepage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setUser(mockUser);
        setAllItems(mockItems);
        setMyItems(mockItems.filter(item => item.userId === mockUser.id));
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center">No user signed in.</div>;
  }

  return (
    <div className="page-container">
      <section className="section">
        <h2 className="section-title">User Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>

      <section className="section">
        <h2 className="section-title">My Items for Sale</h2>
        {myItems.length === 0 ? (
          <p>You have no items listed.</p>
        ) : (
          <div className="items-grid">
            {myItems.map((item) => (
              <Link key={item.id} to={`/items/${item.id}`} className="item-link">
                <div className="item-card">
                  <img src={getRandomImage()} alt="Item" className="item-image" />
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-title">All Available Items</h2>
        {allItems.length === 0 ? (
          <p>No items available.</p>
        ) : (
          <div className="items-grid">
            {allItems.map((item) => (
              <Link key={item.id} to={`/items/${item.id}`} className="item-link">
                <div className="item-card">
                  <img src={getRandomImage()} alt="Item" className="item-image" />
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
