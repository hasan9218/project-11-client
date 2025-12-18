import useAuth from "../../../../hooks/useAuth";

const DashboardBanner = () => {
  const { user } = useAuth();

  return (
    <div className="bg-linear-to-r from-secondary to-teal-600 text-white p-6 rounded-xl">
      <h2 className="text-2xl font-bold">
        Welcome back, {user?.displayName} !!
      </h2>
      <p className="mt-2 text-sm opacity-90">
        Manage your lessons, track your progress, and explore new wisdom from here.
      </p>
    </div>
  );
};

export default DashboardBanner;