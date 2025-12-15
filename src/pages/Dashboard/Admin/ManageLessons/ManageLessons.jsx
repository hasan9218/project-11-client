// pages/Dashboard/Admin/ManageLessons.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
    FaTrash, FaStar, FaCheckCircle, FaEye, FaEyeSlash
} from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import ManageStats from './ManageStats';
import ManageFilter from './ManageFilter';

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterPrivacy, setFilterPrivacy] = useState('all');
    const [showReportedOnly, setShowReportedOnly] = useState(false);

    // all lessons
    const { data: lessons = [], refetch } = useQuery({
        queryKey: ['allLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data;
        }
    });
    // report
    const { data: reports = [] } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reports');
            return res.data;
        }
    });

    // Calculate stats
    const stats = {
        total: lessons.length,
        public: lessons.filter(l => l.privacy === 'public').length,
        private: lessons.filter(l => l.privacy === 'private').length,
        featured: lessons.filter(l => l.isFeatured).length,
        reported: reports.map(r => r.lessonId).length
    };

    // Filter lessons based on selected filters
    const filteredLessons = lessons.filter(lesson => {
        if (filterCategory !== 'all' && lesson.category !== filterCategory) {
            return false;
        }
        if (filterPrivacy !== 'all' && lesson.privacy !== filterPrivacy) {
            return false;
        }
        if (showReportedOnly) {
            const report = reports.find(r => r.lessonId === lesson._id);
            if (!report) return false;
        }
        return true;
    });

    // Handle delete lesson
    const handleDeleteLesson = (lessonId, lessonTitle) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete "${lessonTitle}" permanently?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/my-lesson/${lessonId}`);
                    refetch();
                    Swal.fire('Deleted!', 'Lesson has been removed.', 'success');
                } catch (error) {
                    console.error('Delete error:', error);
                    Swal.fire('Error', 'Failed to delete lesson', 'error');
                }
            }
        });
    };

    // Handle toggle featured
    const handleToggleFeatured = async (lessonId, currentStatus) => {
        try {
            await axiosSecure.patch(`/lesson/${lessonId}/feature`, {
                isFeatured: !currentStatus
            });
            refetch();
            Swal.fire({
                icon: 'success',
                title: currentStatus ? 'Unfeatured!' : 'Featured!',
                text: currentStatus
                    ? 'Lesson removed from featured section'
                    : 'Lesson added to featured section',
                timer: 1500
            });
        } catch (error) {
            console.error('Feature toggle error:', error);
            Swal.fire('Error', 'Failed to update featured status', 'error');
        }
    };

    // Handle mark as reviewed
    const handleMarkReviewed = async (lessonId) => {
        try {
            await axiosSecure.patch(`/lesson/${lessonId}/reviewed`);
            refetch();
            Swal.fire('Reviewed!', 'Lesson marked as reviewed', 'success');
        } catch (error) {
            console.error('Review error:', error);
            Swal.fire('Error', 'Failed to mark as reviewed', 'error');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Lessons</h1>
                <p className="text-gray-600">Review, feature, or remove lessons created by users</p>
            </div>

            {/* Stats Cards */}
            <ManageStats stats={stats}></ManageStats>

            {/* Filter Bar */}
            <ManageFilter
                setShowReportedOnly={setShowReportedOnly}
                setFilterPrivacy={setFilterPrivacy}
                setFilterCategory={setFilterCategory}
                showReportedOnly={showReportedOnly}
                filterPrivacy={filterPrivacy}
                filterCategory={filterCategory}
                stats={stats}
            ></ManageFilter>

            {/* Lessons Table */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Privacy</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLessons.map(lesson => (
                                <tr key={lesson._id} className="hover:bg-gray-50">
                                    <td>
                                        <div className="font-medium max-w-xs truncate">{lesson.title}</div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(lesson.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="avatar">
                                                <div className="w-8 h-8 rounded-full">
                                                    <img src={lesson.authorPhoto} alt={lesson.authorName} />
                                                </div>
                                            </div>
                                            <span className="text-sm">{lesson.authorName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-outline">{lesson.category}</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${lesson.privacy === 'public' ? 'badge-success' : 'badge-info'}`}>
                                            {lesson.privacy === 'public' ? <FaEye className="mr-1" /> : <FaEyeSlash className="mr-1" />}
                                            {lesson.privacy}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${lesson.isFeatured ? 'badge-warning' : 'badge-outline'}`}>
                                            {lesson.isFeatured ? 'Featured' : 'Regular'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            {/* Feature/Unfeature Button */}
                                            <button
                                                onClick={() => handleToggleFeatured(lesson._id, lesson.isFeatured)}
                                                className={`btn btn-xs ${lesson.isFeatured ? 'btn-warning' : 'btn-outline'}`}
                                                title={lesson.isFeatured ? 'Remove from featured' : 'Feature this lesson'}
                                            >
                                                <FaStar className={lesson.isFeatured ? 'fill-white' : ''} />
                                            </button>

                                            {/* Mark as Reviewed Button */}
                                            <button
                                                onClick={() => handleMarkReviewed(lesson._id)}
                                                className="btn btn-xs btn-success"
                                                title="Mark as reviewed"
                                            >
                                                <FaCheckCircle />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteLesson(lesson._id, lesson.title)}
                                                className="btn btn-xs btn-error"
                                                title="Delete lesson"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredLessons.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        No lessons found with current filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageLessons;