// EventItem.tsx
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Model from '../../components/Model';  // Adjust the import path as needed
import EventForm from './EventForm';  // Adjust the import path as needed

interface EventItemProps {
  event: any; // Assuming event data structure
  onEdit: (event: any) => void;
  onDelete: (eventId: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(event._id);
  };

  return (
    <div className="bg-white dark:bg-secondary p-4 rounded-md shadow-md relative z-0">
      <p className="text-lg font-semibold text-primary dark:text-fifth">{event.title}</p>
      <p className="text-gray-600 dark:text-fourth">{event.description}</p>
      <p className="text-gray-500 dark:text-third">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-500 dark:text-third">
        Location: {event.location}, {event.city}, {event.country}
      </p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={handleEdit}
          className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
      <Model isOpen={isModalOpen} onClose={handleCloseModal}>
        <EventForm
          event={event}
          onCancel={handleCloseModal}
          fetchOrganizationEvents={() => {}} // You can add a fetch function or leave it empty
        />
      </Model>
    </div>
  );
};

export default EventItem;