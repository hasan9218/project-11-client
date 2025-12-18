import React from 'react';
import UserDashboard from '../User/UserDashboard/UserDashboard';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
const DashboardHome = () => {
    return (
        <div>
            {/* <UserDashboard></UserDashboard> */}
            <AdminDashboard/>
        </div>
    );
};

export default DashboardHome;