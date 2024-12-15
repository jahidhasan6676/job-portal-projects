import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
    }

    const links = <>
        < li > <Link to="/">Home</Link></li>
        <li><Link to="/myApplication">My Application</Link></li>
        <li><Link to="/addJob">Add Job</Link></li>
        <li><Link to="/myPostedJobs">My Posted Job</Link></li>


    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Job Portal</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className='navbar-end'>
            {
                user ? <>
                    <button onClick={handleLogOut} className='btn btn-primary'>LogOut</button>
                </> :
                    <>
                        <div className=" space-x-3">
                            <Link to="/register">Register</Link>
                            <Link to="/signIn" className="btn">Sign In</Link>
                        </div>
                    </>
            }
            </div>

        </div>
    );
};

export default Navbar;