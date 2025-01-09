import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./anime-list.css";
import axios from "axios";

export const AnimeTable = ({ userId }) => {
  const SERVER = "https://anibrowser-server.vercel.app";
  const [animeList, setAnimeList] = useState([]); // State to hold the anime data

  // Function to retrieve anime data
  const retrieveAnimes = async () => {
    try {
      const response = await axios.get(`${SERVER}/get-full-anime-user`, {
        params: { user_id: userId },
      });
      setAnimeList(response.data); // Update state with the retrieved data
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect to fetch data when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      retrieveAnimes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
      {animeList.length > 0 ? (
        animeList.map((anime, key) => (
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
