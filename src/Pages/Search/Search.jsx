import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useCart from '../../hooks/useCart';
import useWishList from '../../hooks/useWishList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Typography } from '@mui/material';
import Modals from '../../components/Modals/Modals';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import useAxios from '../../hooks/useAxios';


const Search = () => {
    const [axiosSecure] = useAxios();
    const { user } = useAuth();
    const location = useLocation();
    const searchResults = JSON.parse(decodeURIComponent(new URLSearchParams(location.search).get('results')));
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [, refetchCart,] = useCart();
    const [, updateWishList] = useWishList();


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


    return (
        <div>
            <div className='min-h-screen mb-20'>
                <SectionTitle heading="Search Result" subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.'></SectionTitle>
                <Grid sx={{ maxWidth: { xs: 320 }, mx: 'auto' }} spacing={4}>
                    {searchResults.map((product, index) => (
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
                    ))}
                </Grid>
                <Modals selectedProduct={selectedProduct} handleCloseModal={handleCloseModal}></Modals>
            </div>
        </div>
    );
};

export default Search;