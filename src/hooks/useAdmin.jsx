import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxios();
    const queryKey = useMemo(() => ['isAdmin', user?.email], [user?.email]);

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey,
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/verify/admin-users/${user?.email}`);
                return response.data.Admin;
            } catch (error) {
                console.error('Error while fetching isAdmin:', error);
                return false;
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
