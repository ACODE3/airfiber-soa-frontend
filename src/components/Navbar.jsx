import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">

        {/* Left: logo + brand */}
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="AirFiber Logo"
            className="h-12 w-auto object-contain"
          />

          <span className="text-2xl font-bold leading-none text-blue-500">
            AIRFIBER
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/main"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-blue-600"
                : "font-semibold text-slate-600 hover:text-blue-600"
            }
          >
            SOA
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;