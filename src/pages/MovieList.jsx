import React from "react";

import API from "../utils/api";
import MovieItem from "../components/MovieItem";
import Loading from "../components/Loading";
import "../style/MovieList.css";
const MovieList = function() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    //fetch data
    API.get("/films").then(({ data }) => {
      //store in state
      setMovies(data.results);
      //chain a loading state change
      setLoading(false);
    });
  }, []);

  //sort movies from first to last
  const sortList = data => {
    return data.sort((a, b) => {
      return (
        //casting it to a date format to work with the date
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });
  };
  return (
    <div className="MovieList">
      {loading && <Loading />}
      {sortList(movies).map(
        ({ episode_id, url, release_date, title, characters }) => (
          <div className="MovieList__item" key={episode_id}>
            <MovieItem
              title={title}
              date={release_date}
              characters={characters}
              url={url}
            />
          </div>
        )
      )}
    </div>
  );
};

export default MovieList;
