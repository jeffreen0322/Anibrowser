import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import genreObj from "./data/genres";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Redirect to anime search page with the search query as the id
    navigate(`/anime/search/${searchQuery}/1`);
  };

  const handleGenreSubmit = (event) => {
    // Must be a valid selection before we proceed.
    if (filterOption !== "" && filterOption !== "0") {
      event.preventDefault();
      navigate(`/anime/genre-search/${filterOption}/1`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      id="navigation"
      style={{ backgroundColor: "#162E54" }}
    >
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
              <a
                className="nav-link active link"
                id="home"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active link"
                id="top-anime"
                href="/anime/top/1"
              >
                Top Anime
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active link"
                id="top-manga"
                href="/manga/top/1"
              >
                Top Manga
              </a>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleGenreSubmit}>
            <select
              className="genre-selector"
              name="genres"
              id="genres"
              onChange={handleGenreChange}
            >
              <option value="0">Select Genre</option>
              {genreObj[0] &&
                genreObj[0].map((genre) => (
                  <option key={genre.mal_id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
            </select>
            <button className="btn btn-outline-primary" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
                type="submit"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </form>
          <form className="d-flex" onSubmit={handleFormSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery.replace(/\//g, "-")}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
