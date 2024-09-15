import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../../context/AuthUser';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { token, user, fetchParticipatedEvents } = useContext(Context);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://volunteer-management-system-ybtz.onrender.com/event/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

//     if (token) {
//       fetchEvents();
//     }
//   }, [token]
fetchEvents();
  }, []

);

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
        fetchParticipatedEvents(); // Refetch participated events
      }
    } catch (error) {
      console.error('Error participating in event:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">All Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
            <button
              onClick={() => participateInEvent(event._id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Participate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
