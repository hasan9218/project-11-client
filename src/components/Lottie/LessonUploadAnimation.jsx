import React from 'react';
import lessonUploaded from '../../assets/animation/lessonUploaded.json'
import Lottie from "lottie-react"
const LessonUploadAnimation = () => {
    return (
        <div>
            <Lottie animationData={lessonUploaded}></Lottie>
        </div>
    );
};

export default LessonUploadAnimation;