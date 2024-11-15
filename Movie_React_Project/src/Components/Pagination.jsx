import "../CSS/Pagination.css"; 

const Pagination = ({ totalPage, setPage, currentPage }) => { 
  // Component accepts `totalPage` (total pages), `setPage` (function to set the current page), 
  // and `currentPage` (the current active page) as props

  const pageNumbers = []; // this Array holds the page numbers for rendering pagination buttons

  const pageLimit = 5; // Limit to show a maximum of 5 page buttons for pagination

  // If total pages are less than or equal to the pageLimit, show all page numbers
  if (totalPage <= pageLimit) {
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i); // it Push each page number to the pageNumbers array
    }
  } else {
    // If the current page is near the beginning (<= 3), show the first 3 pages and the last page
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i); 
      }
      pageNumbers.push("..."); // Add ellipsis (...) to indicate skipped pages
      pageNumbers.push(totalPage); // Add the last page number
    }

    // If the current page is near the end (>= totalPage - 2), show the first page and last 3 pages
    else if (currentPage >= totalPage - 2) {
      pageNumbers.push(1); // Add the first page number
      pageNumbers.push("..."); 
      for (let i = totalPage - 2; i <= totalPage; i++) {
        pageNumbers.push(i); // Add the last 3 page numbers
      }
    }
    // Otherwise, it shows first page, current page with previous and next pages, and last page
    else {
      pageNumbers.push(1); // Add the first page number
      pageNumbers.push("..."); // Add ellipsis (...) to indicate skipped pages
      pageNumbers.push(currentPage - 1); // Add previous page number
      pageNumbers.push(currentPage); // Add the current page number
      pageNumbers.push(currentPage + 1); // Add next page number
      pageNumbers.push("..."); 
      pageNumbers.push(totalPage); // Add the last page number
    }
  }

  return (
    <div className="pagination"> 
      
      <button
        onClick={() => setPage(currentPage - 1)} // it Decrease the current page by 1 when clicked
        disabled={currentPage === 1} // Disable if the current page is the first page
      >
        &lt; 
      </button>

    
      {pageNumbers.map((number, index) =>
        number === "..." ? ( 
          <span key={index} className="ellipsis">
            ...
          </span>
        ) : (
          
          <button
            key={index}
            onClick={() => setPage(number)} 
            className={number === currentPage ? "active" : ""} 
          >
            {number} 
          </button>
        )
      )}

      <button
        onClick={() => setPage(currentPage + 1)} 
        disabled={currentPage === totalPage} 
      >
        &gt; 
      </button>
    </div>
  );
};

export default Pagination; 
