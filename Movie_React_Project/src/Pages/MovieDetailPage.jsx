import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../Services/api";
import "../CSS/MovieDetailPage.css";

function MovieDetailPage() {
  const { id } = useParams(); // Extract the movie ID from the URL parameters

  const [movie, setMovie] = useState(null); // State for storing movie details

  const [cast, setCast] = useState([]); // State for storing movie cast information


  // Fetch movie details and credits when the component mounts or the ID changes
  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(id); // Fetch movie details using API
        setMovie(movieData);

        const creditsData = await fetchMovieCredits(id); // Fetch movie credits (cast) using API
        setCast(creditsData.cast);
      } catch (err) {
        console.error("Error fetching movie data:", err);
      }
    };
    loadMovieDetails();
  }, [id]); // Dependency array ensures this effect runs when the `id` changes

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail-page">
      <div className="movie-header">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p className="movie-rating">Rating: {movie.vote_average}</p>
          <p className="movie-runtime">{movie.runtime} min</p>
          <p className="movie-genres">
            {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className="movie-release-date">
            Release Date: {new Date(movie.release_date).toDateString()}
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Movie Cast Section */}
      <div className="movie-cast">
        <h3>Cast</h3>
        <div className="cast-list">
          {cast.slice(0, 6).map(
            (
              actor // Display the first 6 cast members
            ) => (
              <div key={actor.cast_id} className="cast-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className="cast-name">{actor.name}</p>
                <p className="cast-character">{actor.character}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
