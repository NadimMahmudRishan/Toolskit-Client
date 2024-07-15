import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";


const useCart = () => {
    const { user, loading } = useAuth();
    const token = localStorage.getItem('access-token');
    const { refetch, data: cart = [], isLoading } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://toold-kit-server.vercel.app/carts?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            return res.json();
        },
    })

    return [cart, refetch, isLoading]

}
export default useCart;