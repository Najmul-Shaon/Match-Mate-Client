import { Link } from "react-router-dom";

const Pagination = ({ pagesCount, setCurrentPage, currentPage }) => {
  const handlePrePage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagesCount.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li onClick={handlePrePage}>
          <Link className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </Link>
        </li>
        {pagesCount.map((page, i) => (
          <li onClick={() => setCurrentPage(page)} key={i}>
            <Link
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-accent/70 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === page && "bg-accent text-white"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}
        <li onClick={handleNextPage}>
          <Link className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-accent rounded-e-lg hover:bg-accent hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
