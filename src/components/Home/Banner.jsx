import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'

const Banner = () => {
    return (
        <div className="w-11/12 mx-auto px-10 pb-10 rounded-lg ">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
            >

                <SwiperSlide>
                    <div
                        className='rounded-2xl overflow-hidden shadow-2xl p-6 bg-blue-500/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px]' >

                        <div className="md:order-1 order-2 p-4">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">Organize Lessons by How They Made You Feel</h2>
                            <p className="text-xl mb-6">Tag lessons as Motivational, Reflective, Sad, Gratitude, or Realization. Find exactly what you need based on emotional resonance.</p>

                            <Link to='/add-lesson' className="btn bg-secondary hover:bg-teal-600 text-white border-0 px-8">Share your thoughts</Link>
                        </div>

                        <div className="md:order-2 order-1 flex justify-center items-center">
                            <img
                                src={banner1}
                                alt='Global Sourcing'
                                className="w-full h-80 object-cover rounded-xl shadow-2xl transform transition duration-500"
                            />
                        </div>

                    </div>

                </SwiperSlide>
                {/* 2nd slide */}
                <SwiperSlide>

                    <div
                        className='rounded-2xl overflow-hidden shadow-2xl p-6 bg-green-500/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px]' >

                        <div className="md:order-1 order-2 p-4">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">Capture Insights Anytime, Anywhere</h2>
                            <p className="text-xl  mb-6">Mobile-optimized for those sudden moments of clarity. Add lessons from your commute, travels, or quiet moments.</p>

                            <Link to='/' className="btn bg-secondary hover:bg-teal-600 text-white border-0 px-8">Explore WisdomVault</Link>
                        </div>

                        <div className="md:order-2 order-1 flex justify-center items-center">
                            <img
                                src={banner2}
                                alt='Manage Your Exports'
                                className="w-full h-80 object-cover rounded-xl shadow-2xl transform transition duration-500 "
                            />
                        </div>

                    </div>

                </SwiperSlide>
                {/* 3rd slide */}
                <SwiperSlide>

                    <div
                        className='rounded-2xl overflow-hidden shadow-2xl p-6 bg-purple-500/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px]' >

                        <div className="md:order-1 order-2 p-4">
                            <h2 className="text-2xl lg:text-3xl font-bold  mb-3 leading-tight">Join 10,000+ Members Preserving Their Wisdom</h2>
                            <p className="text-xl mb-6">Real stories from our community. See how documenting lessons leads to personal breakthroughs.</p>

                            <Link to='/auth/login' className="btn bg-secondary hover:bg-teal-600 text-white border-0 px-8">Join Us</Link>
                        </div>

                        <div className="md:order-2 order-1 flex justify-center items-center">
                            <img
                                src={banner3}
                                alt='Secure Trade'
                                className="w-full h-80 object-cover rounded-xl shadow-2xl transform transition duration-500 "
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;