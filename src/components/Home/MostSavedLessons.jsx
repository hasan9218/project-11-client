import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../Shared/Container';
import LessonCard from './Lessons/LessonCard';

const MostSavedLessons = () => {

    const { data: lessons = [] } = useQuery({
        queryKey: ['mostSavedLessons'],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/most-saved-lessons`
            );
            return res.data;
        }
    });

    return (
        <Container className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-2">
                ❤️ Most Saved Lessons
            </h2>
            <p className="text-center text-gray-600 mb-8">
                Lessons the community loves the most
            </p>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                {lessons.map(lesson => (
                    <LessonCard key={lesson._id} lesson={lesson} />
                ))}
            </div>
        </Container>
    );
};

export default MostSavedLessons;