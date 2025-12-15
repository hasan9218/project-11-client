import React from 'react';
import Banner from '../../components/Home/Banner';
import WhyLerningFromLifeLesson from '../../components/Home/WhyLerningFromLifeLesson';
import FeaturedLessons from '../../components/Home/FeaturedLessons';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedLessons />
            <WhyLerningFromLifeLesson/>
        </div>
    );
};

export default Home;