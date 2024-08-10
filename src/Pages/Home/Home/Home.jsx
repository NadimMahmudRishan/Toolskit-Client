import { Container } from "@mui/material";
import AdSection from "../AdSection/AdSection";
import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Categorie from "../Categorie/Categorie";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import LatestNews from "../LatestNews/LatestNews";
import Offer from "../Offer/Offer";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Container>
                <Offer></Offer>
                <FeaturedProducts></FeaturedProducts>
                <AdSection></AdSection>
                <Categorie></Categorie>
                <LatestNews></LatestNews>
                <Brands></Brands>
            </Container>
        </div>
    );
};

export default Home;