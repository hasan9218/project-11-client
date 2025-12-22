import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import { FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const RecentLessons = () => {
    const { user } = useAuth();
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/my-lessons/${user?.email}`)
            .then(res => {
                const sorted = res.data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                setLessons(sorted);
            });
    }, [user]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recently Added Lessons</h3>
                <span className="bg-blue-100 text-secondary text-sm font-medium px-3 py-1 rounded-full">
                    {lessons.length} total
                </span>
            </div>

            {lessons.length > 0 ? (
                <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                        <div
                            key={lesson._id}
                            className="group flex items-center gap-4 p-4 hover:bg-teal-50 rounded-xl transition-all duration-200 border border-gray-100 hover:border-teal-200"
                        >
                            <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-teal-100 to-blue-200 flex items-center justify-center text-secondary">
                                    <FaFileAlt className="text-xl" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">
                                        {lesson.title}
                                    </span>
                                    {index === 0 && (
                                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                            Latest
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-gray-400" />
                                        {new Date(lesson.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>

                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${lesson.privacy === 'public'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-purple-100 text-blue-700'
                                        }`}>
                                        {lesson.privacy === 'public' ? 'Public' : 'Private'}
                                    </span>
                                </div>
                            </div>

                            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaFileAlt className="text-2xl text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No lessons added yet</p>
                    <p className="text-gray-400 text-sm mt-1">Start by creating your first lesson</p>
                </div>
            )}

            {lessons.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Showing latest 5 lessons</span>
                        <button className="text-seconsary hover:text-teal-700 font-medium flex items-center gap-1">
                            View all lessons
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default RecentLessons;
