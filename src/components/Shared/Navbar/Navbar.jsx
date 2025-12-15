import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/avater.png'
import logo from '../../../assets/logo.png'
const Navbar = () => {
    const { user, logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    // routes
    const links = <>
        <li><NavLink to={'/'} className={({ isActive }) => 
      `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline' : ''}`
    }>Home</NavLink></li>
        <li><NavLink to={'/dashboard/add-lesson'} className={({ isActive }) => 
      `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline' : ''}`
    }>Add Lesson</NavLink></li>
        <li><NavLink to={'/dashboard/my-lessons'} className={({ isActive }) => 
      `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline' : ''}`
    }>My Lessons</NavLink></li>
        <li><NavLink to={'/public-lessons'} className={({ isActive }) => 
      `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline' : ''}`
    }>Public Lesson</NavLink></li>
        <li><NavLink to={'/'} className={({ isActive }) => 
      `text-[#02a2a2] font-bold text-lg ${isActive ? 'underline' : ''}`
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
                        <span className={'text-[#02a2a2] font-bold text-xl'}>Wisdom<span className='text-primary'>Cell</span> </span>
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
                            {/* Dropdown Menu */}
                            <div className='relative'>
                                <div className='flex flex-row items-center gap-3'>
                                    {/* Dropdown btn */}
                                    <div
                                        onClick={() => setIsOpen(!isOpen)}
                                        className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                                    >
                                        <AiOutlineMenu />
                                        <div className='hidden md:block'>
                                            {/* Avatar */}
                                            <img
                                                className='rounded-full'
                                                referrerPolicy='no-referrer'
                                                src={user && user.photoURL ? user.photoURL : avatarImg}
                                                alt='profile'
                                                height='30'
                                                width='30'
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isOpen && (
                                    <div className='absolute z-10 rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                                        <div className='flex flex-col cursor-pointer'>
                                            <div
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                {user?.displayName}
                                            </div>
                                            <Link
                                                to={'/dashboard/profile'}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to={'/dashboard'}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={logOut}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
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
