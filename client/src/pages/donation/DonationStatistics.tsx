// src/components/DonationStatistics.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/AuthUser';
// import { Context } from '../context/AuthUser';

interface DonationStatistic {
  _id: string;
  totalDonations: number;
  totalQuantity: number;
  donors: Array<{
    _id: string;
    userName: string;
    email: string;
  }>;
}

const DonationStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<DonationStatistic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(Context);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/donation-statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        setError('Failed to fetch donation statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Donation Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((stat) => (
          <div key={stat._id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Category: {stat._id}</h2>
            <p>Total Donations: {stat.totalDonations}</p>
            <p>Total Quantity: {stat.totalQuantity}</p>
            <h3 className="text-lg font-semibold mt-4">Donors:</h3>
            <ul>
              {stat.donors.map((donor) => (
                <li key={donor._id}>
                  {donor.userName} ({donor.email})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationStatistics;
