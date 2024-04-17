import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { TextField, Button, Typography, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SocialLogIn from "./SocialLogin";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        if (data.password.length < 6) {
            setError('Password is less than 6 characters');
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
                    title: "User successfully Sing in.",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                setError(error.message);
                console.error(error.message);
            })
    }
    return (
        <div className="lg:hero min-h-screen lg:min-h-[90vh] lg:bg-base-100">
            <Helmet>
                <title>{`Login - ExeService.Online`}</title>
            </Helmet>
            <div className="lg:hero-content flex-col lg:w-8/12">
                <div className="card flex-shrink-0 w-full lg:max-w-sm lg:shadow-2xl bg-base-100 rounded-sm">
                    <div className="card-body">
                        <div className="">
                            <h1 className="text-3xl lg:font-bold">Login now</h1>
                        </div>
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
                                />
                            </div>
                            <div className="my-4">
                                <FormControl fullWidth variant="outlined">
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
                                <Typography sx={{ marginTop: 2 }} variant="body2" color="primary">
                                    <Link to='/request-password' className="label-text font-semibold-alt link link-hover">Forgot password?</Link>
                                </Typography>
                            </div>
                            <div>
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
                            </div>
                        </form>
                        <div>
                            <SocialLogIn></SocialLogIn>
                        </div>
                        <div className="mt-3">
                            <p>New to Stroyka ? <Link className="text-[#CC3333] font-semibold" to="/signUp">Sign in</Link></p>
                            <p className="text-red-600 py-3">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;