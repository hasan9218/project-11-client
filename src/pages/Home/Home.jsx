import React from 'react';
import Banner from '../../components/Home/Banner';
import WhyLerningFromLifeLesson from '../../components/Home/WhyLerningFromLifeLesson';
import FeaturedLessons from '../../components/Home/FeaturedLessons';
import TopContributors from '../../components/Home/TopContributors';
import MostSavedLessons from '../../components/Home/MostSavedLessons';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedLessons />
            <WhyLerningFromLifeLesson/>
            <TopContributors />
            <div className="mb-10">
                <MostSavedLessons />
            </div>
        </div>
    );
};

export default Home;