import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { TextField, Button, Typography, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();

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

    const validatePassword = (value) => {
        // Check for password length
        if (value.length < 6) {
            return "Password must be at least 6 characters long";
        }

        // Check for capital letter
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one capital letter";
        }

        // Check for special character
        if (!/[!@#$%^&*()]/.test(value)) {
            return "Password must contain at least one special character";
        }

        return true;
    };
    const onSubmit = (data) => {
        const passwordValidation = validatePassword(data.password);

        if (passwordValidation === true) {
            if (data.password === data.confirmPassword) {
                createUser(data.email, data.password)
                    .then((result) => {
                        const newUser = result.user;
                        console.log(newUser);
                        updateUserProfile(data.name, data.photoURL)
                            .then(() => {
                                const saveUser = { displayName: data.name, email: data.email };
                                fetch('https://exe-management-sever-smoky.vercel.app/users', {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json",
                                    },
                                    body: JSON.stringify(saveUser),
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if (data.insertedId) {
                                            navigate(from, { replace: true });
                                            reset();
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: "User created successfully.",
                                                showConfirmButton: false,
                                                timer: 1500,
                                            });

                                        }
                                    })
                                    .catch((error) => console.log(error));
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            } else {
                setError("Password didn't match, please try again.");
            }
        } else {
            setError(passwordValidation);
        }
    };

    return (
        <div>
            <Helmet>
                <title>{`Register - ExeService.Online`}</title>
            </Helmet>
            <div className="lg:hero  min-h-screen lg:bg-base-100 pb-20">
                <div className="lg:hero-content">
                    <div className="card lg:w-[500px] flex-shrink-0 max-w-xl lg:shadow-2xl rounded-sm bg-base-100">
                        <div className="card-body">
                            <h1 className="text-3xl">Register Now</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="pt-3">
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        {...register("name", { required: true })}
                                        error={!!errors.name}
                                        helperText={errors.name && "This field is required"}
                                    />
                                </div>
                                <div className="my-4">
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
                                <div>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...register("password", { required: true })}
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
                                        {errors.password && <Typography variant="body2" color="error">This field is required</Typography>}
                                    </FormControl>
                                </div>
                                <div className="my-4">
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...register("confirmPassword", { required: true })}
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
                                            label="Confirm Password"
                                        />
                                        {errors.confirmPassword && <Typography variant="body2" color="error">This field is required</Typography>}
                                    </FormControl>
                                </div>
                                <div>
                                    <Button fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{
                                            bgcolor: "#CC3333",
                                            '&:hover': {
                                                bgcolor: "#CC3333"
                                            }
                                        }}>Sign up</Button>
                                </div>
                            </form>
                            <div className="mt-3">
                                <p>Already have an account ? <Link className="text-[#CC3333] font-semibold" to="/login">login</Link></p>
                                <p className="text-red-600 py-3">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;