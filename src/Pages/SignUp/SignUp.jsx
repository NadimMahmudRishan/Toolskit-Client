import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { TextField, Button, Typography, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Constants
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_ERROR_MESSAGES = {
    length: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    capitalLetter: "Password must contain at least one capital letter",
    specialChar: "Password must contain at least one special character",
    passwordMismatch: "Passwords do not match",
};

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault();
    }, []);

    const validatePassword = (value) => {
        if (value.length < PASSWORD_MIN_LENGTH) return PASSWORD_ERROR_MESSAGES.length;
        if (!/[A-Z]/.test(value)) return PASSWORD_ERROR_MESSAGES.capitalLetter;
        if (!/[!@#$%^&*()]/.test(value)) return PASSWORD_ERROR_MESSAGES.specialChar;
        return true;
    };

    const onSubmit = async (data) => {
        const passwordValidation = validatePassword(data.password);
        if (passwordValidation === true) {
            if (data.password === data.confirmPassword) {
                try {
                    await fetch('https://toolskit-mongoose-server.vercel.app/api/users/create', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            displayName: data.name,
                            email: data.email,
                            password: data.password,
                            role: 'user'
                        }),
                    });

                    navigate(from, { replace: true });
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User created successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    console.error(error);
                    setError("An error occurred, please try again.");
                }
            } else {
                setError(PASSWORD_ERROR_MESSAGES.passwordMismatch);
            }
        } else {
            setError(passwordValidation);
        }
    };

    return (
        <div className="lg:hero min-h-screen lg:bg-base-100 pb-20">
            <div className="lg:hero-content">
                <div className="card lg:w-[500px] flex-shrink-0 max-w-xl lg:shadow-2xl rounded-sm bg-base-100">
                    <div className="card-body">
                        <Typography variant="h5">Register Now</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-3">
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    {...register("name", { required: true })}
                                    error={!!errors.name}
                                    helperText={errors.name && "This field is required"}
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
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
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
                                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="confirm-password"
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
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                        <div className="mt-3">
                            <p>Already have an account? <Link className="text-[#CC3333] font-semibold" to="/login">Login</Link></p>
                            {error && <p className="text-red-600 py-3">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
