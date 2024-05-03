import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import TopPage from "./pages/top/top";
import HomePage from "./pages/home/home";
import Anime from "./pages/anime-page/anime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/anime/:id" Component={Anime}></Route>
        </Routes>
      </Router>
    </>
  );
}
