import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/buy", label: "Buy" },
    { path: "/sell", label: "Sell" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div>
      <header>
        <h1>Ascend Marketplace: Buy and Sell Items Locally</h1>
        <nav>
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`hover:underline ${
                location.pathname === path ? "font-bold underline" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
