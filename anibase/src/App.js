import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./components/authentication/auth-context";
import Navbar from "./navbar";
import TopPage from "./pages/top/top";
import HomePage from "./pages/home/home";
import AnimePage from "./pages/anime-page/anime";
import AnimeSearch from "./pages/anime-search/anime-search";
import GenreSearch from "./pages/anime-search/genre-search";
import ReccomendationPage from "./pages/reccomendation/reccomendation";
import AboutPage from "./pages/about/about";
import PrivacyPage from "./pages/privacy/privacy";
import LoginPage from "./pages/login-page/login";
import SignupPage from "./pages/login-page/signup";
import Footer from "./components/footer/footer";
import UpChevron from "./components/redirect/up/up";
import PasswordReset from "./pages/login-page/password-reset";
import PasswordResetPage from "./pages/login-page/reset-password-input";
import UserListPage from "./pages/user-list/user-list";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/:type/top/:page" element={<TopPage />} />
          <Route path="/:type/:id" element={<AnimePage />} />
          <Route path="/:type/search/:id/:page/" element={<AnimeSearch />} />
          <Route
            path="/:type/genre-search/:genre/:page/"
            element={<GenreSearch />}
          />

          <Route
            path="/:type/:id/reccomendation/"
            element={<ReccomendationPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset/password" element={<PasswordReset />} />
          <Route
            path="/reset/password/form/:encrypted/:iv"
            element={<PasswordResetPage />}
          />

          <Route path="/my-list/anime" element={<UserListPage />} />
        </Routes>
        <UpChevron id="navigation" />
        <Footer />
      </Router>
      <Analytics />
    </AuthProvider>
  );
}
