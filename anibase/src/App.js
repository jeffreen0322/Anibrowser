import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./navbar";
import TopPage from "./pages/top/top";
import HomePage from "./pages/home/home";
import AnimePage from "./pages/anime-page/anime";
import AnimeSearch from "./pages/anime-search/anime-search";
import GenreSearch from "./pages/anime-search/genre-search";
import ReccomendationPage from "./pages/reccomendation/reccomendation";
import AboutPage from "./pages/about/about";
import PrivacyPage from "./pages/privacy/privacy";

export default function App() {
  return (
    <>
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
        </Routes>
      </Router>
      <Analytics />
    </>
  );
}
