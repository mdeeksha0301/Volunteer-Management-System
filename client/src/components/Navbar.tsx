
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-secondary text-white dark:bg-primary">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-third ">
          <Link to="/">Volunteer Management</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/about" className="hover:text-gray-300 text-primary dark:text-fivth">About</Link>
          <Link to="/event" className="hover:text-gray-300 text-primary dark:text-fivth">Become Volunteer</Link>
          <Link to="/events" className="hover:text-gray-300 text-primary dark:text-fivth">Events</Link>
          <Link to="/help-center" className="hover:text-gray-300 text-primary dark:text-fivth">Help Center</Link>
         
        </div>
        <div className="hidden md:flex space-x-2">
          {/* <button className="px-3 py-1 rounded bg-primary dark:bg-third hover:bg-blue-700 cursor-pointer">Login</button> */}
          <div className="flex items-center justify-center rounded">
      <Link to="/login" className="px-3 py-1 rounded bg-primary  dark:bg-third hover:bg-blue-700 cursor-pointer text-white">
        Login
      </Link>
    </div>
          <button className="px-3 py-1 rounded bg-third dark:bg-fourth hover:bg-green-700 cursor-pointer">Donate</button>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-1 bg-primary dark:bg-fourth"></div>
    </nav>
  );
};

export default Navbar;
