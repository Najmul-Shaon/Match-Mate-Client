const NormalButton = ({ btnText }) => {
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-accent hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-accent dark:hover:bg-red-600 dark:focus:ring-red-900"
    >
      {btnText}
    </button>
  );
};

export default NormalButton;
