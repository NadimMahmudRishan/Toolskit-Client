import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TextField, Button, Typography, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, FormControlLabel, Checkbox, Grid, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
// import { Helmet } from "react-helmet";
import GetDeviceInfo from "../../components/GetDeviceInfo/GetDeviceInfo";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const [axiosSecure, axiosError] = useAxios();

    useEffect(() => {
        const storedEmail = Cookies.get('genericUID');
        const storedPassword = Cookies.get('genericUSER');
        if (storedEmail) {
            const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, 'your_secret_key').toString(CryptoJS.enc.Utf8);
            setValue('email', decryptedEmail);
        }
        if (storedPassword) {
            const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, 'your_secret_key').toString(CryptoJS.enc.Utf8);
            setValue('password', decryptedPassword);
        }
    }, [setValue]);

    useEffect(() => {
        if (axiosError) {
            console.log(axiosError.response?.data?.message)
            setError(axiosError?.response?.data?.message || 'An unexpected error occurred');
        }
    }, [axiosError]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (data) => {
        const deviceInfo = GetDeviceInfo();

        // Generate a unique device ID if not already present
        const deviceId = Cookies.get('deviceId') || CryptoJS.lib.WordArray.random(16).toString();
        deviceInfo.deviceId = deviceId;
        Cookies.set('deviceId', deviceId, { expires: 365 });

        console.log(deviceInfo);
        setError('');
        setLoading(true);
        try {
            if (data.password.length < 6) {
                setError('Password must be at least 6 characters');
                setLoading(false);
                return;
            }

            const response = await axiosSecure.post('/login', {
                email: data.email,
                password: data.password,
                deviceInfo: deviceInfo
            });
            console.log(response);
            const loggedUser = response.data;

            // Store the token in local storage
            localStorage.setItem('access-token', loggedUser.token);

            if (data.rememberMe) {
                const encryptedEmail = CryptoJS.AES.encrypt(data.email, 'your_secret_key').toString();
                const encryptedPassword = CryptoJS.AES.encrypt(data.password, 'your_secret_key').toString();
                Cookies.set('genericUID', encryptedEmail, { expires: 7 });
                Cookies.set('genericUSER', encryptedPassword, { expires: 7 });
            } else {
                Cookies.remove('genericUID');
                Cookies.remove('genericUSER');
            }
            console.log(data.email, data.password)
            await signIn(data.email, data.password);
            navigate(from, { replace: true });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User successfully signed in.",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:hero min-h-screen lg:bg-base-200">
            {/* <Helmet>
                <title>{`Login`}</title>
            </Helmet> */}
            <div className="lg:hero-content flex-col lg:w-full">
                <div className="card flex-shrink-0 w-full lg:max-w-md lg:shadow-2xl bg-base-100 rounded-sm">
                    <div className="card-body">
                        <h1 className="text-3xl">Login now</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-3">
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    {...register("email", { required: true })}
                                    error={!!errors.email}
                                    helperText={errors.email && "This field is required"}
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
                            </div>
                            <div className="my-4">
                                <FormControl fullWidth variant="outlined"
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
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password", { required: true, minLength: 6, maxLength: 20 })}
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
                                        <Typography variant="body2" color="error">
                                            {errors.password.type === "required" && "Password is required"}
                                            {errors.password.type === "minLength" && "Password must have at least 6 characters"}
                                            {errors.password.type === "maxLength" && "Password must have at most 20 characters"}
                                        </Typography>
                                    )}
                                </FormControl>
                                <Grid container sx={{ my: 2 }}>
                                    <Grid item xs>
                                        <Link to='/request-password' className="label-text font-semibold-alt link link-hover">Forgot password?</Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to='/signUp' className="label-text font-semibold-alt link link-hover">{"Don't have an account? Sign Up"}</Link>
                                    </Grid>
                                </Grid>
                                <FormControlLabel
                                    control={<Checkbox   {...register("rememberMe")} value="rememberMe" color="error" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#CC3333",
                                        '&:hover': {
                                            bgcolor: "#CC3333"
                                        },
                                        mt: 3,
                                        mb: 2
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                                </Button>
                            </div>
                        </form>
                        {error && <Typography sx={{ width: { xs: '100%', md: 380 }, mx: 'auto', bgcolor: '#dc3545', p: 2, color: 'white' }} variant="body2" color="error" align="center">
                            {error}
                        </Typography>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
