import { useState } from "react";
import { Helmet } from "react-helmet";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LinearProgress from '@mui/material/LinearProgress';
import { TextField, Button, Grid, Typography, Select, MenuItem } from '@mui/material'; // Import Select and MenuItem
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [apiError, setApiError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [richTextValue, setRichTextValue] = useState('');
    const [specificationValue, setSpecificationValue] = useState('');
    const [stockStatus, setStockStatus] = useState('In Stock'); // Default value

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
            const allowedImageCount = imageFiles.length;

            if (allowedImageCount === null) {
                throw new Error("Invalid image type selected.");
            }

            if (imageFiles.length !== allowedImageCount) {
                throw new Error(`You must upload exactly ${allowedImageCount} image(s) for the selected type.`);
            }

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
                title: 'Successfully Added',
                text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            console.log('Product added successfully:', response.data);
            reset();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="min-h-screen p-4 mt-16">
            <div className="lg:w-3/4 mx-auto bg-white p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Product Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                {...register("Product_Name", { required: true })}
                                error={errors.Product_Name ? true : false}
                                helperText={errors.Product_Name ? "This field is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                {...register("Price", { required: true })}
                                error={errors.Price ? true : false}
                                helperText={errors.Price ? "This field is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                {...register("Quantity", { required: true })}
                                error={errors.Quantity ? true : false}
                                helperText={errors.Quantity ? "This field is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Category"
                                {...register("category", { required: true })}
                                error={errors.category ? true : false}
                                helperText={errors.category ? "This field is required" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select us
                                fullWidth
                                value={stockStatus}
                                onChange={(e) => setStockStatus(e.target.value)}
                                label="Stock Status"
                                variant="outlined"
                            >
                                <MenuItem value="In Stock">In Stock</MenuItem>
                                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <ReactQuill
                                theme="snow"
                                value={specificationValue}
                                onChange={setSpecificationValue}
                                modules={modules}
                                formats={formats}
                                placeholder="Product Specification"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReactQuill
                                theme="snow"
                                value={richTextValue}
                                onChange={setRichTextValue}
                                modules={modules}
                                formats={formats}
                                placeholder="Product Description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                className="w-full"
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                required
                            />
                            {errors.image && <span className="text-red-600">This field is required</span>}
                            {uploadProgress > 0 && (
                                <div className="">
                                    <LinearProgress
                                        variant="determinate"
                                        value={uploadProgress}
                                        color="warning"
                                    />
                                    <span className="text-red-600 font-bold">{uploadProgress}%</span>
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: "#CC3333",
                                    '&:hover': {
                                        bgcolor: "#CC3333"
                                    }
                                }}
                                disabled={isUploading}
                            >
                                Submit
                            </Button>
                            <Button sx={{ mx: 2 }} type="reset" variant="contained" color="secondary" className="ms-2">Reset</Button>
                        </Grid>
                        {apiError && <Grid item xs={12} className="text-error font-semibold">Error: {apiError}</Grid>}
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
