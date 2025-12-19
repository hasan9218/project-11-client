import React from 'react';
import UserDashboard from '../User/UserDashboard/UserDashboard';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
import useRole from '../../../hooks/useRole';
const DashboardHome = () => {
    const {userData}=useRole();
    return (
        <div>
             {
                userData?.role==='user' && <UserDashboard></UserDashboard>
            }
            {
                userData?.role==="admin" && <AdminDashboard/>
            } 
        </div>
    );
};

export default DashboardHome;