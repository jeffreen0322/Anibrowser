import { useAuth } from "../../components/authentication/auth-context";
import { AnimeTable } from "./components/anime-list";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Category from "../../components/named-header/category";
import "./user-list.css";

export default function UserListPage() {
  const { account_id, loggedIn, username } = useAuth();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const search = window.location.search;
  const localUrl = pathname + search;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { state: { redirectURL: localUrl }, replace: true });
    }
  });

  return (
    <div className="user-anime-list">
      <Category name={`${username}'s List`} />
      <AnimeTable userId={account_id} />;
    </div>
  );
}
