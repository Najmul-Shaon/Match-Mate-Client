import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle/SectionTitle";
import CountUp from "react-countup";

const Commuinity = () => {
  const axiosPublic = useAxiosPublic();
  const { data: commuinityStats = {} } = useQuery({
    queryKey: ["commuinityStats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodataCount");
      return res.data;
    },
  });
  return (
    <div className="bg-primary mt-24 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <SectionTitle
          header={"Member Insights"}
          subHeader={"Visualizing the Heart of Our Platform"}
        ></SectionTitle>
        {/* quantity card  */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* total biodata  */}

          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
            <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
              <span>
                <CountUp end={commuinityStats?.totalBiodata} />
              </span>
              +
            </h3>
            <p className="font-normal text-gray-900 dark:text-white text-lg">
              Total Biodata
            </p>
          </div>

          {/* Total male biodata  */}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
            <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
              <span>
                <CountUp end={commuinityStats?.totalMaleBiodata} />
              </span>
              +
            </h3>
            <p className="font-normal text-gray-900 dark:text-white text-lg">
              Male Biodata
            </p>
          </div>
          {/* Total female biodata  */}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
            <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
              <span>
                <CountUp end={commuinityStats?.totalFemaleBiodata} />
              </span>
              +
            </h3>
            <p className="font-normal text-gray-900 dark:text-white text-lg">
              Female Biodata
            </p>
          </div>
          {/* Total marriege*/}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
            <h3 className="mb-2 font-bold text-3xl text-accent dark:text-accent">
              <span>
                <CountUp end={commuinityStats?.totalMarried} />
              </span>
              +
            </h3>
            <p className="font-normal text-gray-900 dark:text-white text-lg">
              Married
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commuinity;
