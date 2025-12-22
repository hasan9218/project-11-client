import DashboardBanner from './DashboardBanner';
import DashboardStats from './DashboardStats';
import RecentLessons from './RecentLessons';
import QuickShortcuts from './QuickShortcuts';
import DashboardAnalytics from './DashboardAnalytics';

const UserDashboard = () => {
  return (
    <div className="p-6 space-y-10">

      <DashboardBanner />

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentLessons />
        <QuickShortcuts />
      </div>

      <DashboardAnalytics />

    </div>
  );
};

export default UserDashboard;
