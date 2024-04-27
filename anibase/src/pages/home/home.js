import React from "react";
import "./home.css";

const items = [
  {
    className: "bi bi-star-fill",
    path: "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z",
    descriptor:
      "Filter and search for all your favorite anime and manga all on one platform!",
  },
  {
    className: "bi bi-lightning-charge-fill",
    path: "M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z",
    descriptor: "Easy to use and responsive!",
  },
  {
    className: "bi bi-book-fill",
    path: "M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783",
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
        <Item
          key={listItem.className}
          image={listItem.icon}
          description={listItem.descriptor}
          className={listItem.className}
          path={listItem.path}
        />
      ))}
    </div>
  );
}

function Item({ description, className, path }) {
  return (
    <div className="item">
      <Icon className={className} path={path} />
      <p>{description}</p>
    </div>
  );
}

function Icon({ className, path }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path d={path} />
    </svg>
  );
}
