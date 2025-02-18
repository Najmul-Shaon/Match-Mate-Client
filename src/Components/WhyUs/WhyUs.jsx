import Lottie from "lottie-react";
import whyImg from "../../assets/whyUs.json";

const WhyUs = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center max-w-screen-xl mx-auto px-4">
      <div className="w-full md:w-1/2 p-4 bg-white  rounded-lg sm:p-8">
        <h5 className="mb-4 text-3xl font-bold text-gray-500 dark:text-gray-400">
          Why Choose <span className="text-accent"> Match Mate</span>
        </h5>
        <ul role="list" className="space-y-5 my-7">
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-accent dark:text-accent"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              100% human verified profiles
            </span>
          </li>
          <li className="flex">
            <svg
              className="flex-shrink-0 w-4 h-4 text-accent dark:text-accent"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              Chat, Voice & Video calling
            </span>
          </li>
          <li className="flex">
            <svg
              className="flex-shrink-0 w-4 h-4 text-accent dark:text-accent"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              Private, personalized, and highly confidential service
            </span>
          </li>
          <li className="flex">
            <svg
              className="flex-shrink-0 w-4 h-4 text-accent dark:text-accent"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              Halal, safe and secured Matrimony site in Bangladesh
            </span>
          </li>
        </ul>
        <button className="btn-gradient">Find Your Partner Now</button>
      </div>
      {/* lottie aniation  */}
      <div className="md:w-1/2 w-full">
        <Lottie animationData={whyImg} loop={true} />
      </div>
    </div>
  );
};

export default WhyUs;
