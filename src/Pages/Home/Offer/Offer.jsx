import o1 from '../../../assets/offers/customer-service.png'
import o2 from '../../../assets/offers/delivery-truck.png'
import o3 from '../../../assets/offers/healthcare.png'
import o4 from '../../../assets/offers/hot-item.png'

const Offer = () => {
    return (
        <div className='my-10 lg:flex w-full items-center justify-center'>
            <div className='flex items-center gap-4 border-[1px] border-gray-300 py-6 w-full px-10'>
                <img className='w-10' src={o1} alt="" />
                <div>
                    <h1 className='text-[16px] font-bold'>Free Shipping</h1>
                    <p className='text-[#3D464D]'>For orders from $50</p>
                </div>
            </div>
            <div className='flex items-center gap-4 border-[1px] border-gray-300 py-6 w-full px-10'>
                <img className='w-10' src={o2} alt="" />
                <div>
                    <h1 className='text-[16px] font-bold'>Fast Delivery</h1>
                    <p className='text-[#3D464D]'>Within 2-3 days</p>
                </div>
            </div>
            <div className='flex items-center gap-4 border-[1px] border-gray-300 py-6 w-full px-10'>
                <img className='w-10' src={o3} alt="" />
                <div>
                    <h1 className='text-[16px] font-bold'>Healthcare Products</h1>
                    <p className='text-[#3D464D]'>Top quality</p>
                </div>
            </div>
            <div className='flex items-center gap-4 border-[1px] border-gray-300 py-6 w-full px-10'>
                <img className='w-10' src={o4} alt="" />
                <div>
                    <h1 className='text-[16px] font-bold'>Hot Items</h1>
                    <p className='text-[#3D464D]'>Limited stock</p>
                </div>
            </div>
        </div>
    );
};

export default Offer;
