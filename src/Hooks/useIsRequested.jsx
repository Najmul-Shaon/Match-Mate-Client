import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useIsRequested = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isRequested } = useQuery({
      queryKey: ["isRequested", user?.email], queryFn: async () => {
          const res = await axiosSecure.get(`/check/requestContact?`);
    }
  });
};

export default useIsRequested;
