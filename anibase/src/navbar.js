import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import genres from "./data/genres";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Redirect to anime search page with the search query as the id
    navigate(`/anime-search/${searchQuery}/1`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="https://i.imgur.com/6hDgVdy.png"
            alt="logo of anibase"
            id="logo"
          />{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/top/1">
                Top Anime
              </a>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleFormSubmit}>
            <select name="genres" id="genres">
              <option value="select" selected>
                Select Genre
              </option>
              {genres &&
                genres.map((genre) => (
                  <option value={genre.name}>{genre.name}</option>
                ))}
            </select>
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery.replace(/\//g, "-")}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
