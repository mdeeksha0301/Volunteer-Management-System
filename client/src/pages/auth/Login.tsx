import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import { Context } from '../../context/AuthUser';
import axiosInstance from '../../context/axiosInstance';
import { FaUser, FaLock } from 'react-icons/fa'; // Example icons from react-icons

const toastOptions: ToastOptions = {
  className: 'bg-secondary text-white',
  style: {
    background: '#6b7280',
    color: '#fff',
  },
};

const Login: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { setIsAuthorized, setUser } = useContext(Context);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        role,
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        toast.success(response.data.message);
        setIsAuthorized(true);
        setUser(response.data.user);

        switch (response.data.user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'organization':
            navigate('/organization');
            break;
          case 'volunteer':
            navigate('/volunteer-dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      console.error('Error logging in', error);
      toast.error('Invalid credentials or server error', toastOptions);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-700 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-600">
              <FaUser className="h-5 w-5 mt-5" />
            </div>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="organization">Organization</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email / Username
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-600">
              <FaUser className="h-5 w-5 mt-5" />
            </div>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-600">
              <FaLock className="h-5 w-5 mt-5" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
          <div className="flex items-center justify-between">
            <a href="/register" className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200">
              Register
            </a>
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
