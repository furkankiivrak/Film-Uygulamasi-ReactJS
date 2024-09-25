import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  const handleMovieClick = (imdbID) => {
    navigate(`/film/${imdbID}`);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onMovieClick={() => handleMovieClick(movie.imdbID)} 
        />
      ))}
    </div>
  );
};

export default MovieList;
