import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const apiKey = '2f9f632a';
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

      try {
        const response = await axios.get(url);
        setMovie(response.data);
        fetchTrailer(response.data.Title);
      } catch (error) {
        console.error('Film detaylarını alma hatası: ', error);
      }
    };

    const fetchTrailer = async (movieTitle) => {
      const youtubeApiKey = 'AIzaSyARpHAlQhKjtSJZBuGsduXbswBU12GWKLA';
      const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle} trailer&type=video&key=${youtubeApiKey}`;

      try {
        const youtubeResponse = await axios.get(youtubeUrl);
        const trailerId = youtubeResponse.data.items[0]?.id.videoId; // İlk videonun ID'sini al
        if (trailerId) {
          setTrailer(`https://www.youtube.com/embed/${trailerId}`);
        } else {
          console.log('Fragman bulunamadı.');
        }
      } catch (error) {
        console.error('Fragman alma hatası: ', error);
      }
    };

    fetchMovieDetail();
  }, [imdbID]);

  if (!movie) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="movie-detail">
      <div className="movie-card">
        <h2>{movie.Title}</h2>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="movie-info">
          <p>{movie.Plot}</p>
          <p><strong>Yönetmen:</strong> {movie.Director}</p>
          <p><strong>Yıl:</strong> {movie.Year}</p>
        </div>

        {trailer && (
          <div className="movie-trailer">
            <h3>Fragman</h3>
            <iframe
              width="560"
              height="315"
              src={trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
