import React from "react"; 
import "../CSS/MovieList.css"; 
import { useNavigate } from "react-router-dom"; 

//MovieList component that receives 'movies' as a prop
function MovieList({ movies }) { 
  const navigate = useNavigate(); 
  
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navigating to the movie detail page using the movie ID
  };

  return (
    <div className="movie-list"> 
      {movies.length > 0 ? (  // Checking if the movies array has any movies
        movies.map((movie) => (  // Iterating through each movie in the movies array
          <div
            className="movie-card"  
            key={movie.id}  
            onClick={() => handleMovieClick(movie.id)}  
          >
            <div className="movie-link"> 
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}  
                alt={movie.title}  
                onError={(e) => e.target.src = 'fallback-image-url'} // If image fails to load, set fallback image
              />
              <h3>{movie.title}</h3> 
              <p>Rating: {movie.vote_average}</p> 
            </div>
          </div>
        ))
      ) : (
        <div>No Movies Found</div> // If no movies are available
      )}
    </div>
  );
}

export default MovieList; 
