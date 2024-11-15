import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPage, setSearch } from "../redux/slices/movieSlice";
import "../CSS/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const categories = [
    { name: "Popular", id: "popular" },
    { name: "Top Rated", id: "top_rated" },
    { name: "Upcoming", id: "upcoming" },
  ];

  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategoryClick = (category) => {
    navigate("/");
    dispatch(setCategory(category));
    setIsMobileMenuOpen(false);
    setDebouncedSearch("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        dispatch(setSearch(debouncedSearch));
        dispatch(setPage(1));
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = (e) => {
    setDebouncedSearch(e.target.value);
  };

  return (
    <nav>
      <h1>Movie Panel</h1>
      <span className="menu-toggle" onClick={toggleMobileMenu}>
        &#9776;
      </span>

      <div className={`nav-options ${isMobileMenuOpen ? "mobile" : ""}`}>
        {categories.map((category, index) => (
          <button
            key={index}
            className="nav-category"
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search movie"
        value={debouncedSearch}
        onChange={handleSearchChange}
      />
    </nav>
  );
}

export default Navbar;
