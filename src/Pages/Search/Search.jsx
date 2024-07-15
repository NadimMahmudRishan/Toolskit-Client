import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useCart from '../../hooks/useCart';
import useWishList from '../../hooks/useWishList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import Modals from '../../components/Modals/Modals';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Skeleton from '@mui/material/Skeleton';
import FeaturedProducts from '../Home/FeaturedProducts/FeaturedProducts';

const Search = () => {
    const location = useLocation();
    const searchResults = JSON.parse(decodeURIComponent(new URLSearchParams(location.search).get('results')));

    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [, refetch] = useCart();
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
            images: data.images
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
        <div>
            <div className='min-h-screen mb-20'>
                <SectionTitle heading="Search Result" subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.'></SectionTitle>
                <Grid sx={{ maxWidth: 1300, mx: 'auto' }} container spacing={4}>
                    {searchResults.map((product, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ maxWidth: 380 }}>
                                {product ? (
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={product.images[0]}
                                        alt="Paella dish"
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" height={194} />
                                )}
                                <CardContent sx={{ maxWidth: 290 }}>
                                    {product ? (
                                        <>
                                            <h1>{product.product_name}</h1>
                                            <Typography variant="body2" color="text.secondary">
                                                <div dangerouslySetInnerHTML={{ __html: product.description }} ></div>
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                            <Skeleton variant="text" />
                                        </>
                                    )}
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                                    <Box>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon onClick={() => handleWishList(product)} />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShoppingCartCheckoutIcon onClick={() => handleAddToCart(product)} />
                                        </IconButton>
                                    </Box>
                                    <IconButton aria-label="modal">
                                        <AspectRatioIcon onClick={() => handleOpenModal(product)} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Modals selectedProduct={selectedProduct} handleCloseModal={handleCloseModal}></Modals>
            </div>
            <div className="mb-24 w-10/12 mx-auto">
                <FeaturedProducts></FeaturedProducts>
            </div>
        </div>
    );
};

export default Search;
