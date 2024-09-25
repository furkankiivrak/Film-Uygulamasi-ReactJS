import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={onMovieClick}>
      <h3>{movie.Title}</h3>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
