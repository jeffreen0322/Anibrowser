import { useAuth } from "../../components/authentication/auth-context";
import { AnimeTable } from "./components/anime-list";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserStats } from "./components/user-stats";
import Category from "../../components/named-header/category";
import axios from "axios";
import "./user-list.css";

export default function UserListPage() {
  const { account_id, loggedIn, username } = useAuth();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const search = window.location.search;
  const localUrl = pathname + search;

  const SERVER = "https://anibrowser-server.vercel.app";
  const [animeList, setAnimeList] = useState([]);

  // Function to retrieve anime data
  const retrieveStats = async () => {
    try {
      const response = await axios.get(`${SERVER}/get-full-anime-user`, {
        params: { user_id: account_id },
      });
      setAnimeList(response.data); // Update state with the retrieved data
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { state: { redirectURL: localUrl }, replace: true });
    } else {
      retrieveStats();
    }
  });

  return (
    <div className="user-anime-list">
      <Category name={`${username}'s List`} />
      <div className="ani-info">
        <UserStats anilist={animeList} />
        <AnimeTable anilist={animeList} />
      </div>
    </div>
  );
}
