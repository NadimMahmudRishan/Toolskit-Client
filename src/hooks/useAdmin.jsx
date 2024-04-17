import { useMemo } from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxios();
    const queryKey = useMemo(() => ['isAdmin', user?.email], [user?.email]);

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey,
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                return res.data.admin;
            } catch (error) {
                console.error('Error while fetching isAdmin:', error);
                return false;
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
