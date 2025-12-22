import React from 'react';
import { NavLink } from 'react-router';
import { LuNotebookPen } from "react-icons/lu";
import { FaHeart, FaListAlt, FaUserCog, FaUsers } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdDashboard, MdReportProblem } from "react-icons/md";
import useRole from '../../hooks/useRole';
const Sidebar = () => {
    const { userData } = useRole();

    return (
        <div className='space-y-2.5'>
            <li>
                <NavLink
                    to={'/'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Home">
                    {/* icon */}
                    <IoHome className='text-primary font-bold' />
                    <span className="is-drawer-close:hidden">Home</span>
                </NavLink>
                <NavLink
                    to={'/dashboard'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Dashboard">
                    {/* icon */}
                    <MdDashboard className='text-primary font-bold' />
                    <span className="is-drawer-close:hidden">Dashboard</span>
                </NavLink>
            </li>
            {
                userData?.role === "user" && <>
                    {/* add lesson */}
                    <li>
                        <NavLink
                            to={'/dashboard/add-lesson'}
                            className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                            data-tip="Add Lesson">
                            {/* icon */}
                            <LuNotebookPen className=' font-bold' />
                            <span className="is-drawer-close:hidden">Add Lesson</span>
                        </NavLink>
                    </li>
                    {/* my lesson */}
                    <li>
                        <NavLink
                            to={'/dashboard/my-lessons'}
                            className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                            data-tip="My Lesson">
                            {/* icon */}
                            <FaListAlt className='' />
                            <span className="is-drawer-close:hidden">My Lesson</span>
                        </NavLink>
                    </li>
                    {/* my fav */}
                    <li>
                        <NavLink
                            to={'/dashboard/my-favorites'}
                            className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                            data-tip="My Favorites">
                            {/* icon */}
                            <FaHeart className='' />
                            <span className="is-drawer-close:hidden">My Favorites</span>
                        </NavLink>
                    </li>
                </>
            }

            {
                userData?.role === "admin" && <>
                    {/* manage user */}
                    <li>
                        <NavLink
                            to={'/dashboard/manage-users'}
                            className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                            data-tip="Manage Users">
                            {/* icon */}
                            <FaUsers className='' />
                            <span className="is-drawer-close:hidden">Manage Users</span>
                        </NavLink>
                    </li>
                    {/* manage lesson */}
                    <li>
                        <NavLink
                            to={'/dashboard/manage-lessons'}
                            className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                            data-tip="Manage Lessons">
                            {/* icon */}
                            <FaUserCog className='' />
                            <span className="is-drawer-close:hidden">Manage Lessons</span>
                        </NavLink>
                    </li>
                    {/* reported lesson */}
                    <li>
                        <NavLink
                            to={'/dashboard/reported-lessons'}
                            className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                            data-tip="Reported Lessons">
                            {/* icon */}
                            <MdReportProblem className='' />
                            <span className="is-drawer-close:hidden">Reported Lessons</span>
                        </NavLink>
                    </li>
                </>
            }


        </div>
    );
};

export default Sidebar;