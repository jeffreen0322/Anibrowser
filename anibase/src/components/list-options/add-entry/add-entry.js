/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authentication/auth-context";
import { useNavigate } from "react-router-dom";
import "./add-entry.css";

export const AddEntry = ({ anime }) => {
  const { loggedIn, account_id } = useAuth();
  const pathname = window.location.pathname;
  const search = window.location.search;
  const localUrl = pathname + search;

  const [status, setStatus] = useState("status-empty"); // Default status
  const [rating, setRating] = useState("rating-default"); // Default rating
  const swap = useNavigate();

  // Fetch user-anime relationship on component mount
  useEffect(() => {
    const fetchUserAnimeRelationship = async () => {
      if (loggedIn) {
        const relationship = await retrieveUserAnimeRelationship();
        if (relationship) {
          setStatus(relationship.status || "status-empty");
          setRating(
            relationship.rating
              ? relationship.rating.toString()
              : "rating-default"
          );
        }
      }
    };
    fetchUserAnimeRelationship();
  }, [loggedIn, anime.mal_id]);

  const retrieveUserAnimeRelationship = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-anime-user", {
        params: {
          user_id: account_id,
          ani_id: anime.mal_id,
        },
      });

      if (response.data && response.data.user_id) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user-anime relationship:", error);
      return null;
    }
  };

  const handleChange = async (event) => {
    if (loggedIn) {
      const newValue = event.target.value;

      if (newValue !== "status-empty") {
        setStatus(newValue);
        const existingRelationship = await retrieveUserAnimeRelationship();

        if (existingRelationship) {
          handleUpdateUserAnime(newValue);
        } else {
          handleAddUserAnime(newValue);
        }
      }
    } else {
      swap("/login", {
        state: { redirectURL: localUrl },
        replace: true,
      });
    }
  };

  const handleRatingChange = async (event) => {
    if (loggedIn) {
      const newRating = event.target.value;

      if (newRating !== "rating-default") {
        setRating(newRating);
        const existingRelationship = await retrieveUserAnimeRelationship();

        if (existingRelationship) {
          handleUpdateAnimeRating(newRating);
        } else {
          alert("Provide a watch status before rating!");
        }
      }
    } else {
      swap("/login", {
        state: { redirectURL: localUrl },
        replace: true,
      });
    }
  };

  const handleAddUserAnime = async (value) => {
    try {
      await axios.post("http://localhost:5000/add-anime-user", {
        user_id: account_id,
        ani_id: anime.mal_id,
        status: value,
      });
    } catch (error) {
      console.error("Error adding user anime:", error);
    }
  };

  const handleUpdateUserAnime = async (value) => {
    try {
      await axios.post("http://localhost:5000/update-anime-user", {
        user_id: account_id,
        ani_id: anime.mal_id,
        status: value,
      });
    } catch (error) {
      console.error("Error updating user anime:", error);
    }
  };

  const handleUpdateAnimeRating = async (value) => {
    try {
      await axios.post("http://localhost:5000/update-rating-anime", {
        user_id: account_id,
        ani_id: anime.mal_id,
        rating: value,
      });
    } catch (error) {
      console.error("Error updating anime rating:", error);
    }
  };

  return (
    <div className="add-container">
      <select
        name="status"
        id="watch-status"
        className="dropdown"
        value={status} // Bind to state
        onChange={handleChange}
      >
        <option value="status-empty">Your status</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>

      {loggedIn ? (
        <select
          name="rating"
          id="watch-rating"
          className="dropdown"
          value={rating}
          onChange={handleRatingChange}
        >
          <option value="rating-default">Your rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      ) : null}
    </div>
  );
};
