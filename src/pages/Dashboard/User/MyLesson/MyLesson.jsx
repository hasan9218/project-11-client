import React from 'react';
import Swal from "sweetalert2";
import UpdateLesson from '../UpdateLesson/UpdateLesson';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import axios from 'axios';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';
import { Link } from 'react-router';

const MyLesson = () => {
    const { user } = useAuth();
    const { userData } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ['lessons', user.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-lessons/${user?.email}`)
            return result.data;
        }
    });

    const handleTogglePrivacy = (id, currentPrivacy) => {
        const newPrivacy = currentPrivacy === "public" ? "private" : "public";
        axiosSecure.patch(`/lesson/${id}/privacy`, { privacy: newPrivacy })
            .then(() => {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: `Lesson is now ${newPrivacy}`,
                    timer: 1200,
                    showConfirmButton: false
                });
            });
    };

    const handleToggleAccess = (id, currentAccess) => {
        if (!userData?.isPremium) return;
        const newAccess = currentAccess === "free" ? "premium" : "free";
        axiosSecure.patch(`/lesson/${id}/access`, { accessLevel: newAccess })
            .then(() => {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: `Access set to ${newAccess}`,
                    timer: 1200,
                    showConfirmButton: false
                });
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This lesson will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/my-lesson/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your lesson has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="p-4 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold mb-4">My Lessons</h2>

            {/* Desktop / Tablet Table */}
            <div className="hidden md:block p-4 bg-white rounded-xl shadow">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Privacy</th>
                                <th>Access</th>
                                <th>Likes</th>
                                <th>Favorites</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson, idx) => (
                                <tr key={lesson._id}>
                                    <th>{idx + 1}</th>
                                    <td>{lesson.title}</td>
                                    <td>{lesson.category}</td>
                                    <td>
                                        <button className="btn btn-xs md:btn-sm"
                                            onClick={() => handleTogglePrivacy(lesson._id, lesson.privacy)}>
                                            {lesson.privacy}
                                        </button>
                                    </td>
                                    <td className="flex flex-col gap-1">
                                        <button className="btn btn-xs md:btn-sm"
                                            disabled={!userData?.isPremium}
                                            onClick={() => handleToggleAccess(lesson._id, lesson.accessLevel)}>
                                            {lesson.accessLevel}
                                        </button>
                                        {!userData?.isPremium && <span className="text-xs text-warning">Premium only</span>}
                                    </td>
                                    <td>{lesson.likesCount}</td>
                                    <td>{lesson.favoritesCount}</td>
                                    <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                                    <td className="flex flex-wrap gap-2">
                                        <Link className="btn btn-xs bg-secondary text-white"
                                            to={`/lesson-details/${lesson._id}`}>Details</Link>
                                        <UpdateLesson lesson={lesson} refetch={refetch} />
                                        <button className="btn btn-xs btn-error text-white"
                                            onClick={() => handleDelete(lesson._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card Layout */}
            <div className="block md:hidden space-y-4">
                {lessons.map((lesson) => (
                    <div key={lesson._id} className="p-4 bg-white rounded-xl shadow flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">{lesson.title}</h3>
                            <span className="text-sm text-gray-500">{new Date(lesson.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm">
                            <span className="badge badge-outline">{lesson.category}</span>
                            <button className="btn btn-xs" onClick={() => handleTogglePrivacy(lesson._id, lesson.privacy)}>
                                {lesson.privacy}
                            </button>
                            <button className="btn btn-xs" disabled={!userData?.isPremium}
                                onClick={() => handleToggleAccess(lesson._id, lesson.accessLevel)}>
                                {lesson.accessLevel}
                            </button>
                            {!userData?.isPremium && <span className="text-xs text-warning">Premium only</span>}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-2 text-sm">
                                <span>Likes: {lesson.likesCount}</span>
                                <span>Favorites: {lesson.favoritesCount}</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Link className="btn btn-xs bg-secondary text-white" to={`/lesson-details/${lesson._id}`}>Details</Link>
                                <UpdateLesson lesson={lesson} refetch={refetch} />
                                <button className="btn btn-xs btn-error text-white" onClick={() => handleDelete(lesson._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyLesson;
