import React from "react";
import { useParams } from "react-router-dom";
import RecommendedAnime from "../../components/recommended/recommended";
import "./reccomendation.css";

export default function ReccomendationPage() {
  const idObj = useParams("id");
  return <RecommendedAnime id={idObj.id} limit={{ entries: -1 }} />;
}
