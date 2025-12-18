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
    // get my all lessons from the db
    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ['lessons', user.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-lessons/${user?.email}`)
            return result.data;
        }
    })
    // privacy toggle
    const handleTogglePrivacy = (id, currentPrivacy) => {
        const newPrivacy = currentPrivacy === "public" ? "private" : "public";

        axiosSecure.patch(`/lesson/${id}/privacy`, {
            privacy: newPrivacy
        })
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

    // access toggle
    const handleToggleAccess = (id, currentAccess) => {
        if (!userData?.isPremium) return;
        const newAccess = currentAccess === "free" ? "premium" : "free";

        axiosSecure.patch(`/lesson/${id}/access`, {
            accessLevel: newAccess
        })
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

    // delete
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
                        console.log('after delete: ', res.data);
                        if (res.data.deletedCount) {
                            // refresh data on ui
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your lesson has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };


    // loading
    if (isLoading) return <LoadingSpinner />
    return (
        <div className="p-10 ">
            <div className="p-6 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4">My Lessons</h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Lesson Title</th>
                                <th>Category</th>
                                <th>Privacy</th>
                                <th>Access</th>
                                <th>Likes</th>
                                <th>Favorites</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lessons.map((lesson, index) => (
                                <tr key={lesson._id}>
                                    <th>{index + 1}</th>
                                    <td className="font-semibold">{lesson.title}</td>
                                    <td>{lesson.category}</td>

                                    {/* Toggle Privacy */}
                                    <td>
                                        <button
                                            className="btn btn-xs"
                                            onClick={() => handleTogglePrivacy(lesson._id, lesson.privacy)}
                                        >
                                            {lesson.privacy === "public" ? "Public" : "Private"}
                                        </button>
                                    </td>

                                    {/* Toggle Access */}
                                    <td>
                                        <button
                                            className="btn btn-sm"
                                            disabled={!userData?.isPremium}
                                            onClick={() => handleToggleAccess(lesson._id, lesson.accessLevel)}
                                        >
                                            {lesson.accessLevel === "free" ? "Free" : "Premium"}
                                        </button>

                                        {!userData?.isPremium && (
                                            <div className="text-xs text-warning">
                                                Premium only
                                            </div>
                                        )}
                                    </td>

                                    {/* Stats */}
                                    <td>{lesson.likesCount}</td>
                                    <td>{lesson.favoritesCount}</td>
                                    <td>{lesson.createdAt}</td>

                                    {/* Actions */}
                                    <td className="flex gap-2">
                                        <Link
                                            className="btn btn-xs bg-secondary text-white"
                                            to={`/lesson-details/${lesson._id}`}
                                        >
                                            Details
                                        </Link>

                                        <UpdateLesson lesson={lesson} refetch={refetch} />

                                        <button
                                            className="btn btn-xs btn-error text-white"
                                            onClick={() => handleDelete(lesson._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default MyLesson;