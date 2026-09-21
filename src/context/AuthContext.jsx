/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiGet, clearToken, getToken } from "../lib/api";

// status: "loading" while we verify the token, then "authenticated" | "anonymous"
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(() =>
    getToken() ? "loading" : "anonymous"
  );

  const loadUser = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setStatus("anonymous");
      return;
    }

    try {
      const data = await apiGet("/api/auth/me");
      setUser(data.user);
      setStatus("authenticated");
    } catch {
      // token missing / expired / account disabled
      clearToken();
      setUser(null);
      setStatus("anonymous");
    }
  }, []);

  // Verify an existing token once on load. No token -> already "anonymous".
  // loadUser only touches state after an awaited network call, so the
  // "set state in an effect" lint rule does not apply here.
  useEffect(() => {
    if (getToken()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUser();
    }
  }, [loadUser]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus("anonymous");
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, reloadUser: loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
