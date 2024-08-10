import { Box, Typography } from '@mui/material';

const DashboardTitle = ({ heading, subHeading, route }) => {
    return (
        <Box
            sx={{
                bgcolor: 'white',
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', lg: 'space-between' },
                textAlign: { xs: 'center', lg: 'left' },
                px: { xs: 2, lg: 24 },
                boxShadow: 3, // You can adjust the shadow depth as needed
            }}
        >
            <Typography
                variant="h6"
                component="h1"
                sx={{
                    fontWeight: 'bold',
                    borderBottom: 3,
                    borderColor: '#CC3333',
                    fontSize: { xs: '1.25rem', lg: '1.5rem' },
                }}
            >
                {heading}
            </Typography>
            <Typography
                variant="body1"
                component="h1"
                sx={{
                    fontWeight: 'semiBold',
                    display: { xs: 'none', lg: 'block' },
                    fontSize: '0.875rem',
                }}
            >
                {route} | {subHeading}
            </Typography>
        </Box>
    );
};

export default DashboardTitle;
