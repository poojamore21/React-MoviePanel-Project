import { createSlice } from "@reduxjs/toolkit";

// Initial state object with category, search, page, movies, and totalPages
const initialState = {
  category: { name: "Popular", id: "popular" },
  search: "",
  page: 1,
  movies: [],
  totalPages: 1,
};

const movieSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    // Set a new category
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    // Set a new search query
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    // Set the current page
    setPage: (state, action) => {
      state.page = action.payload;
    },

    // Set the list of movies
    setMovies: (state, action) => {
      state.movies = action.payload;
    },

    // Set the total pages (for pagination)
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    // Reset the state (useful for clearing search, category, etc.)
    resetState: (state) => {
      state.category = { name: "Popular", id: "popular" };
      state.search = "";
      state.page = 1;
      state.movies = [];
      state.totalPages = 1;
    },
  },
});

// Export the actions to dispatch
export const {
  setCategory,
  setSearch,
  setPage,
  setMovies,
  setTotalPages,
  resetState,
} = movieSlice.actions;

export default movieSlice.reducer;
