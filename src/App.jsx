import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SOAonlyPage from "./pages/SOAonlyPage";

import LogPage from "./pages/LogPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ServerOfflinePage from "./pages/ServerOfflinePage";

//components 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Meta Basic Setup Pages 
// import termsOfService from "./pages/TermsofService";
// import userDataDeletion from "./pages/UserdataDeletion";
// import privacyPolicy from "./pages/PrivacyPolicy";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar/>

        <main className="flex-1">
          <Routes>
            {/* Removed Search Function for now  */}
            {/* <Route path="/search" element={<MainPage />} /> */}
            <Route path="/main/:cno/:stoken" element={<SOAonlyPage />} /> 
            <Route path="/" element={<SOAonlyPage />} />

            <Route path="/login" element={<LogPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/server-offline" element={<ServerOfflinePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
