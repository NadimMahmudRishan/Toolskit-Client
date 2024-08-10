import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FeaturedProducts from "../Home/FeaturedProducts/FeaturedProducts";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Container } from "@mui/material";


const Details = () => {
    const data = useLoaderData();
    const { product_name, price, description, specification, stock_status } = data;

    return (
        <div>
            <SectionTitle heading='Details' subHeading='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.'></SectionTitle>
            <Container>
                <div className="p-0">
                    <div className='grid lg:grid-cols-2'>
                        <div className='flex' style={{ width: '100%', height: 'auto' }}>
                            <Carousel className='w-[250px] lg:w-10/12  mx-auto mt-8'>
                                {data.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} className="w-96" alt={`Product Image ${index}`} />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="p-4 mt-8">
                            <div className="mb-8">
                                <p className="uppercase font-semibold text-[13px]">HOME - PRODUCTS - <span>{product_name}</span></p>
                            </div>
                            <h1 className="font-bold text-4xl">{product_name}</h1>
                            <h2 className='py-3 text-base-400 text-xl'>${price}.00</h2>
                            <p>Availability: <span className="text-green-600">{stock_status}</span></p>
                            <p dangerouslySetInnerHTML={{ __html: description }} className="item-description py-4 text-[#7D7D7D]"></p>
                            <p dangerouslySetInnerHTML={{ __html: specification }} className="item-description py-4 text-[#7D7D7D]"></p>
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <FeaturedProducts></FeaturedProducts>
                </div>
            </Container>
        </div >
    );
};

export default Details;