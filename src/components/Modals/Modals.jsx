import { useCallback } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import { Favorite as FavoriteIcon, Close as CloseIcon } from '@mui/icons-material'; // Import CloseIcon
import Swal from "sweetalert2";
import useWishList from "../../hooks/useWishList";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Modals = ({ selectedProduct, handleCloseModal }) => {
    const [, refetchCart] = useCart();
    const [, updateWishList] = useWishList();
    const { user } = useAuth();

    const handleWishList = useCallback((data) => {
        const saveData = {
            product_name: data.product_name,
            price: data.price,
            images: data.images
        }
        fetch('https://toold-kit-server.vercel.app/wish-list', {
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
    }, [updateWishList]);

    const handleAddToCart = useCallback((data) => {
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
                    refetchCart();
                    Swal.fire({
                        icon: 'success',
                        title: `'${saveData.product_name}' added on the cart.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }, [user, refetchCart]);

    
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={selectedProduct !== null}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    p: 6,
                }}
                className="lg:w-[55rem] h-[44rem]"
            >
                <IconButton // Close icon button
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1,
                    }}
                    onClick={handleCloseModal}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                {selectedProduct && (
                    <div className="lg:flex gap-10 justify-center">
                        <Carousel className='lg:w-6/12 w-56 mx-auto lg:mt-8'>
                            {selectedProduct.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} className="w-96" alt={`Product Image ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                        <Box>
                            <Typography>
                                <h1 className="text-xl lg:text-4xl font-bold">{selectedProduct.product_name}</h1>
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <div className="hidden lg:flex" dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></div>
                            </Typography>
                            <div className="divider"></div>
                            <Box sx={{ my: 2 }}>
                                <p>Availability: <span className="text-green-600">{selectedProduct.stock_status}</span></p>
                            </Box>
                            <Typography variant="h4" component="h2">
                                <h1 className="font-bold">${selectedProduct.price}</h1>
                            </Typography>
                            <Box sx={{ my: 2 }}>
                                <button onClick={() => handleAddToCart(selectedProduct)} className="btn bg-[#CC3333] hover:bg-[#CC3333] rounded-sm px-5 py-1 font-semibold text-white">Add To Cart</button>
                                <IconButton sx={{ mx: 2 }} aria-label="add to favorites" onClick={() => handleWishList(selectedProduct)}>
                                    <FavoriteIcon fontSize="large" />
                                </IconButton>
                                <button className="bg-black text-white font-semibold py-2 px-7 border border-white hover:border-transparent rounded">
                                    <Link to={`/details/${selectedProduct._id}`}>Read more</Link>
                                </button>
                            </Box>
                        </Box>
                    </div>
                )}
            </Box>
        </Modal>
    );
};

export default Modals;
