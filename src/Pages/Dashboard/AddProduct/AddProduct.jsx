import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField, Button, Grid, Typography, Select, MenuItem, InputLabel, FormControl, Box, Paper } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardTitle from "../../../components/DashboardTitle/DashboardTitle";

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [richTextValue, setRichTextValue] = useState('');
    const [specificationValue, setSpecificationValue] = useState('');
    const [stockStatus, setStockStatus] = useState('In Stock');

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const uploadToImgbb = async (imageFiles) => {
        try {
            const promises = imageFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('key', 'b6e270ffa7b7fb4823f1d15c738eb7ef');

                const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    },
                });
                return response.data.data.url;
            });

            const uploadedImageUrls = await Promise.all(promises);
            setImageUrls(uploadedImageUrls);
            setApiError(null);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        uploadToImgbb(files);
    };

    const onSubmit = async (data) => {
        try {
            const price = parseFloat(data.Price);
            const category = data.category.toUpperCase();
            const response = await axios.post('https://toold-kit-server.vercel.app/products', {
                product_name: data.Product_Name,
                price: price,
                quantity: data.Quantity,
                category: category,
                description: richTextValue,
                specification: specificationValue,
                stock_status: stockStatus,
                images: imageUrls
            });

            Swal.fire({
                title: 'Product Added',
                text: 'Product has been successfully added',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log('Product added successfully:', response.data);
            reset();
        } catch (error) {
            console.error('Error adding product:', error);
            setApiError('An error occurred while adding the product.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <DashboardTitle heading="ADD NEW PRODUCT" subHeading="Add New Product" route="Dashboard" />
            <Paper sx={{ mt: 2, p: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Product Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                {...register("Product_Name", { required: "Product Name is required" })}
                                error={Boolean(errors.Product_Name)}
                                helperText={errors.Product_Name?.message}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'default',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'default',
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: '#CC3333',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#CC3333',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                {...register("Price", { required: "Price is required" })}
                                error={Boolean(errors.Price)}
                                helperText={errors.Price?.message}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'default',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'default',
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: '#CC3333',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#CC3333',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                type="number"
                                {...register("Quantity", { required: "Quantity is required" })}
                                error={Boolean(errors.Quantity)}
                                helperText={errors.Quantity?.message}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'default',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'default',
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: '#CC3333',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#CC3333',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Category"
                                {...register("category", { required: "Category is required" })}
                                error={Boolean(errors.category)}
                                helperText={errors.category?.message}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'default',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'default',
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: '#CC3333',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#CC3333',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'default',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'default',
                                    },
                                    '&:hover .MuiInputLabel-root': {
                                        color: '#CC3333',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#CC3333',
                                    },
                                }}
                            >
                                <InputLabel>Stock Status</InputLabel>
                                <Select
                                    value={stockStatus}
                                    onChange={(e) => setStockStatus(e.target.value)}
                                    label="Stock Status"
                                >
                                    <MenuItem value="In Stock">In Stock</MenuItem>
                                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: ' bold' }}>
                                Product Specification
                            </Typography>
                            <ReactQuill
                                theme="snow"
                                value={specificationValue}
                                onChange={setSpecificationValue}
                                modules={modules}
                                formats={formats}
                                placeholder="Product Specification"
                                style={{ height: '200px' }} // Adjust height as needed
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 1, mt: 4, fontWeight: 'bold' }}>
                                Product Description
                            </Typography>
                            <ReactQuill
                                theme="snow"
                                value={richTextValue}
                                onChange={setRichTextValue}
                                modules={modules}
                                formats={formats}
                                placeholder="Product Description"
                                style={{ height: '200px' }} // Adjust height as needed
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 4 }}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                accept="image/*"
                                style={{ width: '100%', marginBottom: '16px' }}
                            />
                            {uploadProgress > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={uploadProgress}
                                        color="warning"
                                    />
                                    <Typography variant="caption" color="textSecondary">
                                        Upload Progress: {uploadProgress}%
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    bgcolor: "#CC3333",
                                    '&:hover': {
                                        bgcolor: "#B02D2D"
                                    }
                                }}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Button
                                type="reset"
                                variant="outlined"
                                color="secondary"
                                sx={{ ml: 2 }}
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                        </Grid>
                        {apiError && <Grid item xs={12}>
                            <Typography color="error" variant="body2">
                                Error: {apiError}
                            </Typography>
                        </Grid>}
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddProduct;
