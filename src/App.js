import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import MovieList from "./pages/MovieList";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="wrapper">
            <MovieList />
          </div>
        </Route>
        <Route path="/:id">
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  );
}
