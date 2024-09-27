import React from "react";
import "./home.css";
import SeasonalList from "../../components/seasonalList";
import UpChevron from "../../components/redirect/up/up";
import Footer from "../../components/footer/footer";
import myImage from "./images/anibrowser.png";

export default function HomePage() {
  return (
    <div className="homePage">
      <MainPic />
      <SeasonalList />
      <UpChevron id="navigation" />
      <Footer />
    </div>
  );
}

function MainPic() {
  return (
    <div className="picture">
      <img src={myImage} alt="Anibrowser Picture" id="anibrowser" />
    </div>
  );
}
