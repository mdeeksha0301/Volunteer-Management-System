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
  const [imageURL, setImageURL] = useState(event?.image || '');
  const [type, setType] = useState(event?.type || '');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setLocation(event.location);
      setCity(event.city);
      setCountry(event.country);
      setImageURL(event.image);
      setType(event.type);
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const eventData = {
        title,
        description,
        date,
        location,
        city,
        country,
        type,
        imageURL,
      };

      if (event) {
        await axios.put(
          `http://localhost:5000/event/${event._id}`,
          eventData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        toast.success('Event updated successfully.');
      } else {
        await axios.post(
          'http://localhost:5000/event/create',
          eventData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        toast.success('Event created successfully.');
      }
      fetchOrganizationEvents();
      onCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form.');
    }
  };

  return (
    <div className='bg-secondary dark:bg-gray-800'>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 max-w-lg mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-white text-center">
          {event ? 'Edit Event' : 'Create Event'}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
             <option value="">Select type</option>
<option value="Environmental">Environmental</option>
<option value="Social Service">Social Service</option>
<option value="Animal Welfare">Animal Welfare</option>
<option value="Community Service">Community Service</option>
<option value="Health">Health</option>
<option value="Education">Education</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          >
            {event ? 'Update Event' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
