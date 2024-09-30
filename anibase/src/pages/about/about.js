import React from "react";
import Category from "../../components/named-header/category";
import AnibrowserGraphic from "../../components/graphics/anibrowser-graphic";
import Footer from "../../components/footer/footer";
import "./about.css";

export default function AboutPage() {
  return (
    <div>
      <AnibrowserGraphic />
      <Category name="About Us" />
      <p className="description" id="about-desc">
        Anibrowser is an online platform for searching and browsing anime and
        manga, along with relevant details such as the description, genres,
        characters, reccomendations, and more! Anibrowser utilizes an
        open-sourced API called "Jikan", querying from a database of 26000+
        animes and 68000+ manga across 70+ genres.
      </p>

      <Category name="Inspiration" />
      <p className="description" id="inspiration-desc">
        Anibrowser is inspired from traditional anime database platforms such as
        MyAnimeList and Anilist. Anibrowser puts a spin to these platforms,
        providing a new and distinctive UI and search functionalities that
        improve upon it's inspiration.
      </p>

      <Footer />
    </div>
  );
}
