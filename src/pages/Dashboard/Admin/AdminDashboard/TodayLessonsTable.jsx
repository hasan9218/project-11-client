import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const TodayLessonsTable = () => {
    const axiosSecure = useAxiosSecure();

    const { data: lessons = [] } = useQuery({
        queryKey: ['todayLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data.result;
        }
    });

    const today = new Date().toISOString().slice(0, 10);

    const todayLessons = lessons.filter(
        l => l.createdAt?.slice(0, 10) === today
    );

    return (
        <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Today's Lessons</h3>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Emotional Tone</th>
                        <th>Privacy</th>
                        <th>Author</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {todayLessons.map(lesson => (
                        <tr key={lesson._id}>
                            <td>{lesson.title}</td>
                            <td>{lesson.category}</td>
                            <td>{lesson.emotionalTone}</td>
                            <td>{lesson.privacy}</td>
                            <td>{lesson.authorName}</td>
                            <td>{lesson.authorEmail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodayLessonsTable;
