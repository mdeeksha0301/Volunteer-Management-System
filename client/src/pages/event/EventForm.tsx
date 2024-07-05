// EventForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface EventFormProps {
  event?: any; // Event data for editing, or undefined for creating a new event
  onCancel: () => void;
  fetchOrganizationEvents: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onCancel, fetchOrganizationEvents }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [date, setDate] = useState(event?.date || '');
  const [location, setLocation] = useState(event?.location || '');
  const [city, setCity] = useState(event?.city || '');
  const [country, setCountry] = useState(event?.country || '');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setLocation(event.location);
      setCity(event.city);
      setCountry(event.country);
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (event) {
        // Update event
        await axios.put(
          `http://localhost:5000/event/${event._id}`,
          { title, description, date, location, city, country },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new event
        await axios.post(
          'http://localhost:5000/event',
          { title, description, date, location, city, country },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      fetchOrganizationEvents();
      onCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 z-10">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {event ? 'Update Event' : 'Create Event'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  );
};

export default EventForm;