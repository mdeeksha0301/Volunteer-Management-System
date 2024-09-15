import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../event/EventList'; // Adjust the import path as needed

const EditEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // Assuming event data structure

  useEffect(() => {
    fetchOrganizationEvents();
  }, []);

  const fetchOrganizationEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://volunteer-management-system-ybtz.onrender.com/event/organization', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching organization events:', error);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-primary w-min-screen h-min-screen">
      {/* <h2 className="text-3xl font-bold mb-4 text-primary dark:text-fifth text-center">Organization Dashboard</h2> */}
      <div className="mt-4">
      <EventList events={events} fetchOrganizationEvents={fetchOrganizationEvents} />
      </div>
    </div>
  );
};

export default EditEvents;
