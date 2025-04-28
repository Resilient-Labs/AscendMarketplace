import { Outlet, NavLink, Link, } from "react-router-dom";

export default function Layout() {
  // const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/buy", label: "Buy" },
    { path: "/sell", label: "Sell" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div>
      <header>
        <Link to="/">
          <h1>Ascend Marketplace</h1>
        </Link>
        <nav>
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
