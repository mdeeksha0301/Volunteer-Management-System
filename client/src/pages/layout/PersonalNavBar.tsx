import React, { useContext, useState } from 'react';
import { Context } from '../../context/AuthUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const PersonalNavBar = () => {
    const [show, setShow] = useState(false);
    const {isAuthorized, setIsAuthorized, user, setToken, setUser} = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
            toast.success(response.data.message);
            setToken(null);
            setIsAuthorized(false);
            setUser(null); // Clear user state
            // setParticipatedEvents([]); 
            navigate('/');
        } catch (err) {
            const error = err as any;
            toast.error(error.response?.data?.message || 'An error occurred');
            setIsAuthorized(true);
        }
    };

    const renderLinks = () => {
        switch(user.role) {
            case 'admin':
                return (
                    <>
                        <Link to="/admin-dashboard/events" className="hover:text-gray-300 text-primary dark:text-fivth">Events</Link>
                        <Link to="/admin-dashboard/donations" className="hover:text-gray-300 text-primary dark:text-fivth">Donations</Link>
                        <Link to="/admin-dashboard/organizations" className="hover:text-gray-300 text-primary dark:text-fivth">Organizations</Link>
                        <Link to="/admin-dashboard/volunteers" className="hover:text-gray-300 text-primary dark:text-fivth">Volunteer</Link>
                    </>
                );
            case 'organization':
                return (
                    <>
                        <Link to="/organization" className="hover:text-gray-300 text-primary dark:text-fivth">My Events</Link>
                        <Link to="/organization/new" className="hover:text-gray-300 text-primary dark:text-fivth">Create Events</Link>
                        <Link to="/organization/my-donations" className="hover:text-gray-300 text-primary dark:text-fivth">My Donations</Link>
                    </>
                );
            case 'volunteer':
                return (
                    <>
                        <Link to="/volunteer-dashboard/my-events" className="hover:text-gray-300 text-primary dark:text-fivth">My Activities</Link>
                        <Link to="/volunteer-dashboard/all-events" className="hover:text-gray-300 text-primary dark:text-fivth">Events</Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <nav className={`bg-secondary text-white dark:bg-primary ${isAuthorized ? 'navbarShow' : 'navbarHide'}`}>
                <div className="container mx-auto p-4 flex justify-between items-center">
                    <div className="text-lg font-semibold text-third ">
                        <Link to="/">Volunteer Management</Link>
                    </div>
                    <div className={`hidden md:flex space-x-4 ${!show ? "menu" : "show-menu menu"}`}>
                        {renderLinks()}
                    </div>
                    <div className="hidden md:flex space-x-2">
                        <div className="flex items-center justify-center rounded">
                            <button onClick={handleLogout} className="px-3 py-1 rounded bg-primary dark:bg-third hover:bg-blue-700 cursor-pointer text-white">
                                Logout
                            </button>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
                <div className="w-full h-1 bg-primary dark:bg-fourth"></div>
            </nav>
        </div>
    );
};

export default PersonalNavBar;
