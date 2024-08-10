import { Box, Typography, Grid, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy data for the charts
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

const AdminHome = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 2 }}
            >
                <Box>
                    <Typography variant="h5" component="div" gutterBottom>
                        Admin Dashboard
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader title="Total Users" />
                                <Divider />
                                <CardContent>
                                    <Typography variant="h4" color="textPrimary">
                                        1,234
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader title="Total Products" />
                                <Divider />
                                <CardContent>
                                    <Typography variant="h4" color="textPrimary">
                                        567
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader title="Pending Orders" />
                                <Divider />
                                <CardContent>
                                    <Typography variant="h4" color="textPrimary">
                                        89
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Charts */}
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardHeader title="Sales Overview" />
                                <Divider />
                                <CardContent>
                                    <Bar data={data} options={{ responsive: true }} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardHeader title="Recent Activity" />
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        - User John Doe created an order.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        - Product XYZ was updated.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        - New user registered.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminHome;
