import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaBookOpen, FaFlag } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: lessons = [] } = useQuery({
        queryKey: ['adminLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data.result;
        }
    });

    const { data: reports = [] } = useQuery({
        queryKey: ['adminReports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reports');
            return res.data;
        }
    });

    const publicLessons = lessons.filter(l => l.privacy === 'public');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-5 rounded-lg flex items-center gap-4">
                <FaUsers size={30} />
                <div>
                    <p className="text-sm">Total Users</p>
                    <h3 className="text-xl font-bold">{users.length}</h3>
                </div>
            </div>

            <div className="bg-green-100 p-5 rounded-lg flex items-center gap-4">
                <FaBookOpen size={30} />
                <div>
                    <p className="text-sm">Public Lessons</p>
                    <h3 className="text-xl font-bold">{publicLessons.length}</h3>
                </div>
            </div>

            <div className="bg-red-100 p-5 rounded-lg flex items-center gap-4">
                <FaFlag size={30} />
                <div>
                    <p className="text-sm">Reported Lessons</p>
                    <h3 className="text-xl font-bold">{reports.length}</h3>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
