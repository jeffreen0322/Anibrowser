import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./navbar";
import TopPage from "./pages/top/top";
import HomePage from "./pages/home/home";
import AnimePage from "./pages/anime-page/anime";
import GenrePage from "./pages/genre-page/genre";
import AnimeSearch from "./pages/anime-search/anime-search";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top/:page" element={<TopPage />} />
          <Route path="/anime/:id" element={<AnimePage />} />
          <Route path="/genre/:id/:name/:page" element={<GenrePage />} />
          <Route path="/anime-search/:id/:page" element={<AnimeSearch />} />
        </Routes>
      </Router>
    </>
  );
}
