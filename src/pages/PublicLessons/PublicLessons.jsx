import React from 'react';
import Lessons from '../../components/Home/Lessons/Lessons';
import Container from '../../components/Shared/Container';

const PublicLessons = () => {
    return (
        <Container>
            <h2>Public Lessons</h2>
            <div className="py-10">
                <Lessons></Lessons>
            </div>
        </Container>
    );
};

export default PublicLessons;