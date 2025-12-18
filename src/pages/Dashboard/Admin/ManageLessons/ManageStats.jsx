import React from 'react';

const ManageStats = ({stats}) => {
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm">Total Lessons</div>
                {/* <div className="stat-value text-2xl">{stats.total}</div> */}
            </div>
            <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm">Public</div>
                <div className="stat-value text-2xl text-green-600">{stats?.public}</div>
            </div>
            <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm">Private</div>
                <div className="stat-value text-2xl text-blue-600">{stats?.private}</div>
            </div>
            <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm">Featured</div>
                <div className="stat-value text-2xl text-yellow-600">{stats?.featured}</div>
            </div>
            <div className="stat bg-base-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm">Reported</div>
                <div className="stat-value text-2xl text-red-600">{stats?.reported}</div>
            </div>
        </div>
    );
};

export default ManageStats;