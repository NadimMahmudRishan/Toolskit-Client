import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 my-20">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full rounded-md border-gray-300 focus:border-[#CC3333] focus:ring focus:ring-[#CC3333]"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full rounded-md border-gray-300 focus:border-[#CC3333] focus:ring focus:ring-[#CC3333]"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block font-semibold mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full rounded-md border-gray-300 focus:border-[#CC3333] focus:ring focus:ring-[#CC3333]"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#CC3333] text-white rounded-md py-2 px-4 hover:bg-[#CC3333] transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Contact;
