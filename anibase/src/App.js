import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./components/supabase/client";
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

export default function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    let { data: accounts, error } = await supabase.from("accounts").select("*");

    if (error) {
      console.log("Error fetching accounts.");
    } else {
      console.log(accounts);
    }
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
