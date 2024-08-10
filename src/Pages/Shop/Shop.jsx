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
import { Box, Container, Grid, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useWishList from '../../hooks/useWishList';
import Modals from '../../components/Modals/Modals';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Skeleton from '@mui/material/Skeleton';

export default function RecipeReviewCard() {
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [, refetch] = useCart();
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
        fetch('https://toold-kit-server.vercel.app/wish-List', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                updateWishList();
                Swal.fire('Added To WishList');
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('An error occurred. Please try again later.');
            });
    };

    const handleAddToCart = (data) => {
        const saveData = {
            product_name: data.product_name,
            price: data.price,
            images: data.images,
            email: user?.email,
            userName: user?.displayName,
            quantity: 1
        }
        fetch('https://toold-kit-server.vercel.app/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `'${saveData.product_name}' added on the cart.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className='min-h-screen mb-20'>
            <SectionTitle heading="Shop" subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.'></SectionTitle>
            <Container>
                <Grid container spacing={4}>
                    {isLoading ? (
                        // Show Skeleton Loading when data is loading
                        Array.from(new Array(8)).map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card className='w-80 lg:w-full'>
                                    <Skeleton variant="rectangular" height={194} />
                                    <CardContent>
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                                        <Box>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShoppingCartCheckoutIcon />
                                            </IconButton>
                                        </Box>
                                        <IconButton aria-label="modal">
                                            <AspectRatioIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        // Render actual product cards when data is loaded
                        collection.map((product, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card component={Paper} key={product.id} sx={{ boxShadow: 3 }}>
                                    <CardContent sx={{ padding: 0 }}>
                                        <CardMedia
                                            component="img"
                                            image={product.images[0]}
                                            alt="Product image"
                                            sx={{ width: 200, height: 200, mx: 'auto' }}
                                        />
                                        <Box sx={{ p: 1 }}>
                                            <Typography variant='h6' sx={{ my: 1 }}>
                                                {product.product_name}
                                            </Typography>
                                            <p className='text-sm text-gray-500' dangerouslySetInnerHTML={{ __html: product.description }}></p>
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
            </Container>
            <Modals selectedProduct={selectedProduct} handleCloseModal={handleCloseModal}></Modals>
        </div>
    );
}
