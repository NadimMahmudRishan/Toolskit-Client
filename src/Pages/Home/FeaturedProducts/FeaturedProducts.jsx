import { useState } from 'react';
import { Box, Card, CardContent, CardActions, IconButton, Typography, CardMedia, Skeleton, CardActionArea, Paper } from '@mui/material';
import { Favorite as FavoriteIcon, AspectRatio as AspectRatioIcon, ShoppingCartCheckout as ShoppingCartCheckoutIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import useWishList from '../../../hooks/useWishList';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modals from '../../../components/Modals/Modals';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [, refetchCart] = useCart();
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
            <div className='flex'>
                <h1 className='text-xl font-bold py-5'>Featured Products</h1>
            </div>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {isLoading ? (
                    Array.from(new Array(8)).map((_, index) => (
                        <Card key={index} sx={{ maxWidth: 340 }} className='border-[1px] border-gray-300'>
                            <CardActionArea>
                                <Skeleton variant="rectangular" />
                                <CardContent>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </CardContent>
                            </CardActionArea>
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
                    ))
                ) : (
                    collection.map((product) => (
                        <Card key={product._id} component={Paper} sx={{ display: 'flex', flexDirection: 'column', height: '100%', mx: '14px', boxShadow: 2, border: 1, borderColor: 'gray' }}>
                            <Link to={`/details/${product._id}`}>
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
                            </Link>
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
                    ))
                )}
            </Carousel>
            <Modals selectedProduct={selectedProduct} handleCloseModal={handleCloseModal}></Modals>
        </div>
    );
}
