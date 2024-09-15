import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import { Context } from '../../context/AuthUser';

const toastOptions: ToastOptions = {
  className: 'bg-secondary text-white',
  style: {
    background: '#6b7280', 
    color: '#fff',
  },
};

const RegistrationPage: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [organizationName, setOrganizationName] = useState<string>('');
  const navigate = useNavigate();

  const { setIsAuthorized, setUser } = useContext(Context);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://volunteer-management-system-ybtz.onrender.com/auth/register', {
        role,
        userName,
        email,
        password,
        phoneNumber,
        organizationName,
      });
      if (response.status === 201) {
        toast.success(response.data.message, toastOptions);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user', error);
      toast.error('Error registering user', toastOptions);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-700 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Register</h2>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select role</option>
            <option value="organization">Organization</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {role === 'organization' && (
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {(role === 'organization' || role === 'volunteer') && (
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {role === 'volunteer' && (
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200">
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
