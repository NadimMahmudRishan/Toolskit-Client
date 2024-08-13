import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField, Button, Grid, Typography, Select, MenuItem, InputLabel, FormControl, Box, Paper, IconButton } from '@mui/material';
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardTitle from "../../../components/DashboardTitle/DashboardTitle";
import useAxios from "../../../hooks/useAxios";
import { Add, Remove } from '@mui/icons-material';

const AddProduct = () => {
    const [axiosSecure] = useAxios();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const { fields: colorFields, append: addColorField, remove: removeColorField } = useFieldArray({
        control,
        name: 'colors' // Field array name
    });
    const [imageUrls, setImageUrls] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [richTextValue, setRichTextValue] = useState('');
    const [specificationValue, setSpecificationValue] = useState('');
    const [stockStatus, setStockStatus] = useState('In Stock');
    const [review, setReview] = useState('');

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
            const colors = data.colors.map(color => color.trim()).filter(color => color); // Trim and filter out empty strings
            const response = await axiosSecure.post('/products', {
                product_name: data.Product_Name,
                price: price,
                quantity: data.Quantity,
                category: category,
                description: richTextValue,
                specification: specificationValue,
                stock_status: stockStatus,
                colors: colors,
                review: review,
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
                                            borderColor: '#b0b0b0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#b0b0b0',
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
                                            borderColor: '#b0b0b0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#b0b0b0',
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
                                            borderColor: '#b0b0b0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#b0b0b0',
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
                                            borderColor: '#b0b0b0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#b0b0b0',
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
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Colors
                            </Typography>
                            {colorFields.map((field, index) => (
                                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label={`Color ${index + 1}`}
                                        {...register(`colors.${index}`, { required: "Color is required" })}
                                        error={Boolean(errors.colors?.[index])}
                                        helperText={errors.colors?.[index]?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#b0b0b0',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#CC3333',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#CC3333',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#b0b0b0',
                                            },
                                            '&:hover .MuiInputLabel-root': {
                                                color: '#CC3333',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: '#CC3333',
                                            },
                                        }}
                                    />
                                    <IconButton onClick={() => removeColorField(index)} sx={{ ml: 1 }}>
                                        <Remove />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button variant="outlined" onClick={() => addColorField({ color: '' })}>
                                Add Color
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Stock Status</InputLabel>
                                <Select
                                    value={stockStatus}
                                    onChange={(e) => setStockStatus(e.target.value)}
                                >
                                    <MenuItem value="In Stock">In Stock</MenuItem>
                                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                                    <MenuItem value="Pre Order">Pre Order</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Product Description
                            </Typography>
                            <ReactQuill
                                value={richTextValue}
                                onChange={setRichTextValue}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                style={{ minHeight: '200px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Product Specifications
                            </Typography>
                            <ReactQuill
                                value={specificationValue}
                                onChange={setSpecificationValue}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                style={{ minHeight: '200px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Product Reviews
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#b0b0b0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#CC3333',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#b0b0b0',
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
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Product Images
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                            {isUploading && <LinearProgress variant="determinate" value={uploadProgress} sx={{ my: 2 }} />}
                            {apiError && <Typography color="error">{apiError}</Typography>}
                            {imageUrls.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 3 }}>
                                    {imageUrls.map((url, index) => (
                                        <img key={index} src={url} alt={`Product ${index}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                    ))}
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddProduct;
