import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY },
});

// Fetch movie details category ,query ,page
export async function fetchMovies(category, query = "", page = 1) {
  try {
    const params = {
      page,
      ...(query && { query }),
    };

    const url = query ? "/search/movie" : `/movie/${category}`;

    const { data } = await AxiosInstance.get(url, { params });

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch movies:",
      error.response || error.message || error
    );
    throw error;
  }
}

// Fetch movie details by id
export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await AxiosInstance.get(`/movie/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Failed to fetch movie details:",
      error.response || error.message || error
    );
    throw error;
  }
};

// Fetch movie credit
export const fetchMovieCredits = async (movieId) => {
  try {
    const { data } = await AxiosInstance.get(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.error(
      "Failed to fetch movie credits:",
      error.response || error.message || error
    );
    throw error;
  }
};
