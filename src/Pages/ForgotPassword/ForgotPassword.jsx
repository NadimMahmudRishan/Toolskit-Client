import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth();
import { Helmet } from "react-helmet";
import { TextField, Button, Typography } from '@mui/material';


const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        const saveInfo = {
            email: data.email
        }
        try {
            fetch(`https://exe-management-sever-smoky.vercel.app/check-email-existence/${data.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.exists === true) {
                        sendPasswordResetEmail(auth, data.userRecord.email);
                        setSuccessMessage("Please check your email for password reset instructions.");
                    } else {
                        setSuccessMessage(data.message)
                    }
                })
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="lg:hero min-h-screen lg:bg-base-200 pt-20">
            <Helmet>
                <title>{`Reset password - ExeService.Online`}</title>
            </Helmet>
            <div className="lg:hero-content flex-col lg:w-8/12">
                <div className="card flex-shrink-0 w-full lg:max-w-sm lg:shadow-2xl bg-base-100 rounded-none">
                    <div className="card-body">
                        <div>
                            <h1 className="text-3xl lg:font-bold">Forgot password</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-4">
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    {...register("email", { required: true })}
                                    error={!!errors.email}
                                    helperText={errors.email && "Email is required"}
                                />
                            </div>
                            <Typography variant="body2" className="py-5">
                                We’ll send a verification code to this email if it matches an existing account.
                            </Typography>
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
                                    }}>Next</Button>
                            </div>
                        </form>
                        <div className="form-control mt-5 text-center">
                            <Link to='/login'><input className="btn-active btn-link text-[16px] font-semibold" type="submit" value="Back" /></Link>
                        </div>
                        {error && <p className="text-error font-semibold">{error}</p>}
                        {successMessage && <p className="text-success font-semibold">{successMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
