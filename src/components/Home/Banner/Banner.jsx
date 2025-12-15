import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../../../assets/banner1.jpg';
import banner2 from '../../../assets/banner2.jpg';
import banner3 from '../../../assets/banner3.jpg';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[400px] md:h-[700px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={banner3}
              alt="banner1"
              className="w-full h-full object-cover"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:px-5">
              <h2 className="text-green-700 text-xl lg:text-7xl md:text-4xl font-semibold mb-5">
                Welcome to Life With WisdomCell
              </h2>
              <p>Learn essential skills for navigating the digital world safely and responsibly. Discover the importance of digital literacy in today's connected society.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-12 py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md transition"
              >
                Start Learning Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={banner2}
              alt="banner2"
              className="w-full h-full object-cover"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:px-5">
              <h2 className="text-green-700 text-xl lg:text-7xl md:text-4xl font-semibold mb-5">
                Digital Society Shield Your Online World
              </h2>
              <p>Understand how to safeguard your personal information, use strong passwords, and recognize phishing attempts to stay secure in the digital age.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-12 py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md transition"
              >
                Secure Your Privacy
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={banner1}
              alt="banner3"
              className="w-full h-full object-cover"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:px-5">
              <h2 className="text-green-700 text-xl lg:text-7xl md:text-4xl font-semibold mb-5">
                Promote Positive Digital Citizenship
              </h2>
              <p>Explore ways to use technology ethically, combat cyberbullying, and contribute positively to online communities for a better digital future.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-12 py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md transition"
              >
                Join the Community
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;