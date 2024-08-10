import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import p1 from '../../../assets/Slider/post-1.jpg';
import p2 from '../../../assets/Slider/post-2.jpg';
import p3 from '../../../assets/Slider/post-3.jpg';
import p4 from '../../../assets/Slider/post-4.jpg';
import p5 from '../../../assets/Slider/post-5.jpg';
import p7 from '../../../assets/Slider/post-7.jpg';
import p8 from '../../../assets/Slider/post-8.jpg';
import p9 from '../../../assets/Slider/post-9.jpg';
import p10 from '../../../assets/Slider/post-10.jpg';

const LatestNews = () => {

    return (
        <div>
            <div className='flex'>
                <h1 className='text-xl font-bold pb-5'>Latest News</h1>
            </div>
            <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlaySpeed={3000}
                centerMode={false}
                containerClass="container-padding-bottom"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 2,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                autoPlay={true}
            >
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p1} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p2} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p3} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p4} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p5} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p7} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p8} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p9} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
                <div className="card lg:card-side bg-base-100 rounded-none border p-3 mx-2">
                    <figure><img src={p10} alt="Movie" /></figure>
                    <div className="px-3 pt-4 lg:pt-0">
                        <h2 className="card-title">A Digital Circuit Is Typically
                            Constructed From Small Electronic!</h2>
                        <span>February 10, 2019</span>
                        <p className='text-sm'>
                            In one general sense, philosophy is
                            associated with wisdom, intellectual
                            culture and a search for knowledge. In
                        </p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default LatestNews;
