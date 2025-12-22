import AdminBanner from './AdminBanner';
import AdminStats from './AdminStats';
import TodayLessonsTable from './TodayLessonsTable';
import AdminChart from './AdminChart';
import TopContributorsAdmin from './TopContributorsAdmin';

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <AdminBanner />

            <AdminStats />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AdminChart />
                <TopContributorsAdmin />
            </div>

            <div className="mb-10">
                <TodayLessonsTable />
            </div>
        </div>
    );
};

export default AdminDashboard;
