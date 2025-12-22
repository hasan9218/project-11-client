import React from 'react';
import { FaEye, FaEyeSlash, FaFlag } from 'react-icons/fa';

const ManageStats = ({stats}) => {
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="stat bg-green-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm font-bold ">
                    <FaEye size={30} color='green'/>
                    Public Lessons
                </div>
                <div className="stat-value text-2xl text-green-600">{stats?.public || 0}</div>
            </div>
            <div className="stat bg-blue-100 shadow rounded-lg p-4">
                <div className="stat-title text-sm font-bold ">
                    <FaEyeSlash  size={30} color='blue'/>
                    Private Lessons
                </div>
                <div className="stat-value text-2xl text-blue-600">{stats?.private || 0}</div>
            </div>
            <div className="stat bg-red-100 shadow rounded-lg p-4 ">
                <div className="stat-title text-sm font-bold">
                    <FaFlag size={30} color='red' />
                    Reported Lessons
                </div>
                <div className="stat-value text-2xl text-red-600">{stats?.reported || 0}</div>
            </div>
        </div>
    );
};

export default ManageStats;