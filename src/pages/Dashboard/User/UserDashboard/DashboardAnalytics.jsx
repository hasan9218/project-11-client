import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Aug', lessons: 1 },
  { month: 'Sep', lessons: 3 },
  { month: 'Oct', lessons: 2 },
  { month: 'Nov', lessons: 4 },
  { month: 'Dec', lessons: 5 },
];

const DashboardAnalytics = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Your Contribution Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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