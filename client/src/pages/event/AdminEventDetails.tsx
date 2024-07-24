import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Context } from '../../context/AuthUser';
import EventFilter from './EventFilter';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
}

const AdminEventDetails: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const { token, user } = useContext(Context);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token) {
        toast.error('No authentication token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/event/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Error fetching events');
      }
    };

    fetchEvents();
  }, [token]);

  const deleteEvent = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:5000/event/${eventId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event._id !== eventId));
      setFilteredEvents(filteredEvents.filter(event => event._id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        toast.error('You do not have permission to delete this event');
      } else {
        toast.error('Error deleting event');
      }
      console.error('Error deleting event:', error);
    }
  };

  const handleFilter = (filtered: Event[]) => {
    setFilteredEvents(filtered);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white dark:bg-primary">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center dark:text-fivth">All Events</h2>
        <EventFilter events={events} onFilter={handleFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white border border-primary p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-black">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500">Location: {event.location}</p>
              <p className="text-gray-500">Type: {event.type}</p>
              <button
                onClick={() => deleteEvent(event._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center transition-colors"
              >
                <FaRegTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetails;
