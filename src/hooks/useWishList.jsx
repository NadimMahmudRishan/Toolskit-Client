import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
    const { refetch: updateWishList, data: wishList = [],isLoading } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await fetch(`https://toold-kit-server.vercel.app/wishList`, {
            })
            return res.json();
        },
    })

    return [wishList, updateWishList, isLoading];
}

export default useWishList;
