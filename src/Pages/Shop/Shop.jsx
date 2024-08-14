import { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { Box, Container, Grid, Paper, Skeleton, Pagination } from '@mui/material';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishList from '../../hooks/useWishList';
import Modals from '../../components/Modals/Modals';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const PAGE_SIZE = 8;

export default function RecipeReviewCard() {
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [, refetchCart,] = useCart();
    const [, updateWishList] = useWishList();

    const [axiosSecure] = useAxios();
    const { data: collection = [], isLoading } = useQuery({
        queryKey: ['collection'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/collection`);
                return res.data;
            } catch (error) {
                throw new Error(error.response.data.message);
            }
        },
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(collection.length / PAGE_SIZE);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleWishList = (data) => {
        const saveData = {
            product_name: data.product_name,
            price: data.price,
            images: data.images,
            email: user?.email,
            userName: user?.displayName,
        }
        fetch('https://toolskit-mongoose-server.vercel.app/api/wish-list', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
            .then(data => {
                updateWishList();
                Swal.fire(`${data.product_name} Added To WishList`);
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('An error occurred. Please try again later.');
            });
    };

    const handleAddToCart = async (data) => {
        const saveData = {
            product_name: data.product_name,
            price: data.price,
            images: data.images,
            email: user?.email,
            userName: user?.displayName
        };

        try {
            const response = await axiosSecure.post('/carts', saveData);
            if (response.status === 201) {
                refetchCart();
                Swal.fire({
                    icon: 'success',
                    title: `'${saveData.product_name}' added to the cart.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            Swal.fire(
                'Error!',
                'Failed to add the product to cart. Please try again later.',
                'error'
            );
        }
    };


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className='min-h-screen mb-20'>
            <SectionTitle heading="Shop" subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.' />
            <Container>
                <Grid container spacing={4}>
                    {isLoading ? (
                        // Show Skeleton Loading when data is loading
                        Array.from(new Array(PAGE_SIZE)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card className='w-80 lg:w-full' sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Skeleton variant="rectangular" height={200} />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                                        <Box>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="add to cart">
                                                <ShoppingCartCheckoutIcon />
                                            </IconButton>
                                        </Box>
                                        <IconButton aria-label="view details">
                                            <AspectRatioIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        // Render actual product cards when data is loaded
                        collection.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((product, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card component={Paper} sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardContent sx={{ padding: 0, flexGrow: 1 }}>
                                        <CardMedia
                                            component="img"
                                            image={product.images[0]}
                                            alt="Product image"
                                            sx={{ width: 200, height: 200, mx: 'auto', objectFit: 'cover' }}
                                        />
                                        <Box sx={{ p: 1 }}>
                                            <Typography variant='h6' sx={{ my: 1 }}>
                                                {product.product_name}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                ${product.price}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                                        <Box>
                                            <IconButton aria-label="add to favorites" onClick={() => handleWishList(product)}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="add to cart" onClick={() => handleAddToCart(product)}>
                                                <ShoppingCartCheckoutIcon />
                                            </IconButton>
                                        </Box>
                                        <IconButton aria-label="view details" onClick={() => handleOpenModal(product)}>
                                            <AspectRatioIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="error"
                    />
                </Box>
            </Container>
            <Modals selectedProduct={selectedProduct} handleCloseModal={handleCloseModal} />
        </div>
    );
}
