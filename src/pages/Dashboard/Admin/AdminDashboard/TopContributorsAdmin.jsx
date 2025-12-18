import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const TopContributorsAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['topContributors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const topUsers = [...users]
        .sort((a, b) => (b.lessonCount || 0) - (a.lessonCount || 0))
        .slice(0, 3);

    return (
        <div className="bg-white p-5 rounded-lg shadow lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Top Contributors</h3>

            {topUsers.map(user => (
                <div key={user.email} className="flex items-center gap-3 mb-3">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopContributorsAdmin;