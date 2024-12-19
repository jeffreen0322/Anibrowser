import React from "react";
import "./home.css";
import SeasonalList from "../../components/seasonalList";
import AnibrowserGraphic from "../../components/graphics/anibrowser-graphic";

export default function HomePage() {
  return (
    <div className="homePage">
      <AnibrowserGraphic />
      <SeasonalList />
    </div>
  );
}
