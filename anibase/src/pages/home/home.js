import React from "react";
import "./home.css";
import SeasonalList from "../../components/seasonalList";
import UpChevron from "../../components/redirect/up/up";
import AnibrowserGraphic from "../../components/graphics/anibrowser-graphic";
import Footer from "../../components/footer/footer";

export default function HomePage() {
  return (
    <div className="homePage">
      <AnibrowserGraphic />
      <SeasonalList />
      <UpChevron id="navigation" />
      <Footer />
    </div>
  );
}
