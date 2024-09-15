import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface EventDetails {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  city: string;
  country: string;
}

interface EditEventFormProps {
  event: EventDetails;
  onCancel: () => void;
  fetchOrganizationEvents: () => void;
}

const DetailsFormat: React.FC<EditEventFormProps> = ({ event, onCancel, fetchOrganizationEvents }) => {
  const [updatedEvent, setUpdatedEvent] = useState<EventDetails>({
    _id: event._id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    city: event.city,
    country: event.country,
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `https://volunteer-management-system-ybtz.onrender.com/event/edit/${event._id}`,
        updatedEvent,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Event updated successfully');
      fetchOrganizationEvents();
      onCancel(); // Clear editing state
    } catch (error) {
      console.error('Error editing event:', error);
      toast.error('Error editing event');
    }
  };

  const handleCancel = () => {
    onCancel(); // Clear editing state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedEvent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-secondary rounded-md z-10">
      <h3 className="text-lg font-semibold mb-2">Edit Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-fourth">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedEvent.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 dark:border-secondary dark:bg-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-fourth">Description</label>
          <textarea
            id="description"
            name="description"
            value={updatedEvent.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full border-gray-300 dark:border-secondary dark:bg-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-fourth">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={updatedEvent.date}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 dark:border-secondary dark:bg-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-fourth">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={updatedEvent.location}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 dark:border-secondary dark:bg-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-fourth">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={updatedEvent.city}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 dark:border-secondary dark:bg-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-fourth">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={updatedEvent.country}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 dark:border-secondary dark:bg-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
          <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DetailsFormat;
