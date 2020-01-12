import React from "react";
import { Link } from "react-router-dom";
import "../style/MovieItem.css";
const MovieItem = function({ title, date, url, characters }) {
  return (
    <Link
      to={{
        pathname: url.replace("https://swapi.co/api/films/", ""),
        state: { title, date, characters }
      }}
    >
      <div className="MovieItem">
        <h2 className="MovieItem__Title">{title}</h2>
        <span className="MovieItem__ReleaseDate">{date}</span>
      </div>
    </Link>
  );
};

export default MovieItem;
