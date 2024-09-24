import React from "react";
import "./home.css";
import SeasonalList from "../../components/seasonalList";
import myImage from "./images/anibrowser.png";
import UpChevron from "../../components/redirect/up/up";

export default function HomePage() {
  return (
    <div className="homePage">
      <MainPic />
      <SeasonalList />
      <UpChevron id="#anibrowser" />
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
