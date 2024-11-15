import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";

const store = configureStore({
  reducer: {
    movieData: movieReducer,
  },
});

export default store;
