import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/AuthUser';
import toast, { Toaster } from 'react-hot-toast';
import UserDonations from './UserDonations';

const Donation: React.FC = () => {
    const [itemTypes, setItemTypes] = useState<{ itemType: string; category?: string; ageRange?: string; quantity: number }[]>([]);
    const [description, setDescription] = useState('');
    const [pickupTime, setPickupTime] = useState<Date | null>(null);
    const [address, setAddress] = useState('');
    const { token } = useContext(Context);

    const handleAddItem = () => {
        setItemTypes([...itemTypes, { itemType: '', quantity: 1 }]);
    };

    const handleItemTypeChange = (index: number, value: string) => {
        const newItemTypes = [...itemTypes];
        newItemTypes[index] = { ...newItemTypes[index], itemType: value, category: undefined, ageRange: undefined };
        setItemTypes(newItemTypes);
    };

    const handleItemChange = (index: number, field: 'quantity' | 'category' | 'ageRange', value: any) => {
        const newItemTypes = [...itemTypes];
        newItemTypes[index] = { ...newItemTypes[index], [field]: value };
        setItemTypes(newItemTypes);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'https://volunteer-management-system-ybtz.onrender.com/donation/create',
                {
                    itemTypes,
                    description,
                    pickupTime,
                    address
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success(response.data.message || 'Donation created successfully');
        } catch (error) {
            console.error('Error creating donation:', error);
            toast.error('Error creating donation. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
            <Toaster />
            <h2 className="text-3xl font-bold text-primary dark:text-secondary text-center mb-6">Create Donation</h2>

            <div className="space-y-6 w-full max-w-2xl">
                {itemTypes.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-6 mx-auto">
                        <div className="mb-4 text-center">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Type</label>
                            <select
                                className="mt-1 block w-64 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary mx-auto"
                                value={item.itemType}
                                onChange={(e) => handleItemTypeChange(index, e.target.value)}
                            >
                                <option value="">Select Item Type</option>
                                <option value="clothes">Clothes</option>
                                <option value="stationery">Stationery</option>
                                <option value="toys">Toys</option>
                                <option value="shoes">Shoes</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {item.itemType === 'clothes' && (
                            <div className="mb-4 text-center">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                <select
                                    className="mt-1 block w-64 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary mx-auto"
                                    value={item.category}
                                    onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="children">Children</option>
                                </select>

                                {item.category === 'children' && (
                                    <div className="mt-2 text-center">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age Range</label>
                                        <select
                                            className="mt-1 block w-64 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary mx-auto"
                                            value={item.ageRange}
                                            onChange={(e) => handleItemChange(index, 'ageRange', e.target.value)}
                                        >
                                            <option value="">Select Age Range</option>
                                            <option value="0-5">0-5</option>
                                            <option value="6-10">6-10</option>
                                            <option value="11-15">11-15</option>
                                            <option value="16-20">16-20</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-4 text-center">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
                            <input
                                type="number"
                                className="mt-1 block w-64 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary mx-auto"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    </div>
                ))}

                <button
                    className="block mx-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={handleAddItem}
                >
                    Add Another Item
                </button>

                <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-6 mx-auto">
                    <div className="flex flex-wrap gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Time</label>
                            <input
                                type="datetime-local"
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                onChange={(e) => setPickupTime(new Date(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="block mx-auto mt-6 px-6 py-3 bg-third text-white font-semibold rounded-lg shadow-md hover:bg-third-dark focus:outline-none focus:ring-2 focus:ring-third"
                    onClick={handleSubmit}
                >
                    Submit Donation
                </button>
            </div>

            <UserDonations />
        </div>
    );
};

export default Donation;
