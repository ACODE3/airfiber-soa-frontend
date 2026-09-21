import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Guards a route: shows a loader while the token is being verified, and
// bounces back to the login page if there is no authenticated session.
export default function RequireAuth({ children }) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    );
  }

  if (status !== "authenticated" || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
