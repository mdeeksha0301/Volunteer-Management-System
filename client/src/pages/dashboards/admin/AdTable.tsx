import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';

// Define interfaces for different data types
interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
}

interface Volunteer {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
}

interface Organization {
  _id: string;
  organizationName: string;
  email: string;
  phoneNumber: number;
}

interface Donation {
  _id: string;
  donorName: string;
  amount: number;
  donationDate: string;
}

// Define a union type for all possible data types
type DataType = Event | Volunteer | Organization | Donation;

interface AdTableProps {
  type: 'events' | 'volunteer' | 'organizations' | 'donations'; // Specify the supported types here
}

const AdTable: React.FC<AdTableProps> = ({ type }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      const response = await axios.get<any>(`http://localhost:5000/admin/${type}`, { withCredentials: true });
      console.log(response.data); // Log the response data to inspect it
      switch (type) {
        case 'events':
          setData(response.data);
          break;
        case 'volunteer':
          setData(response.data.volunteerData);
          break;
        case 'organizations':
          setData(response.data.organizationData);
          break;
        case 'donations':
          setData(response.data.donationsData);
          break;
        default:
          setData([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
      toast.error('Error fetching data'); // Display an error message to the user
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${type}/${id}`, { withCredentials: true });
      toast.success('Deleted successfully');
      fetchData(); // Refetch data after deletion
    } catch (error) {
      toast.error('Error deleting record');
    }
  };

  // Render table headers dynamically based on type
  const renderTableHeaders = () => {
    switch (type) {
      case 'events':
        return (
          <tr className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        );
      case 'volunteer':
        return (
          <tr className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <th className="p-4 text-left">User Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone Number</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        );
      case 'organizations':
        return (
          <tr className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        );
      case 'donations':
        return (
          <tr className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <th className="p-4 text-left">Donor Name</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Donation Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        );
      default:
        return null;
    }
  };

  // Render table rows dynamically based on type
  const renderTableRows = () => {
    if (loading) {
      return (
        <tr className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
          <td colSpan={4} className="p-4 text-center">Loading...</td>
        </tr>
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
          <td colSpan={4} className="p-4 text-center">No data available</td>
        </tr>
      );
    }

    switch (type) {
      case 'events':
        return (data as Event[]).map((event) => (
          <tr key={event._id} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <td className="p-4">{event.title}</td>
            <td className="p-4">{event.date}</td>
            <td className="p-4">{event.location}</td>
            <td className="p-4">
              <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400" onClick={() => handleDelete(event._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      case 'volunteer':
        return (data as Volunteer[]).map((vol) => (
          <tr key={vol._id} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <td className="p-4">{vol.userName || 'Unknown'}</td>
            <td className="p-4">{vol.email}</td>
            <td className="p-4">{vol.phoneNumber}</td>
            <td className="p-4">
              <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400" onClick={() => handleDelete(vol._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      case 'organizations':
        return (data as Organization[]).map((organization) => (
          <tr key={organization._id} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <td className="p-4">{organization.organizationName}</td>
            <td className="p-4">{organization.email}</td>
            <td className="p-4">{organization.phoneNumber}</td>
            <td className="p-4">
              <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400" onClick={() => handleDelete(organization._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      case 'donations':
        return (data as Donation[]).map((donation) => (
          <tr key={donation._id} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <td className="p-4">{donation.donorName}</td>
            <td className="p-4">{donation.amount}</td>
            <td className="p-4">{donation.donationDate}</td>
            <td className="p-4">
              <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400" onClick={() => handleDelete(donation._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">
        {type.charAt(0).toUpperCase() + type.slice(1)} List
      </h1>
      <table className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-center">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default AdTable;
