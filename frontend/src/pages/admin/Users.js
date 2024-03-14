import React, { useEffect, useState } from 'react'
import { AdminDashboard } from './AdminDashboard'
import { toast } from 'react-toastify';
import axios from "axios";

export const Users = () => {

    const [users, setUsers] = useState()

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/get-users`);
            if (data?.success) {
                setUsers(data?.users);
            }
        } catch (error) {
            toast.error("Something went wrong in getting Users");
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/auth/delete-user/${id}`
            );
            if (data.success) {
                toast.success(data.success.message);
                getAllUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };


    return (
        <div className='grid grid-flow-col'>
            <AdminDashboard />

            <div className="relative overflow-x-scroll mt-6 rounded-md ">
                <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="px-2 py-3">Username</th>
                            <th className="px-2 py-3">Email</th>
                            <th className="px-2 py-3">isAdmin</th>
                            <th className="px-2 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user) => {
                            return (
                                <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                                        <td className="px-2 py-3">{user?.username}</td>
                                        <td className="px-2 py-3">{user?.email}</td>
                                        <td className="px-2 py-3">{user?.role === 1 ? "Yes" : "No"}</td>
                                        <td className='px-2 py-3'>
                                            <button
                                                disabled={user?.role === 1}
                                                className={`
                                            ${user?.role === 1 ? 'cursor-not-allowed' : null}
                                            bg-red-600 hover:bg-red-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                            onClick={() => {
                                                handleDelete(user?.id);
                                            }}
                                            >Remove</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
