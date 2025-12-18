import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: lessons = [] } = useQuery({
        queryKey: ['lessonGrowth'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data.result;
        }
    });

    const chartData = lessons.reduce((acc, lesson) => {
        const date = lesson.createdAt?.slice(0, 10);
        const found = acc.find(d => d.date === date);

        if (found) {
            found.count += 1;
        } else {
            acc.push({ date, count: 1 });
        }
        return acc;
    }, []);

    return (
        <div className="bg-white p-5 rounded-lg shadow lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Lesson Growth</h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminChart;