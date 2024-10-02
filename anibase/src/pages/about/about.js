import React from "react";
import Category from "../../components/named-header/category";
import AnibrowserGraphic from "../../components/graphics/anibrowser-graphic";
import Footer from "../../components/footer/footer";
import UpChevron from "../../components/redirect/up/up";
import "./about.css";

export default function AboutPage() {
  return (
    <div>
      <AnibrowserGraphic />
      <Category name="About Us" />
      <p className="description" id="about-desc">
        Anibrowser is your go-to platform for discovering and exploring the vast
        world of anime and manga. With a comprehensive database that includes
        over 26,000 anime titles and 68,000 manga entries spanning more than 70
        genres, Anibrowser offers a user-friendly experience for fans to search,
        browse, and learn about their favorite series. Powered by the
        open-sourced Jikan API, our platform delivers detailed information on
        each title, including descriptions, genres, characters, recommendations,
        and more. Whether you're looking for something new to watch or just want
        to dive deeper into a series, Anibrowser provides an intuitive and
        seamless way to do so.
      </p>

      <Category name="Inspiration" />
      <p className="description" id="inspiration-desc">
        Inspired by popular platforms such as MyAnimeList and Anilist,
        Anibrowser takes a fresh approach to the traditional anime and manga
        browsing experience. While drawing inspiration from these established
        platforms, we’ve focused on refining the user interface and search
        functionalities to create a distinctive and enhanced browsing
        experience. With a sleek design and advanced features, Anibrowser is
        built to cater to both seasoned fans and newcomers, ensuring that
        everyone can easily find and explore content in a way that feels new and
        exciting. Our aim is to build upon what came before us, adding our own
        unique twist to improve usability, efficiency, and enjoyment.
      </p>

      <Footer />
      <UpChevron id="navigation" />
    </div>
  );
}
