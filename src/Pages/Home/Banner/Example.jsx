import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import s1 from '../../../assets/banner/slide-1.jpg';
import s2 from '../../../assets/banner/slide-2.jpg';
import s3 from '../../../assets/banner/slide-3.jpg';

export default function Example() {
    var items = [
        {
            name: "Big choice of ",
            sub_title: "Plumbing products",
            image: s1,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam pharetra laoreet dui quis molestie."
        },
        {
            name: "Screwdrivers ",
            sub_title: "Professional Tools",
            image: s2,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam pharetra laoreet dui quis molestie."
        },
        {
            name: "One more ",
            sub_title: "Unique header",
            image: s3,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam pharetra laoreet dui quis molestie."
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

    return (
        <Paper style={{ position: 'relative', color: 'black' }}>
            <img src={image} alt={name} style={{ width: '100%', height: 'auto' }} />
            <div className="px-32 space-y-2   absolute bottom-52">
                <h1 className="text-3xl">{name}</h1>
                <h1 className="text-3xl">{sub_title}</h1>
                <p className="md:w-2/3">{description}</p>
                <button className="btn bg-[#CC3333] hover:bg-[#CC3333] rounded-sm px-5 py-2 font-semibold text-white">Shop Now</button>
            </div>
        </Paper>
    );
}
