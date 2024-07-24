import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/AuthUser'; // Adjust the path to your AuthUser context

const UserDonations: React.FC = () => {
    const [donations, setDonations] = useState<any[]>([]);
    const { user, token } = useContext(Context);

    useEffect(() => {
        if (user) {
            const fetchDonations = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/donation/user/${user._id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setDonations(response.data.donations);
                } catch (error) {
                    console.error('Error fetching donations:', error);
                }
            };

            fetchDonations();
        }
    }, [user, token]);

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-4xl font-extrabold mb-8 text-primary dark:text-secondary text-center">
                    Your Donations
                </h2>
                {donations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donations.map((donation) => (
                            <div key={donation._id} className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-6 bg-white dark:bg-gray-700">
                                {donation.itemTypes.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-primary dark:text-secondary mb-2">
                                            Items
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {donation.itemTypes.map((item: { itemType: string; quantity: number }, index: number) => (
                                                <div key={index} className="bg-gray-100 dark:bg-gray-600 p-2 rounded-lg flex items-center space-x-2">
                                                    <span className="text-base text-gray-800 dark:text-gray-300">
                                                        {item.itemType}
                                                    </span>
                                                    <span className="text-base text-gray-600 dark:text-gray-400">
                                                        (Quantity: {item.quantity})
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {donation.description && (
                                    <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-primary dark:text-secondary mb-2">
                                            Description
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-400">{donation.description}</p>
                                    </div>
                                )}
                                {donation.category && (
                                    <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-primary dark:text-secondary mb-2">
                                            Category
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-400">{donation.category}</p>
                                    </div>
                                )}
                                {donation.ageRange && (
                                    <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-primary dark:text-secondary mb-2">
                                            Age Range
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-400">{donation.ageRange}</p>
                                    </div>
                                )}
                                {donation.pickupTime && (
                                    <div className="mb-4">
                                        <h4 className="text-lg font-semibold text-primary dark:text-secondary mb-2">
                                            Pickup Time
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-400">{new Date(donation.pickupTime).toLocaleString()}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No donations found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDonations;
