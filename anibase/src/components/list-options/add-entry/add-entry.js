import axios from "axios";
import { useAuth } from "../../authentication/auth-context";
import { useNavigate } from "react-router-dom";
import "./add-entry.css";

export const AddEntry = ({ anime }) => {
  const { loggedIn, account_id } = useAuth();
  const pathname = window.location.pathname;
  const search = window.location.search;
  const localUrl = pathname + search;

  const swap = useNavigate();

  const handleChange = async (event) => {
    if (loggedIn) {
      const newValue = event.target.value;

      const existingRelationship = await retrieveUserAnimeRelationship();

      if (newValue !== "status-empty") {
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

  const retrieveUserAnimeRelationship = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-anime-user", {
        params: {
          user_id: account_id,
          ani_id: anime.mal_id,
        },
      });

      if (response.data && response.data.user_id) {
        return response.data; // Relationship exists
      }
      return null; // No relationship
    } catch (error) {
      console.error("Error retrieving user-anime relationship:", error);
      return null;
    }
  };

  const handleAddUserAnime = async (value) => {
    try {
      await axios.post("http://localhost:5000/add-anime-user", {
        user_id: account_id,
        ani_id: anime.mal_id,
        status: value,
        rating: 0,
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

  return (
    <div className="add-container">
      <select
        name="status"
        id="watch-status"
        className="dropdown"
        onChange={handleChange}
      >
        <option value="status-empty">Your status</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};
