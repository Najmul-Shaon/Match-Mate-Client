import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    // enabled: !loading,
    enabled: !!user?.email,
    queryFn: async () => {
      // console.log("check is admin", user);

      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
