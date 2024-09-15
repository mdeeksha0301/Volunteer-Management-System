import React, { useContext, useState } from 'react';
import { Context } from '../../context/AuthUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';
import { FaHome, FaCalendarAlt, FaTachometerAlt, FaDonate, FaUsers, FaPlusCircle, FaListAlt } from 'react-icons/fa';

const PersonalNavBar: React.FC = () => {
    const { isAuthorized, setIsAuthorized, user, setToken, setUser } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post("https://volunteer-management-system-ybtz.onrender.com/auth/logout", {}, { withCredentials: true });
            toast.success(response.data.message);
            setToken(null);
            setIsAuthorized(false);
            setUser(null); // Clear user state
            navigate('/');
        } catch (err) {
            const error = err as any;
            toast.error(error.response?.data?.message || 'An error occurred');
            setIsAuthorized(true);
        }
    };

    const renderLinks = () => {
        switch (user.role) {
            case 'admin':
                return (
                    <>
                        <Link to="/admin-dashboard" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaTachometerAlt /> <span>Dashboard</span>
                        </Link>
                        <Link to="/admin-dashboard/events" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaCalendarAlt /> <span>Events</span>
                        </Link>
                        <Link to="/admin-dashboard/organizations" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaUsers /> <span>Organizations</span>
                        </Link>
                        <Link to="/admin-dashboard/volunteers" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaUsers /> <span>Volunteers</span>
                        </Link>
                    </>
                );
            case 'organization':
                return (
                    <>
                        <Link to="/organization" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaTachometerAlt /> <span>Dashboard</span>
                        </Link>
                        <Link to="/organization/my-events" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaListAlt /> <span>My Events</span>
                        </Link>
                        <Link to="/organization/new" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaPlusCircle /> <span>Create Events</span>
                        </Link>
                    </>
                );
            case 'volunteer':
                return (
                    <>
                        <Link to="/volunteer-dashboard" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaTachometerAlt /> <span>Dashboard</span>
                        </Link>
                        <Link to="/volunteer-dashboard/my-events" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaListAlt /> <span>My Activities</span>
                        </Link>
                        <Link to="/volunteer-dashboard/all-events" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaCalendarAlt /> <span>Events</span>
                        </Link>
                        <Link to="/volunteer-dashboard/donations" className="text-primary dark:text-fivth flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                            <FaDonate /> <span>Donations</span>
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-secondary dark:bg-primary text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-lg font-semibold text-third flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
                        <FaHome /> <span>Volunteer Management</span>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        {renderLinks()}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded bg-primary dark:bg-third hover:bg-blue-700 cursor-pointer text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalNavBar;
