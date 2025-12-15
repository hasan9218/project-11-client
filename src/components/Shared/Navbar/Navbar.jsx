import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/avater.png'
import logo from '../../../assets/WisdomVault.png'
const Navbar = () => {
    const { user, logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    // routes
    const links = <>
        <li><NavLink to={'/'} className={({ isActive }) =>
            `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline text-primary' : ''}`
        }>Home</NavLink></li>
        <li><NavLink to={'/dashboard/add-lesson'} className={({ isActive }) =>
            `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline text-primary' : ''}`
        }>Add Lesson</NavLink></li>
        <li><NavLink to={'/dashboard/my-lessons'} className={({ isActive }) =>
            `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline text-primary' : ''}`
        }>My Lessons</NavLink></li>
        <li><NavLink to={'/public-lessons'} className={({ isActive }) =>
            `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline text-primary' : ''}`
        }>Public Lesson</NavLink></li>
        <li><NavLink to={'/payment'} className={({ isActive }) =>
            `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline text-primary' : ''}`
        }>Upgrade to Premium</NavLink></li>
    </>
    return (
        <Container>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link to={'/'} className='flex gap-2 items-center'>
                        <img src={logo} alt="" className='w-15 bg-wi' />
                        <span className={'text-[#02a2a2] font-bold text-xl'}>Wisdom<span className='text-primary'>Vault</span> </span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            {/* Profile Dropdown */}
                            <div className="relative z-50">
                                {/* Trigger */}
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-3 p-2 rounded-full border border-gray-200 hover:shadow-md transition bg-white"
                                >
                                    <AiOutlineMenu className="text-xl" />
                                    <img
                                        className="h-9 w-9 rounded-full object-cover"
                                        referrerPolicy="no-referrer"
                                        src={user?.photoURL || avatarImg}
                                        alt="profile"
                                    />
                                </button>

                                {/* Dropdown */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-xl border-2 border-secondary overflow-hidden z-50">

                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-gray-300 bg-gray-50">
                                            <p className="font-semibold text-gray-800 truncate">
                                                {user?.displayName || "Anonymous User"}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user?.email}
                                            </p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="flex flex-col text-sm">
                                            <Link
                                                to="/dashboard/profile"
                                                className="px-4 py-3 hover:bg-teal-100 transition flex items-center gap-2 font-semibold"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                👤 Profile
                                            </Link>

                                            <Link
                                                to="/dashboard"
                                                className="px-4 py-3 hover:bg-teal-100 transition flex items-center gap-2 border-b border-gray-300 font-semibold"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                📊 Dashboard
                                            </Link>

                                            

                                            <button
                                                onClick={() => {
                                                    logOut();
                                                    setIsOpen(false);
                                                }}
                                                className="px-4 py-3 hover:bg-red-50 text-primary transition flex items-center gap-2 font-semibold"
                                            >
                                                🚪 Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>

                    ) : (
                        <div className='space-x-1.5'>
                            <Link
                                to='/login'
                                className='btn bg-secondary text-white hover:bg-teal-700'
                            >
                                Login
                            </Link>
                            <Link
                                to='/signup'
                                className='btn bg-secondary text-white hover:bg-teal-700'
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </Container>

    )
}

export default Navbar
