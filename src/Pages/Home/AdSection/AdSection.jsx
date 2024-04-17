import banner from '../../../assets/ad/banner-1.jpg';

const AdSection = () => {
    return (
        <div className="relative my-20">
            <img src={banner} alt="Banner" className="w-full" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <div className="text-center text-black">
                    <h2 className="text-3xl font-bold">HundredsHand Tools</h2>
                    <p className="mt-2">Hammers, Chisels, Universal Pliers, Nippers, Jigsaws, Saws</p>
                    <button className="mt-4 px-6 py-2 bg-[#CC3333] text-white rounded-sm hover:bg-[#CC3333] ">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdSection;
