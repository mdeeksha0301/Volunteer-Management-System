import React, { useState } from 'react';
import EventItem from './EventItem';
import axios from 'axios';
import toast from 'react-hot-toast';

interface EventListProps {
  events: any[]; // Assuming event data structure
  fetchOrganizationEvents: () => void;
}

const EventList: React.FC<EventListProps> = ({ events, fetchOrganizationEvents }) => {
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const handleEdit = (event: any) => {
    setEditingEvent(event);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleDelete = async (eventId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://volunteer-management-system-ybtz.onrender.com/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Event deleted successfully');
      fetchOrganizationEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event');
    }
  };

  return (
    <div className="min-h-screen bg-secondary dark:bg-gray-800">
      <div className="w-full max-w-7xl  mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary dark:text-fivth">Your Events</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {events.map((event) => (
            <div key={event._id} className="bg-white dark:bg-gray-900 border border-primary p-4 text-gray-300 dark:text-900 rounded-md shadow-md">
              <EventItem
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
