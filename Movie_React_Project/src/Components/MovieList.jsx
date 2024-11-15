import React from "react";
import "../CSS/MovieList.css";
import { useNavigate } from "react-router-dom";

function MovieList({ movies }) {
  const navigate = useNavigate();
  
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="movie-link">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onError={(e) => e.target.src = 'fallback-image-url'}
              />
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No Movies Found</div>
      )}
    </div>
  );
}

export default MovieList;
