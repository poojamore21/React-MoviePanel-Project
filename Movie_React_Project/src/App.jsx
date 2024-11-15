import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Assuming Navbar is correctly imported
import HomePage from "./Pages/HomePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import MovieListPage from "./Pages/MovieListPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<MovieListPage />} />
        </Route>
        <Route path="movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
