import { Link } from 'react-router-dom';
import payment from '../../../assets/footer/payments.png'
import { TiWorld } from 'react-icons/ti';
import { CiMail } from 'react-icons/ci';
import { IoPhonePortraitSharp } from 'react-icons/io5';
import { LuClock } from 'react-icons/lu';

const Footer = () => {
    return (
        <div>
            <footer className="grid lg:grid-cols-4 justify-center px-40 py-14 bg-base-200 text-gray-900 border-t-1 border-gray-300">
                <ol className='col-span-2'>
                    <h6 className="text-xl font-bold">Contact Us</h6>
                    <div className='w-4/5'>
                        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem. Pellentque ac placerat tellus.</h1>
                        <ol className='col-span-0  space-y-1 mt-4'>
                            <li className='flex items-center gap-2'><TiWorld />
                                YKSG-2, Ashulia, Shavar, Dhaka</li>
                            <li className='flex items-center gap-2'><CiMail /> rishan35-952@diu.edu.bd</li>
                            <li className='flex items-center gap-2'> <IoPhonePortraitSharp />(800) 060-0730, (800) 060-0730</li>
                            <li className='flex items-center gap-2'><LuClock />Mon-Sat 10:00pm - 7:00pm</li>
                        </ol>
                    </div>
                </ol>
                <div className='lg:flex gap-16'>
                    <ol className='col-span-0  space-y-2'>
                        <h6 className="text-xl font-bold">Company</h6>
                        <li><Link className=" hover:text-[#CC3333]">About</Link></li>
                        <li><Link className=" hover:text-[#CC3333]">Contact</Link></li>
                        <li><Link className=" hover:text-[#CC3333]">Blog</Link></li>
                    </ol>
                    <ol className='col-span-0  space-y-2 my-5 lg:my-0'>
                        <h6 className="text-xl font-bold">Legal</h6>
                        <li><Link className=" hover:text-[#CC3333]">Terms of use</Link></li>
                        <li><Link className=" hover:text-[#CC3333]">Privacy policy</Link></li>
                        <li><Link className=" hover:text-[#CC3333]">Cookie policy</Link></li>
                        <li><Link className=" hover:text-[#CC3333]">Advertisement</Link></li>
                    </ol>
                    <div className='col-span-0  space-y-2'>
                        <form>
                            <h6 className="text-xl font-bold">Newsletter</h6>
                            <fieldset className="form-control w-80">
                                <label className="label">
                                    <span className="label-text">Enter your email address</span>
                                </label>
                                <div className="join">
                                    <input type="text" placeholder="username@site.com" className="input input-bordered join-item rounded-none" />
                                    <button className="btn join-item rounded-none text-white bg-[#CC3333] hover:bg-[#CC3333]">Subscribe</button>
                                </div>
                            </fieldset>
                        </form>
                        <div className="mt-4">
                            <h1 className='mt-6'>Follow us on social networks</h1>
                            <div className="flex gap-4 mt-4">
                                <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></Link>
                                <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></Link>
                                <Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="lg:flex justify-between items-center lg:px-40 px-10 py-4 border-t-2 border-gray-300 bg-base-200 text-base-content">
                <aside className="items-center grid-flow-col">
                    <p>STROYKA Industries Ltd. <br />Providing reliable tech since 2023</p>
                </aside>
                <div className='mt-4 lg:mt-0'>
                    <img src={payment} alt="Accepted payments" />
                </div>
            </footer>
        </div>
    );
};

export default Footer;