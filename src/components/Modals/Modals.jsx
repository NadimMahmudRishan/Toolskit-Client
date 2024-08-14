import { useState } from 'react';
import { Box, IconButton, Modal, Typography, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import { Close as CloseIcon } from '@mui/icons-material';
import Swal from "sweetalert2";
import useWishList from "../../hooks/useWishList";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Modals = ({ selectedProduct, handleCloseModal }) => {
    const [axiosSecure] = useAxios();
    const [, refetchCart] = useCart();
    const [, updateWishList] = useWishList();
    const { user } = useAuth();

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors[0] || '');

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleWishList = () => {
        const saveData = {
            product_name: selectedProduct.product_name,
            price: selectedProduct.price,
            images: selectedProduct.images,
            email: user?.email,
            userName: user?.displayName,
        };
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

    const handleAddToCart = async () => {
        const saveData = {
            product_name: selectedProduct.product_name,
            price: selectedProduct.price,
            images: selectedProduct.images,
            email: user?.email,
            userName: user?.displayName,
            quantity: quantity,
            color: selectedColor
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
                    p: 2,
                    width: '90%',
                    maxWidth: '1200px',
                    height: 'auto'
                }}
            >
                <IconButton
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
                    <div className="lg:flex gap-5 justify-center p-10">
                        <Carousel className='lg:w-4/12 w-52 mx-auto lg:mt-8'>
                            {selectedProduct.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} className="w-80" alt={`Product Image ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ width: 500 }}>
                                <Typography variant="h5" component="h1">
                                    {selectedProduct.product_name}
                                </Typography>
                                <p className='py-2'>{selectedProduct.review}</p>
                            </Box>
                            <div className="divider"></div>
                            <Box sx={{ my: 2 }}>
                                <p>Availability: <span className="text-green-600">{selectedProduct.stock_status}</span></p>
                            </Box>
                            <Typography variant="h5" component="h2">
                                ${selectedProduct.price}
                            </Typography>
                            <Box sx={{ my: 2 }}>
                                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                                    <RadioGroup value={selectedColor} onChange={handleColorChange} row>
                                        {selectedProduct.colors.map((color, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={color}
                                                control={<Radio style={{ color }} />}
                                                label={color}
                                            />
                                        ))}
                                    </RadioGroup>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ my: 2 }}>
                                    <div className="input-number product__quantity flex items-center gap-2">
                                        <IconButton
                                            onClick={handleDecrement}
                                            sx={{ borderRadius: 0, border: '1px solid #ddd', p: 1 }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <input
                                            id="product-quantity"
                                            type=""
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            style={{
                                                textAlign: 'center',
                                                width: '50px',
                                                borderRadius: '0',
                                                border: '1px solid #ddd',
                                                padding: '0.5rem',
                                                boxSizing: 'border-box'
                                            }}
                                            min="1"
                                        />
                                        <IconButton
                                            onClick={handleIncrement}
                                            sx={{ borderRadius: 0, border: '1px solid #ddd', p: 1 }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                                <Box sx={{ my: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleAddToCart}
                                        sx={{ borderRadius: '4px', fontWeight: 'bold' }}
                                    >
                                        Add To Cart
                                    </Button>
                                    <button
                                        onClick={handleWishList}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#f0f0f0',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '8px',
                                            cursor: 'pointer',
                                            color: '#CC3333',
                                        }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ fontSize: 'medium' }}
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderRadius: '4px',
                                            borderColor: 'error.main',
                                            color: 'error.main',
                                            '&:hover': {
                                                borderColor: 'error.dark',

                                            },
                                        }}
                                    >
                                        <Link to={`/details/${selectedProduct._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            Read more
                                        </Link>
                                    </Button>

                                </Box>
                            </Box>
                        </Box>
                    </div>
                )}
            </Box>
        </Modal>
    );
};

export default Modals;
