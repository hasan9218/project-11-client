import React from 'react';
import { NavLink } from 'react-router';
import { LuNotebookPen } from "react-icons/lu";
import { FaHeart, FaListAlt, FaUserCog, FaUsers } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdReportProblem } from "react-icons/md";
const Sidebar = () => {
    return (
        <div className='space-y-2.5'>
            <li>
                <NavLink
                    to={'/'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Home">
                    
                    <IoHome className='text-primary font-bold' />
                    <span className="is-drawer-close:hidden">Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'/dashboard/add-lesson'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Add Lesson">
                    
                    <LuNotebookPen className=' font-bold' />
                    <span className="is-drawer-close:hidden">Add Lesson</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'/dashboard/my-lessons'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="My Lesson">
                    
                    <FaListAlt className='' />
                    <span className="is-drawer-close:hidden">My Lesson</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'/dashboard/my-favorites'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="My Favorites">
                    
                    <FaHeart className='' />
                    <span className="is-drawer-close:hidden">My Favorites</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'/dashboard/manage-users'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Manage Users">
                   
                    <FaUsers className='' />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'/dashboard/manage-lessons'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Manage Lessons">
                    
                    <FaUserCog className='' />
                    <span className="is-drawer-close:hidden">Manage Lessons</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'/dashboard/reported-lessons'}
                    className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary ${isActive ? 'text-secondary' : ''}`}
                    data-tip="Reported Lessons">
                    
                    <MdReportProblem className='' />
                    <span className="is-drawer-close:hidden">Reported Lessons</span>
                </NavLink>
            </li>
        </div>
    );
};

export default Sidebar;