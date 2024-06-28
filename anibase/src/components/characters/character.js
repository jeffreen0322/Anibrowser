import React from "react";
import "./character.css";

export default function Character({ name, role, image }) {
  return (
    <div className="character">
      <img src={image} alt={name} />
      <p>
        <b>{role}</b>
      </p>
      <p>{name}</p>
    </div>
  );
}
