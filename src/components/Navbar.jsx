import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-5xl gap-4 p-4">
        <NavLink
          to="/main"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600"
              : "font-semibold text-slate-600 hover:text-blue-600"
          }
        >
          Main
        </NavLink>

        <NavLink
          to="/tester"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-blue-600"
              : "font-semibold text-slate-600 hover:text-blue-600"
          }
        >
          Tester
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;