import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./navbar";
import TopPage from "./pages/top/top";
import HomePage from "./pages/home/home";
import AnimePage from "./pages/anime-page/anime";
import AnimeSearch from "./pages/anime-search/anime-search";
import GenreSearch from "./pages/anime-search/genre-search";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top/:page" element={<TopPage />} />
          <Route path="/anime/:id" element={<AnimePage />} />
          <Route path="/anime-search/:id/:page/" element={<AnimeSearch />} />
          <Route path="/genre-search/:genre/:page/" element={<GenreSearch />} />
        </Routes>
      </Router>
    </>
  );
}
