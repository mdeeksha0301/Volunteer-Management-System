// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
// }

// interface ParticipatedEventsProps {
//   volunteerId: string;
// }

// const ParticipatedEvents: React.FC<ParticipatedEventsProps> = ({ volunteerId }) => {
//   const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     const fetchParticipatedEvents = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:5000/event/participated/${volunteerId}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setParticipatedEvents(response.data.events);
//       } catch (error) {
//         console.error('Error fetching participated events:', error);
//       }
//     };

//     fetchParticipatedEvents();
//   }, [volunteerId]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Participated Events</h2>
//       <div className="space-y-4">
//         {participatedEvents.map((event) => (
//           <div key={event._id} className="bg-white p-4 shadow-md rounded-md">
//             <h3 className="text-lg font-semibold">{event.title}</h3>
//             <p className="text-gray-600">{event.description}</p>
//             <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
//             <p className="text-green-500">You have participated in this event</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ParticipatedEvents;

import React, { useContext, useEffect } from 'react';
import { Context } from '../../../context/AuthUser';

const ParticipatedEvents: React.FC = () => {
  const { participatedEvents, fetchParticipatedEvents } = useContext(Context);

  useEffect(() => {
    fetchParticipatedEvents();
  }, [fetchParticipatedEvents]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Participated Events</h2>
      <div className="space-y-4">
        {participatedEvents.length > 0 ? (
          participatedEvents.map((event) => (
            <div key={event._id} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-green-500">You have participated in this event</p>
            </div>
          ))
        ) : (
          <p>No participated events found.</p>
        )}
      </div>
    </div>
  );
};

export default ParticipatedEvents;
