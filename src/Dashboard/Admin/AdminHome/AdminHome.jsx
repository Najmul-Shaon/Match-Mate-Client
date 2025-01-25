import { useQuery } from "@tanstack/react-query";
import Chart from "./Statistics/Chart";
import Statistics from "./Statistics/Statistics";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: dashboardStats = {} } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodataCount");
      return res.data;
    },
  });
  return (
    <div>
      <Chart dashboardStats={dashboardStats}></Chart>
      <Statistics dashboardStats={dashboardStats}></Statistics>
    </div>
  );
};

export default AdminHome;
