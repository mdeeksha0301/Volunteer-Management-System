// EventList.tsx
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
      await axios.delete(`http://localhost:5000/event/${eventId}`, {
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id}>
            <EventItem
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;