import Carousel from 'react-material-ui-carousel';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import s1 from '../../../assets/banner/slide-1.jpg';
import s2 from '../../../assets/banner/slide-2.jpg';
import s3 from '../../../assets/banner/slide-3.jpg';

export default function Example() {
    const items = [
        {
            name: "Big choice of ",
            sub_title: "Plumbing products",
            image: s1,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra laoreet dui quis molestie."
        },
        {
            name: "Screwdrivers ",
            sub_title: "Professional Tools",
            image: s2,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra laoreet dui quis molestie."
        },
        {
            name: "One more ",
            sub_title: "Unique header",
            image: s3,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra laoreet dui quis molestie."
        }
    ];

    return (
        <Carousel>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    const { name, sub_title, image, description } = props.item;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                position: 'relative',
                color: 'black',
                marginTop: '5px'
            }}
        >
            <img
                src={image}
                alt={name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '52px',
                    px: 5,
                    py: 2,
                    color: 'black'
                }}
            >
                <Typography variant={isMobile ? "h6" : "h4"} sx={{ fontWeight: 'bold' }}>
                    {name}
                </Typography>
                {!isMobile && (
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {sub_title}
                        </Typography>
                        <Typography sx={{ maxWidth: '66%', mt: 2 }}>
                            {description}
                        </Typography>
                    </Box>

                )}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#CC3333',
                        '&:hover': {
                            backgroundColor: '#CC3333',
                        },
                        borderRadius: '4px',
                        mt: 2
                    }}
                >
                    Shop Now
                </Button>
            </Box>

        </Box>
    );
}
