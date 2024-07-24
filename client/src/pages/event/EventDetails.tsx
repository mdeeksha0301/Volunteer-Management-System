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
  image?: string; // Optional image property
}

const EventDetails: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const { token, user, fetchParticipatedEvents, isAuthorized } = useContext(Context);

  // Array of placeholder image URLs
  const placeholderImages = [
    "https://via.placeholder.com/300x200?text=Event+1",
    "https://via.placeholder.com/300x200?text=Event+2",
    "https://via.placeholder.com/300x200?text=Event+3",
    "https://via.placeholder.com/300x200?text=Event+4",
  ];

  useEffect(() => {
    if (isAuthorized && token) {
      const fetchEvents = async () => {
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
    }
  }, [token, isAuthorized]);

  const participateInEvent = async (eventId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/event/participate/${eventId}`,
        { user: { _id: user._id } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchParticipatedEvents();
        toast.success('Successfully participated in the event');
      }
    } catch (error) {
      console.error('Error participating in event:', error);
      toast.error('Error participating in event');
    }
  };

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
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-primary dark:text-secondary">All Events</h2>
        <EventFilter events={events} onFilter={handleFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={event.image || placeholderImages[Math.floor(Math.random() * placeholderImages.length)]}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-primary dark:text-secondary">{event.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{event.description}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2"><strong>Location:</strong> {event.location}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4"><strong>Type:</strong> {event.type}</p>
                <div className="flex gap-4">
                  {user.role === 'volunteer' && (
                    <button
                      onClick={() => participateInEvent(event._id)}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Participate
                    </button>
                  )}
                  {user.role === 'admin' && (
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2 transition-colors"
                    >
                      <FaRegTrashAlt className="text-lg" /> Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
