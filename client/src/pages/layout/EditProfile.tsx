import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserEdit, FaUserAlt, FaAddressCard, FaBriefcase, FaEnvelope, FaPhone } from 'react-icons/fa';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    organization?: string; // For organization profile
    role: 'volunteer' | 'organization' | 'admin';
}

const EditProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [organization, setOrganization] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await axios.get('https://volunteer-management-system-ybtz.onrender.com/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedUser = response.data.user;
                setUser(fetchedUser);
                setName(fetchedUser.name);
                setEmail(fetchedUser.email);
                setPhone(fetchedUser.phone);
                setAddress(fetchedUser.address);
                if (fetchedUser.role === 'organization') {
                    setOrganization(fetchedUser.organization || '');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to fetch user profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            await axios.put('https://volunteer-management-system-ybtz.onrender.com/user/profile', {
                name,
                email,
                phone,
                address,
                organization,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container p-4 dark:bg-primary bg-white min-h-screen max-w-full">
            <h2 className="text-2xl font-bold mb-4 dark:text-fifth text-primary">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center border p-2 rounded shadow-md bg-light">
                    <FaUserAlt className="text-xl text-primary mr-4" />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex items-center border p-2 rounded shadow-md bg-light">
                    <FaEnvelope className="text-xl text-primary mr-4" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex items-center border p-2 rounded shadow-md bg-light">
                    <FaPhone className="text-xl text-primary mr-4" />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex items-center border p-2 rounded shadow-md bg-light">
                    <FaAddressCard className="text-xl text-primary mr-4" />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                {user?.role === 'organization' && (
                    <div className="flex items-center border p-2 rounded shadow-md bg-light">
                        <FaBriefcase className="text-xl text-primary mr-4" />
                        <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="Organization Name"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded shadow-md hover:bg-blue-600"
                >
                    <FaUserEdit className="inline mr-2" /> Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
