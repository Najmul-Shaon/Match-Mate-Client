const SectionTitle = ({ header, subHeader }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-normal mt-2 text-center">{subHeader}</p>
      <h1 className="text-3xl bg-gradient-to-r from-accent to-secondary font-bold uppercase mt-2 text-center text-transparent bg-clip-text">{header}</h1>
    </div>
  );
};

export default SectionTitle;
