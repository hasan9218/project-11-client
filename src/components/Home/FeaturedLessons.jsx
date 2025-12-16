import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { FaStar, FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LessonCard from './Lessons/LessonCard';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const FeaturedLessons = () => {
    const axiosSecure = useAxiosSecure();

    const { data: featuredLessons = [], isLoading } = useQuery({
        queryKey: ['featuredLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons/featured');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <section className="py-12 bg-secondary">
            <div className="mx-auto px-4 container">
                {/* Section Header */}
                <div className="text-center mb-10 ">
                    <h2 className="text-3xl font-bold text-white">
                        Featured Life Lessons
                    </h2>
                    <p className="text-gray-700">
                        Handpicked wisdom from our community
                    </p>
                </div>

                {/* Featured Lessons Grid */}
                {featuredLessons.length > 0 ? (
                    <>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            spaceBetween={30}
                            slidesPerView={3}
                            coverflowEffect={{
                                rotate: 30,
                                stretch: '40%',
                                depth: 200,
                                modifier: 1,
                                scale: 0.75,
                                slideShadows: true,
                            }}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false
                            }}
                            modules={[EffectCoverflow, Autoplay]}
                            className="mySwiper"
                        >

                        {/* my opinion */}
                            {
                                Array.isArray(featuredLessons) &&
                                featuredLessons.map((lesson) => (
                                    <SwiperSlide key={lesson._id}>
                                        <LessonCard lesson={lesson} />
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    </>
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <FaStar className="text-5xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No Featured Lessons Yet
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Admin will feature exceptional lessons here. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedLessons;