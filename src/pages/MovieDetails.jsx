import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import API from "../utils/api";
import Loading from "../components/Loading";
import axios from "axios";
import "../style/MovieDetails.css";

const MovieDetails = function() {
  const [loading, setLoading] = React.useState(true);
  const [chars, setChars] = React.useState([]);
  const [movieDetails, setMovieDetails] = React.useState({});

  const location = useLocation();
  const params = useParams();

  React.useEffect(() => {
    //if characters are passed via previous api call, use it. Else this might be a new tab on current url => refetch
    if (location.state !== undefined && location.state.characters) {
      fetchChars(location.state.characters);
      setMovieDetails({
        title: location.state.title,
        release_date: location.state.date
      });
    } else {
      //Refetch data from movie since the browser did not have any stored data
      API.get("/films/" + params.id).then(res => {
        fetchChars(res.data.characters);
        setMovieDetails(res.data);
      });
    }
  }, [location.state, params.id]);

  const fetchChars = data => {
    // resolve all calls before handling the response
    return Promise.all(
      data.map(char => {
        return axios.get(char);
      })
    )
      .then(response => {
        setChars(
          response.map(res => {
            return res.data.name;
          })
        );
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div className="MovieDetails">
      <div className="MovieDetails__wrapper">
        <div className="MovieDetails__title">
          <h1>{movieDetails.title}</h1>
          <div className="MovieDetails__close">
            <Link to="/">Close</Link>
          </div>
        </div>
        <div className="MovieDetails__date">{movieDetails.release_date}</div>
        <h2>Characters</h2>
        <div className="MovieDetails__characters">
          {loading && <Loading />}
          {chars.map(c => {
            return (
              <div key={c} className="MovieDetails__character-item">
                {c}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
