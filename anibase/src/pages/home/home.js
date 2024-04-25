import React from "react";

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

function HomePage() {
  return <About />;
}

function About() {
  return (
    <div>
      <Title />
    </div>
  );
}

function Title() {
  return (
    <div>
      <h1>Anibase: Anime listings done right</h1>
      <ItemList items={items} />
    </div>
  );
}

function ItemList({ items }) {
  return (
    <div>
      {items.map((listItem) => (
        <Item image={listItem.icon} description={listItem.descriptor} />
      ))}
    </div>
  );
}

function Item({ image, description }) {
  return (
    <div>
      <img src={image} alt="icon" />
      <p>{description}</p>
    </div>
  );
}

export default HomePage;
