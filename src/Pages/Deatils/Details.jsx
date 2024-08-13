import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FeaturedProducts from "../Home/FeaturedProducts/FeaturedProducts";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Container, Tabs, Tab, Box, Button, FormControlLabel, Radio, RadioGroup, IconButton } from "@mui/material";
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useAxios from '../../hooks/useAxios';
import useCart from '../../hooks/useCart';
import useWishList from '../../hooks/useWishList';


const Details = () => {
    const [axiosSecure] = useAxios();
    const { user } = useAuth();
    const data = useLoaderData();
    const { product_name, price, review, description, specification, stock_status, colors = [], images = [] } = data;
    const [, refetchCart,] = useCart();
    const [, updateWishList] = useWishList();
    const [tabValue, setTabValue] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(colors[0] || '');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleWishList = () => {
        const saveData = {
            product_name: product_name,
            price: price,
            images: images,
            email: user?.email,
            userName: user?.displayName,
        }
        fetch('http://localhost:5000/api/wish-list', {
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
            product_name: product_name,
            price: price,
            images: images,
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
        <div>
            <SectionTitle heading='Details' subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.' />
            <Container>
                <div className="p-0">
                    <div className='grid lg:grid-cols-2'>
                        <div className='flex' style={{ width: '100%', height: 'auto' }}>
                            <Carousel className='w-[250px] lg:w-10/12 mx-auto mt-8'>
                                {images.length > 0 ? (
                                    images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} className="w-96" alt={`Product Image ${index}`} />
                                        </div>
                                    ))
                                ) : (
                                    <div>No images available</div>
                                )}
                            </Carousel>
                        </div>
                        <div className="p-4 mt-8">
                            <div className="mb-8">
                                <p className="uppercase font-semibold text-[13px]">HOME - PRODUCTS - <span>{product_name}</span></p>
                            </div>
                            <h1 className="font-bold text-4xl">{product_name}</h1>
                            <p>{review}</p>
                            <h2 className='py-3 text-base-400 text-xl'>${price}.00</h2>
                            <p>Availability: <span className="text-green-600">{stock_status}</span></p>

                            <div className="py-4">

                            </div>

                            <div className="py-4">
                                <div className="flex flex-wrap">
                                    <RadioGroup value={selectedColor} onChange={handleColorChange} row>
                                        {colors.length > 0 ? (
                                            colors.map((color, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={color}
                                                    control={<Radio style={{ color }} />}
                                                    label={color}
                                                    className="mr-2"
                                                />
                                            ))
                                        ) : (
                                            <FormControlLabel
                                                disabled
                                                control={<Radio />}
                                                label="No colors available"
                                            />
                                        )}
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="py-4 flex gap-2 items-center">
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

                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "16px" }}>
                        <Tabs value={tabValue} onChange={handleChange} aria-label="product details tabs"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#CC3333',
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    color: '#CC3333',
                                }
                            }}
                        >
                            <Tab label="Description" />
                            <Tab label="Specification" />
                        </Tabs>
                    </div>
                    <div style={{ width: '100%', border: '1px solid #ddd', marginTop: '0px', padding: '50px', boxSizing: 'border-box' }}>
                        <Box sx={{ padding: '16px' }}>
                            {tabValue === 0 && (
                                <div dangerouslySetInnerHTML={{ __html: description }} className="item-description text-[#7D7D7D]"></div>
                            )}
                            {tabValue === 1 && (
                                <div dangerouslySetInnerHTML={{ __html: specification }} className="item-description text-[#7D7D7D]"></div>
                            )}
                        </Box>
                    </div>
                    <div className="mb-10 mt-8">
                        <FeaturedProducts />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Details;
