import p1 from '../../assets/Slider/post-1.jpg';
import p2 from '../../assets/Slider/post-2.jpg';
import p3 from '../../assets/Slider/post-3.jpg';
import p4 from '../../assets/Slider/post-4.jpg';
import p5 from '../../assets/Slider/post-5.jpg';
import p7 from '../../assets/Slider/post-7.jpg';
import p8 from '../../assets/Slider/post-8.jpg';
import p9 from '../../assets/Slider/post-9.jpg';
import p10 from '../../assets/Slider/post-10.jpg';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Container } from '@mui/material';

const posts = [
    {
        id: 1,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p1,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p2,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p3,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p2,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p4,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p2,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p5,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p7,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p8,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p9,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },
    {
        id: 2,
        title: "A Digital Circuit Is Typically Constructed From Small Electronic!",
        date: "February 10, 2019",
        image: p10,
        content: "In one general sense, philosophy is associated with wisdom, intellectual culture and a search for knowledge. In",
    },

];

const Blog = () => {
    return (
        <div>
            <SectionTitle heading='Blog' subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.'></SectionTitle>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    {posts.map(post => (
                        <div key={post.id} className="card bg-base-100 rounded-none shadow-lg">
                            <figure><img src={post.image} alt="Post" /></figure>
                            <div className="p-2 border">
                                <h2 className="card-title py-2">{post.title}</h2>
                                <span>{post.date}</span>
                                <p>{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Blog;
