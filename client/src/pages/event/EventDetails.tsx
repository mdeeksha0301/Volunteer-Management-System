import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Context } from '../../context/AuthUser';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

const EventDetails: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { token, user, fetchParticipatedEvents } = useContext(Context);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/event/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Error fetching events');
      }
    };

    fetchEvents();
  }, [token]);

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

  return (
    <div className="p-4 dark:bg-primary bg-white min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold mb-2 dark:text-fifth text-primary">All Events</h2>
      <div className="grid grid-cols-3 gap-4">
  {events.map((event) => (
    <div key={event._id} className="w-full p-4 shadow-md rounded-md dark:bg-secondary bg-fifth">
      <h3 className="text-lg font-semibold dark:text-primary text-third">{event.title}</h3>
      <p className="text-gray-600 dark:text-fourth">{event.description}</p>
      <p className="text-gray-500 dark:text-fourth">Date: {new Date(event.date).toLocaleDateString()}</p>
      {user.role === 'volunteer' && (
        <button
          onClick={() => participateInEvent(event._id)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Participate
        </button>
      )}
      {user.role === 'admin' && (
        <button
          onClick={() => deleteEvent(event._id)}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
        >
          <FaRegTrashAlt className="mr-2" /> Delete
        </button>
      )}
    </div>
  ))}
</div>

        {/* ))} */}
      {/* </div> */}
    </div>
  );
};

export default EventDetails;
