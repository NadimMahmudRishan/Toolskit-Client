import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import c1 from '../../../assets/category/category-1.jpg';
import c2 from '../../../assets/category/category-2.jpg';
import c3 from '../../../assets/category/category-3.jpg';
import c4 from '../../../assets/category/category-4.jpg';
import c5 from '../../../assets/category/category-5.jpg';
import c6 from '../../../assets/category/category-6.jpg';

const Categorie = () => {
    return (
        <div className='my-20'>
            <div className='flex'>
                <h1 className='text-xl font-bold py-5'>Popular Categories</h1>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', width: 420 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={c1}
                            alt="Category 1"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Power Tools
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Screwdrivers <br />
                                    Milling Cutters <br />
                                    Sanding Machines <br />
                                    Wrenches <br />
                                    Drills
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', width: 420 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={c2}
                            alt="Category 2"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Hand Tools
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Screwdrivers <br />
                                    Hammers <br />
                                    Spanners <br />
                                    Handsaws <br />
                                    Paint Tools <br />
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', width: 420 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={c4}
                            alt="Category 3"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Machine Tools
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Lathes <br />
                                    Milling Machines <br />
                                    Grinding Machines <br />
                                    CNC Machines <br />
                                    Sharpening Machines <br />
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', width: 420 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={c3}
                            alt="Category 3"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Power Machinery
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Generators <br />
                                    Compressors <br />
                                    Winches <br />
                                    Plasma Cutting <br />
                                    Electric Motors <br />
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', width: 420 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={c5}
                            alt="Category 3"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Measurement
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Tape Measure <br />
                                    Theodolites <br />
                                    Thermal Imagers <br />
                                    Calipers <br />
                                    Levels <br />
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', width: 420 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={c6}
                            alt="Category 3"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    Clothes and PPE
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Winter Workwear <br />
                                    Summer Workwear <br />
                                    Helmets <br />
                                    Belts and Bags <br />
                                    Work Shoes <br />
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Categorie;
