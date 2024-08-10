import { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Container } from '@mui/material';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <Container>
            <Grid container spacing={4} className="my-20 py-8">
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, boxShadow: 3 }}>
                        <Typography variant="h5" gutterBottom className="font-bold">
                            Contact Us
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
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
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
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
                                <Grid item xs={12}>
                                    <TextField
                                        label="Message"
                                        name="message"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
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
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#CC3333',
                                            '&:hover': {
                                                backgroundColor: '#CC3333'
                                            }
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, boxShadow: 3 }}>
                        <Typography variant="h6" component="h2">
                            Address
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Daffodil Smart City, Dhaka, Bangladesh
                        </Typography>
                        <Box sx={{ my: 2 }}>
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.0625255700257!2d90.32143148561656!3d23.880748480771334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c37ee749ff91%3A0x3ba6f00f068d5883!2sYounus%20Khan%20Scholars&#39;%20Garden%202(A)%20-%20DIU!5e0!3m2!1sen!2sbd!4v1720692354635!5m2!1sen!2sbd"
                                width="100%"
                                height="450"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            ></iframe>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
