const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center mx-auto py-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] font-bold">{heading}</h2>
            <p className="text-[#34495E] mt-2">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;
