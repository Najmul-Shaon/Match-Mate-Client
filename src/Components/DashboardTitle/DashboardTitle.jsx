const DashboardTitle = ({ content, qty = [] }) => {
  return (
    <div>
      <h3 className="text-2xl text-center text-accent font-bold">
        {content} ({qty.length})
      </h3>
    </div>
  );
};

export default DashboardTitle;
