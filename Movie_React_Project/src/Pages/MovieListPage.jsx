import React, { useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux"; 
import { fetchMovies } from "../Services/api"; 
import MovieList from "../Components/MovieList"; 
import "../CSS/HomePage.css"; 
import Pagination from "../Components/Pagination"; 
import {
  setMovies,
  setTotalPages,
  setPage,
  setSearch,
} from "../redux/slices/movieSlice"; 
import { Outlet } from "react-router-dom"; 


function MovieListPage() {
  // Accessing movie-related state from Redux store
  const movies = useSelector((state) => state.movieData.movies); 
  const page = useSelector((state) => state.movieData.page); 
  const search = useSelector((state) => state.movieData.search); 
  const totalPages = useSelector((state) => state.movieData.totalPages); 
  const category = useSelector((state) => state.movieData.category); 

  const dispatch = useDispatch(); 

 
  useEffect(() => {
    dispatch(setSearch("")); 
    dispatch(setPage(1));
  }, [dispatch, category]); 

  // Fetch movies when category, search, or page state changes
  useEffect(() => {
    const loadMovies = async () => {
      try {
      const data = await fetchMovies(category.id, search, page); 

      dispatch(setMovies(data.results)); 
      dispatch(setTotalPages(data.total_pages)); 
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    loadMovies(); 
  }, [dispatch, category, search, page]); 

  return (
    <div className="homepage">
      
      <h2>{category.name} Movies</h2>

      
      <MovieList movies={movies} />

      <Outlet />

      <Pagination
        setPage={(newPage) => dispatch(setPage(newPage))} 
        totalPage={totalPages} 
        currentPage={page} 
      />
    </div>
  );
}

export default MovieListPage; 
