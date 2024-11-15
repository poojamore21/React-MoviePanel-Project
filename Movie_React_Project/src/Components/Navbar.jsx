import React, { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { setCategory, setPage, setSearch } from "../redux/slices/movieSlice"; 
import "../CSS/Navbar.css"; 
import { useNavigate } from "react-router-dom"; 

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to handle mobile menu toggle
  const [debouncedSearch, setDebouncedSearch] = useState(""); // State to handle the search input with debounce
  const navigate = useNavigate(); 
  const categories = [
    { name: "Popular", id: "popular" }, // Category list for different movie categories
    { name: "Top Rated", id: "top_rated" },
    { name: "Upcoming", id: "upcoming" },
  ];

  const dispatch = useDispatch(); // dispatch actions to the Redux store

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    navigate("/"); 
    dispatch(setCategory(category)); // Dispatch the selected category to the Redux store
    setIsMobileMenuOpen(false); 
    setDebouncedSearch(""); // It Reset the search when a category is selected
  };

  // useEffect hook for debouncing the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      try{
      dispatch(setSearch(debouncedSearch)); // Dispatch the debounced search term to the Redux store
      dispatch(setPage(1));
      }
      catch (error) {
        console.error("Error handling search input:", error); 
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(timer); 
  }, [debouncedSearch, dispatch]); // The effect runs when debouncedSearch or dispatch changes

 
  const handleSearchChange = (e) => {
    setDebouncedSearch(e.target.value); // Set the new search value
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
        value={debouncedSearch} // Bind the value of the input to the debouncedSearch state
        onChange={handleSearchChange} 
      />
    </nav>
  );
}

export default Navbar; 
