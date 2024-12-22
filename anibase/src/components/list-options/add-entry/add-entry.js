import axios from "axios";
import { useAuth } from "../../authentication/auth-context";
import "./add-entry.css";

export const AddEntry = ({ anime }) => {
  const { account_id } = useAuth();

  const handleChange = async (event) => {
    const newValue = event.target.value;

    const existingRelationship = await retrieveUserAnimeRelationship();

    if (newValue !== "status-empty") {
      if (existingRelationship) {
        handleUpdateUserAnime(newValue);
      } else {
        handleAddUserAnime(newValue);
      }
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

      console.log("Response received:", response.data);
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
      const response = await axios.post(
        "http://localhost:5000/add-anime-user",
        {
          user_id: account_id,
          ani_id: anime.mal_id,
          status: value,
          rating: 0,
        }
      );

      console.log("Anime added successfully:", response.data);
    } catch (error) {
      console.error("Error adding user anime:", error);
    }
  };

  const handleUpdateUserAnime = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/update-anime-user",
        {
          user_id: account_id,
          ani_id: anime.mal_id,
          status: value,
        }
      );

      console.log("Anime updated successfully:", response.data);
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
