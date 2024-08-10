import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { TextField, Button, Typography, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Snackbar, Alert, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SocialLogIn from "./SocialLogin";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        if (data.password.length < 6) {
            setSnackbarMessage('Password is less than 6 characters');
            setOpenSnackbar(true);
            return;
        }
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User successfully signed in.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                setSnackbarMessage(error.message);
                setOpenSnackbar(true);
                console.error(error.message);
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.paper'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 3,
                    boxShadow: 3,
                    bgcolor: 'background.default',
                    borderRadius: 1
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login now
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Password must have at most 20 characters"
                                    }
                                })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {errors.password && (
                                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                    {errors.password.message}
                                </Typography>
                            )}
                        </FormControl>
                        <Typography sx={{ marginTop: 2 }} variant="body2" color="primary">
                            <Link to='/request-password' style={{ color: '#1976d2' }}>Forgot password?</Link>
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                            bgcolor: "#CC3333",
                            '&:hover': {
                                bgcolor: "#CC3333"
                            }
                        }}
                    >
                        Login
                    </Button>
                </form>
                <Box sx={{ mt: 3 }}>
                    <SocialLogIn />
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        New to Stroyka? <Link to="/signUp" style={{ color: '#CC3333', fontWeight: 'bold' }}>Sign up</Link>
                    </Typography>
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
