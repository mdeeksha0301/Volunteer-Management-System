// OrganizationDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import EventForm from './prganization/EventForm';
import EventList from '../event/EventList';
// import EventForm from '../event/EventForm';

const OrganizationDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]); // Assuming event data structure

  useEffect(() => {
    fetchOrganizationEvents();
  }, []);

  const fetchOrganizationEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/event/organization', {
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
    <div className="container p-4 dark:bg-primary bg-white min-h-screen max-w-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-fifth text-primary">Organization Dashboard</h2>
      {/* <EventForm fetchOrganizationEvents={fetchOrganizationEvents} /> */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-4 dark:text-secondary">Your Events</h3>
        <EventList events={events} fetchOrganizationEvents={fetchOrganizationEvents} />
      </div>
    </div>
  );
};

export default OrganizationDashboard;