import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
    const { refetch: updateWishList, data: wishList = [] } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/wishList`, {
            })
            return res.json();
        },
    })

    return [wishList, updateWishList];
}

export default useWishList;
