import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register" },
  { to: "/login", label: "Login" },
  { to: "/users", label: "User" },
];

const LayoutDefault = () => {
  return (
    <>
      <header>
        <div className="layout__default--menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutDefault;
