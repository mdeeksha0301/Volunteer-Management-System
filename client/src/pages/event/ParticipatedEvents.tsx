import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/AuthUser';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const ParticipatedEvents: React.FC = () => {
  const { participatedEvents, fetchParticipatedEvents } = useContext(Context);

  useEffect(() => {
    fetchParticipatedEvents();
  }, [fetchParticipatedEvents]);

  return (
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary dark:text-secondary">Participated Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {participatedEvents.length > 0 ? (
          participatedEvents.map((event) => (
            <div key={event._id} className="bg-white p-6 shadow-lg rounded-lg border border-primary dark:bg-gray-900 dark:border-gray-600 overflow-hidden">
              <img
                src={`http://localhost:5000/images/${event._id}.jpg`} // Replace with the correct path to the event image
                alt={event.title}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-primary dark:text-secondary">{event.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{event.description}</p>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <FaCalendarAlt className="text-lg mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <FaCheckCircle className="text-lg mr-2" />
                <span>You have participated in this event</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No participated events found.</p>
        )}
      </div>
    </div>
  );
};

export default ParticipatedEvents;
