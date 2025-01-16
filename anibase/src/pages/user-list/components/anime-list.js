import React from "react";
import { Link } from "react-router-dom";
import "./anime-list.css";

export const AnimeTable = ({ anilist }) => {
  // Render the component
  return (
    <ul className="list">
      <li>
        <div className="anime-container headers">
          <p></p>
          <p className="t-header">Title</p>
          <p className="t-header">Status</p>
          <p className="t-header">Rating</p>
        </div>
      </li>
      {anilist.length > 0 ? (
        anilist.map((anime, key) => (
          <li key={key}>
            <Link
              className="anime-container entry"
              to={`/anime/${anime.ani_id}`}
            >
              <img src={anime.image_url} alt={anime.anime} />
              <p className="descriptor" id="title">
                {anime.name}
              </p>
              <p className="descriptor" id="status">
                {anime.status.slice(0, 1).toUpperCase() + anime.status.slice(1)}
              </p>
              <p className="descriptor" id="rating">
                {!anime.rating ? "N/A" : anime.rating}
              </p>
            </Link>
          </li> // Use a unique key for each list item
        ))
      ) : (
        <p>No anime found for this user.</p>
      )}
    </ul>
  );
};
