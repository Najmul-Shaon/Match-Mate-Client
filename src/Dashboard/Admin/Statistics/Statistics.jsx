import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: dashboardStats = {} } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodataCount");
      return res.data;
    },
  });
  console.log(dashboardStats);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* total biodata  */}

        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
          <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
            <span> {dashboardStats?.totalBiodata}</span>
          </h3>
          <p className="font-normal text-gray-900 dark:text-white text-lg">
            Total Biodata
          </p>
        </div>

        {/* Total male biodata  */}
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
          <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
            <span> {dashboardStats?.totalMaleBiodata}</span>
          </h3>
          <p className="font-normal text-gray-900 dark:text-white text-lg">
            Male Biodata
          </p>
        </div>
        {/* Total female biodata  */}
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
          <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
            <span>{dashboardStats?.totalFemaleBiodata}</span>
          </h3>
          <p className="font-normal text-gray-900 dark:text-white text-lg">
            Female Biodata
          </p>
        </div>
        {/* Total premium*/}
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
          <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
            <span> {dashboardStats?.totalPremiumBiodata}</span>
          </h3>
          <p className="font-normal text-gray-900 dark:text-white text-lg">
            Premium Biodata
          </p>
        </div>
        {/* Total Revenue*/}
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
          <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
            <span> {dashboardStats?.amount}</span>
          </h3>
          <p className="font-normal text-gray-900 dark:text-white text-lg">
            Revenue
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
