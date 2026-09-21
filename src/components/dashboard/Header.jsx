import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Icon from "./Icon";
import { titleForPath } from "./navItems";

// Light top header: hamburger (mobile only), current page title, and a small
// user chip on the right.
export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const initial = (user?.name || "?").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Icon name="menu" />
      </button>

      <h1 className="text-base font-semibold text-slate-800 sm:text-lg">
        {titleForPath(pathname)}
      </h1>

      <div className="ml-auto flex items-center gap-2 rounded-full py-1 pl-1 pr-2 sm:gap-3 sm:pl-2">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {initial}
        </div>
        <div className="hidden leading-tight sm:block">
          <p className="text-sm font-medium text-slate-800">{user?.name}</p>
          <p className="text-xs capitalize text-slate-500">{user?.role}</p>
        </div>
        <Icon
          name="chevron-down"
          className="hidden h-4 w-4 text-slate-400 sm:block"
        />
      </div>
    </header>
  );
}
