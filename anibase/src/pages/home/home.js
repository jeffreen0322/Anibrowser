import React from "react";
import "./home.css";

const items = [
  {
    icon: "",
    descriptor:
      "Filter and search for all your favorite anime and manga all on one platform!",
  },
  { icon: "", descriptor: "Easy to use and responsive!" },
  {
    icon: "",
    descriptor: "View all the latest series from the click of a button.",
  },
];

export default function HomePage() {
  return <About />;
}

function About() {
  return (
    <div className="about">
      <Title />
      <ItemList items={items} />
    </div>
  );
}

function Title() {
  return (
    <div className="title-header">
      <h1>Anibase: Anime listings done right</h1>
    </div>
  );
}

function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map((listItem) => (
        <Item image={listItem.icon} description={listItem.descriptor} />
      ))}
    </div>
  );
}

function Item({ image, description }) {
  return (
    <div className="item">
      <img src={image} alt="icon" />
      <p>{description}</p>
    </div>
  );
}
