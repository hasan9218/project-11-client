import React from 'react';
import lessonUploaded from '../../assets/animation/lessonUploaded.json';
import Lottie from "lottie-react";

const LessonUploadAnimation = () => {
    return (
        <div className='flex flex-col items-center justify-center p-8 bg-white rounded-2xl'>
            <div className="w-48 h-48 mb-6">
                <Lottie
                    animationData={lessonUploaded}
                    loop={false}
                    autoplay={true}
                />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                Your lesson has been added!
            </h1>
            <p className="text-gray-600 text-center">
                Successfully posted to the platform
            </p>
        </div>
    );
};

export default LessonUploadAnimation;