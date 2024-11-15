import "../CSS/Pagination.css";

const Pagination = ({ totalPage, setPage, currentPage }) => {
  const pageNumbers = [];

  const pageLimit = 5;

  if (totalPage <= pageLimit) {
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPage);
    } else if (currentPage >= totalPage - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPage - 2; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      pageNumbers.push(currentPage - 1);
      pageNumbers.push(currentPage);
      pageNumbers.push(currentPage + 1);
      pageNumbers.push("...");
      pageNumbers.push(totalPage);
    }
  }

  return (
    <div className="pagination">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
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
