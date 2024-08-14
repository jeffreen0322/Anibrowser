import React from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./animeEntry.css";

export default function AnimeEntry({
  id,
  title,
  episodes,
  score,
  image,
  season,
  showEpisode,
}) {
  const navigate = useNavigate();
  const handleRedirect = (path) => {
    navigate(path);
    window.location.reload();
  };

  const typeObj = useParams("type");

  return (
    <Link
      to={`/${typeObj.type === undefined ? "anime" : typeObj.type}/${id}`}
      className="ani-entry"
      onClick={handleRedirect}
    >
      <img src={image} alt={title} />
      <ul>
        <li>
          <strong>{title}</strong>
        </li>
        {score !== null ? <li>Score: {score}</li> : null}
        {showEpisode ? (
          <li>
            {typeObj.type === "anime" ? "Episodes" : "Chapters"}:{" "}
            {episodes == null ? "N/A" : episodes}
          </li>
        ) : null}
        <li style={{ color: "wheat" }}>
          <strong>{season != null ? season.toUpperCase() : null}</strong>
        </li>
      </ul>
    </Link>
  );
}
