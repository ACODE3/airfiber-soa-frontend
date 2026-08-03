import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LogPage from "./pages/LogPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServerOfflinePage from "./pages/ServerOfflinePage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/:cno/:stoken" element={<MainPage />} /> 
          <Route path="/" element={<MainPage />} />

          <Route path="/login" element={<LogPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/server-offline" element={<ServerOfflinePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
