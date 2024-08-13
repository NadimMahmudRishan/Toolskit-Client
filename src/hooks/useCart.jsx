import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useCart = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxios();

    const { refetch: cartRefetch, data: cart = [], isLoading } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/shopping-cart`, {
                params: { email: user?.email }
            });
            return data;
        },
    });
    return [cart, cartRefetch, isLoading];
}

export default useCart;
