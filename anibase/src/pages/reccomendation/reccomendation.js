import React from "react";
import { useParams } from "react-router-dom";
import RecommendedAnime from "../../components/recommended/recommended";
import UpChevron from "../../components/redirect/up/up";
import Footer from "../../components/footer/footer";
import "./reccomendation.css";

export default function ReccomendationPage() {
  const idObj = useParams("id");
  return (
    <div>
      <RecommendedAnime id={idObj.id} limit={{ entries: -1 }} />;
      <Footer />
      <UpChevron id="navigation" />
    </div>
  );
}
