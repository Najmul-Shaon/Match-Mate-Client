import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    // enabled: !!loading,
    enabled: !!user?.email && !!localStorage.getItem("userToken"),

    queryFn: async () => {
      console.log("check is admin", user);
      // console.log(!!user?.email);

      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
