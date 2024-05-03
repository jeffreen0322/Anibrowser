import React from "react";
import { Link } from "react-router-dom";
import "./animeEntry.css";

export default function AnimeEntry({ id, title, episodes, score, image }) {
  return (
    <Link to={`/anime/${id}`} className="ani-entry">
      <img src={image} alt={title} />
      <ul>
        <li>
          <strong>{title}</strong>
        </li>
        <li>Score: {score}</li>
        <li>Episodes: {episodes == null ? "N/A" : episodes}</li>
      </ul>
    </Link>
  );
}
