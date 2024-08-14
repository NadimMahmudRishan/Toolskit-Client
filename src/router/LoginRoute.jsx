import { Box, LinearProgress } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Box sx={{ width: '100%' }}>
            <LinearProgress color="error" />
        </Box>
    }
    if (user) {
        return <Navigate to='/' state={{ from: location }} replace />;
    }
    return children;
};

export default LoginRoute;