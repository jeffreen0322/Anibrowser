import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./anime-list.css";
import axios from "axios";

export const AnimeTable = ({ userId }) => {
  const [animeList, setAnimeList] = useState([]); // State to hold the anime data

  // Function to retrieve anime data
  const retrieveAnimes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/get-full-anime-user",
        {
          params: { user_id: userId },
        }
      );
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
  }, [userId]);

  // Render the component
  return (
    <ul className="list">
      {animeList.length > 0 ? (
        animeList.map((anime, key) => (
          <li key={key}>
            <Link className="anime-container" to={`/anime/${anime.ani_id}`}>
              <img src={anime.image_url} alt={anime.anime} />
              <p id="title">{anime.name}</p>
              <p id="status">
                {anime.status.slice(0, 1).toUpperCase() + anime.status.slice(1)}
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
