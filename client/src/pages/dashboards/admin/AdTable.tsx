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
  contact: string;
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
  // const { darkMode } = useDarkMode(); // Use dark mode context

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
          <tr className="dark:bg-primary bg-fivth border-b dark:border-secondary border-primary dark:text-third">
            <th className="p-2 text-center">ID</th>
            <th className="p-2 text-center">Title</th>
            <th className="p-2 text-center">Date</th>
            <th className="p-2 text-center">Location</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        );
      case 'volunteer':
        return (
          <tr className="dark:bg-primary bg-fivth border-b dark:border-secondary border-primary dark:text-third">
            <th className="p-2 text-center">ID</th>
            <th className="p-2 text-center">User Name</th>
            <th className="p-2 text-center">Email</th>
            <th className="p-2 text-center">Phone Number</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        );
      case 'organizations':
        return (
          <tr className="dark:bg-primary bg-fivth border-b dark:border-secondary border-primary dark:text-third">
            <th className="p-2 text-center">ID</th>
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Email</th>
            <th className="p-2 text-center">Phone</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        );
      case 'donations':
        return (
          <tr className="dark:bg-primary bg-fivth border-b dark:border-secondary border-primary dark:text-third">
            <th className="p-2 text-center">ID</th>
            <th className="p-2 text-center">Donor Name</th>
            <th className="p-2 text-center">Amount</th>
            <th className="p-2 text-center">Donation Date</th>
            <th className="p-2 text-center">Actions</th>
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
        <tr className="dark:bg-secondary bg-fifth text-primary dark:text-fifth border-b dark:border-secondary border-primary">
          <td colSpan={5} className="p-2 text-center">Loading...</td>
        </tr>
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr className="dark:bg-secondary bg-fifth text-primary dark:text-fifth border-b dark:border-secondary border-primary">
          <td colSpan={5} className="p-2 text-center">No data available</td>
        </tr>
      );
    }

    switch (type) {
      case 'events':
        return (data as Event[]).map((event) => (
          <tr key={event._id} className="dark:bg-secondary bg-fifth text-primary dark:text-fifth border-b dark:border-secondary border-primary">
            <td className="p-2 text-center">{event._id}</td>
            <td className="p-2 text-center">{event.title}</td>
            <td className="p-2 text-center">{event.date}</td>
            <td className="p-2 text-center">{event.location}</td>
            <td className="p-2 text-center">
              <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(event._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      case 'volunteer':
        return (data as Volunteer[]).map((vol) => (
          <tr key={vol._id} className="dark:bg-secondary bg-fifth text-primary dark:text-fifth border-b dark:border-secondary border-primary">
            <td className="p-2 text-center">{vol._id}</td>
            <td className="p-2 text-center">{vol.userName || 'Unknown'}</td>
            <td className="p-2 text-center">{vol.email}</td>
            <td className="p-2 text-center">{vol.phoneNumber}</td>
            <td className="p-2 text-center">
              <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(vol._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      case 'organizations':
        return (data as Organization[]).map((organization) => (
          <tr key={organization._id} className="dark:bg-secondary bg-fifth text-primary dark:text-fifth border-b dark:border-secondary border-primary">
            <td className="p-2 text-center">{organization._id}</td>
            <td className="p-2 text-center">{organization.organizationName}</td>
            <td className="p-2 text-center">{organization.email}</td>
            <td className="p-2 text-center">{organization.phoneNumber}</td>
            <td className="p-2 text-center">
              <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(organization._id)}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ));
      case 'donations':
        return (data as Donation[]).map((donation) => (
          <tr key={donation._id} className="dark:bg-secondary bg-fifth text-primary dark:text-fifth border-b dark:border-secondary border-primary">
            <td className="p-2 text-center">{donation._id}</td>
            <td className="p-2 text-center">{donation.donorName}</td>
            <td className="p-2 text-center">{donation.amount}</td>
            <td className="p-2 text-center">{donation.donationDate}</td>
            <td className="p-2 text-center">
              <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(donation._id)}>
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-primary dark:text-fifth">{type.charAt(0).toUpperCase() + type.slice(1)} List</h1>
      <table className="min-w-full bg-fifth dark:bg-primary border-collapse">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default AdTable;