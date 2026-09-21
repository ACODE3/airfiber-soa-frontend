import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import SOAonlyPage from "./pages/SOAonlyPage";

import LogPage from "./pages/LogPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServerOfflinePage from "./pages/ServerOfflinePage";

import SoaSyncPage from "./pages/dashboard/SoaSyncPage";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Meta Basic Setup Pages
import TermsOfService from "./pages/TermsofService";
import UserDataDeletion from "./pages/UserdataDeletion";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/main/") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Routes>

          <Route path="/" element={<SOAonlyPage />} />

          {/* SOA Direct Link */}
          <Route
            path="/main/:cno/:stoken"
            element={<SOAonlyPage />}
          />

          <Route path="/login" element={<LogPage />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<SoaSyncPage />} />
          </Route>

          {/* Old route kept working for existing links / bookmarks */}
          <Route path="/admin" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/server-offline"
            element={<ServerOfflinePage />}
          />

          {/* Meta Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/User-Data-Deletion"
            element={<UserDataDeletion />}
          />
          <Route
            path="/Terms-Of-Service"
            element={<TermsOfService />}
          />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </main>

      {!hideLayout && <Footer />}

    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
