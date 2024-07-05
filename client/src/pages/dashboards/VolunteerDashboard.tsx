import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ParticipatedEvents from './volunteer/ParticipatedEvents'; // Create this component
import EventDetails from '../event/EventDetails';

const VolunteerDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>

     <ParticipatedEvents />
    </div>
  );
};

export default VolunteerDashboard;
