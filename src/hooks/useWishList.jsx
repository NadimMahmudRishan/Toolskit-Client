import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useWishList = () => {
    const [axiosSecure] = useAxios();

    const { data: wishList = [], refetch, isLoading } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await axiosSecure.get('/wishList');
            return res.data;
        },
    });

    return [wishList, refetch, isLoading];
}

export default useWishList;
