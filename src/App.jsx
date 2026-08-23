import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SOAonlyPage from "./pages/SOAonlyPage";

import LogPage from "./pages/LogPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServerOfflinePage from "./pages/ServerOfflinePage";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Meta Basic Setup Pages
import TermsOfService from "./pages/TermsofService";
import UserDataDeletion from "./pages/UserdataDeletion";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function AppContent() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/main/");

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
          <Route path="/admin" element={<AdminPage />} />
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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;