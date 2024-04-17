import b1 from '../../../assets/ad/logo-1.png';
import b2 from '../../../assets/ad/logo-2.png';
import b3 from '../../../assets/ad/logo-3.png';
import b4 from '../../../assets/ad/logo-4.png';
import b5 from '../../../assets/ad/logo-5.png';
import b6 from '../../../assets/ad/logo-6.png';

const Brands = () => {
    return (
        <div className='my-10 lg:flex gap-5 w-full items-center justify-center border-[1px] border-gray-300 p-6'>
            <div className="m-2"><img src={b1} alt="Brand 1" /></div>
            <div className="m-2"><img src={b2} alt="Brand 2" /></div>
            <div className="m-2"><img src={b3} alt="Brand 3" /></div>
            <div className="m-2"><img src={b4} alt="Brand 4" /></div>
            <div className="m-2"><img src={b5} alt="Brand 5" /></div>
            <div className="m-2"><img src={b6} alt="Brand 6" /></div>
        </div>
    );
};

export default Brands;
