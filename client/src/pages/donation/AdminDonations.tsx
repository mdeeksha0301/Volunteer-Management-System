import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/AuthUser'; // Adjust the path to your AuthUser context

const AdminDonations: React.FC = () => {
    const [categorizedDonations, setCategorizedDonations] = useState<any>({});
    const { token } = useContext(Context);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get('https://volunteer-management-system-ybtz.onrender.com/donation/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCategorizedDonations(response.data.categorizedDonations);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        fetchDonations();
    }, [token]);

    return (
        <div>
            <h2>All Donations</h2>
            {Object.keys(categorizedDonations).length > 0 ? (
                Object.keys(categorizedDonations).map((category) => (
                    <div key={category}>
                        <h3>{category}</h3>
                        <ul>
                            {categorizedDonations[category].map((donation: any, index: number) => (
                                <li key={index}>
                                    <strong>Item Type:</strong> {donation.itemType}<br />
                                    <strong>Quantity:</strong> {donation.quantity}<br />
                                    <strong>Donor:</strong> {donation.user.userName} (Email: {donation.user.email})
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No donations found.</p>
            )}
        </div>
    );
};

export default AdminDonations;
