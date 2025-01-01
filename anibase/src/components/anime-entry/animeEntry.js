import React from "react";
import axios from "axios";
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
  const SERVER = "https://anibrowser-server.vercel.app";
  const navigate = useNavigate();
  const handleRedirect = (path) => {
    handleAddAnime();
    navigate(path);
    window.location.reload();
  };

  const typeObj = useParams("type");

  // Instantly adds the anime into the database upon arrival to website.
  const handleAddAnime = async () => {
    // alert(`id: ${id} title: ${title} "image: ${image}`);
    try {
      await axios.post(`${SERVER}/add-anime-entry`, {
        id: id,
        name: title,
        image_url: image,
        url: `${window.location.origin}/${
          typeObj.type === undefined ? "anime" : typeObj.type
        }/${id}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
            {typeObj.type === "anime" || typeObj.type === undefined
              ? "Episodes"
              : "Chapters"}
            : {episodes == null ? "N/A" : episodes}
          </li>
        ) : null}
        <li style={{ color: "wheat" }}>
          <strong>{season != null ? season.toUpperCase() : null}</strong>
        </li>
      </ul>
    </Link>
  );
}
