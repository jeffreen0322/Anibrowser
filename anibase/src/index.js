import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import TopPage from "./top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <>
      <Navbar />

      <Router>
        <Routes>
          <Route path="/top" element={<TopPage />} />
        </Routes>
      </Router>
    </>
  );
}
