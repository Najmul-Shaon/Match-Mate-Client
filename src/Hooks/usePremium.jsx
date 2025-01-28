import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isPremium, isPending: isPremiumLoading } = useQuery({
    queryKey: [user?.email, "isPremium"],
    // enabled: !loading,
    enabled: !!user?.email,
    queryFn: async () => {

      const res = await axiosSecure.get(`/user/premium/${user?.email}`);
      return res.data?.isPremium;
    },
  });
  return [isPremium, isPremiumLoading];
};

export default usePremium;
