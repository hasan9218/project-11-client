import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';


const DashboardAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: lessons = [] } = useQuery({
    queryKey: ['user-lesson-analytics', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user.email}`);
      return res.data;
    }
  });

  // group lessons by month
  const chartData = lessons.reduce((acc, lesson) => {
    if (!lesson.createdAt) return acc;

    const date = new Date(lesson.createdAt);
    const month = date.toLocaleString('default', { month: 'short' });

    const found = acc.find(item => item.month === month);

    if (found) {
      found.lessons += 1;
    } else {
      acc.push({ month, lessons: 1 });
    }

    return acc;
  }, []);
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Your Contribution Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="lessons"
            stroke="#14b8a6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardAnalytics;