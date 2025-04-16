import { Routes, Route, Link } from "react-router-dom";
import { FC } from "react";
// import Profile from "../pages/Profile";
// import Sell from "../pages/Sell";
// import Buy from "../pages/Buy";

const Home: FC = () => {
  return (
    <div>
      <header>
        <h1>Ascend Marketplace</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/sell">Sell</Link>
            </li>
            <li>
              <Link to="/buy">Buy</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div>Welcome to Ascend Marketplace</div>} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/sell" element={<Sell />} /> */}
          {/* <Route path="/buy" element={<Buy />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default Home;
