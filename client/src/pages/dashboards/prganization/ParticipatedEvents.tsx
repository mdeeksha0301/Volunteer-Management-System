import React, { useContext, useEffect } from 'react';
import { Context } from '../../../context/AuthUser';
import { FaCheckCircle } from 'react-icons/fa'; // Importing the React Icon for check circle

const ParticipatedEvents: React.FC = () => {
  const { participatedEvents, fetchParticipatedEvents, user, token } = useContext(Context);

  useEffect(() => {
    if (token && user) {
      fetchParticipatedEvents();
    }
  }, [token, user, fetchParticipatedEvents]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Participated Events</h2>
      <div className="space-y-4">
        {participatedEvents.length > 0 ? (
          participatedEvents.map((event) => (
            <div key={event._id} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <div className="flex items-center mt-2">
                <FaCheckCircle className="text-green-500 mr-2" /> {/* React Icon for check circle */}
                <p className="text-green-500">You have participated in this event</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No participated events found.</p>
        )}
      </div>
    </div>
  );
};

export default ParticipatedEvents;
