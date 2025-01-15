const SectionTitle = ({ header }) => {
  return (
    <div className="flex flex-col items-center mt-24">
      {/* <p className="text-lg font-normal">{subHeader}</p> */}
      <h1 className="text-3xl text-accent font-bold">{header}</h1>
    </div>
  );
};

export default SectionTitle;
