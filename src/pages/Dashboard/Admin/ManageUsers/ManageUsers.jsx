import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import UpdateUserRole from './UpdateUserRole';

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // update modal
    const [selectedUser, setSelectedUser] = useState(null);
    const isOpen = !!selectedUser;
    
    const openModal = (user) => setSelectedUser(user);
    const closeModal = () => setSelectedUser(null);

    // get all plants from the db
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users`)
            return result.data;
        }
    })

    // delete user
    const handleDelete = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${email}`)
                    .then(res => {
                        console.log('after delete: ', res.data);
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
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
                <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Total Lessons</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td className="font-semibold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.lessonCount}</td>



                                    {/* Actions */}
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="btn btn-xs bg-secondary text-white"
                                        >
                                            Update Role
                                        </button>
                                        

                                        <button
                                            className="btn btn-xs btn-error text-white"
                                            onClick={() => handleDelete(user.email)}
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
            {selectedUser && (
                <UpdateUserRole
                    user={selectedUser}
                    refetch={refetch}
                    isOpen={isOpen}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default ManageUsers;