import { Link } from "react-router-dom";
import errorImage from "../../assets/404.gif";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <figure className="w-1/2">
        <img src={errorImage} className="w-full" alt="" />
      </figure>
      <Link to="/">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
