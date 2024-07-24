import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Model from '../../components/Model'; // Adjust the import path as needed
import EventForm from './EventForm'; // Adjust the import path as needed

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

  // Fallback image if event does not have an image
  const imageSrc = event.image || "https://via.placeholder.com/150?text=Event";

  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg p-4 rounded-lg ">
      <h3 className="text-xl font-semibold mb-2 text-gray-300 dark:text-900">{event.title}</h3>
      <img src={imageSrc} alt={event.title} className="w-full h-48 object-cover mb-2 rounded-md" />
      <p className="text-base mb-2">{event.description}</p>
      <p className="text-base mb-2"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p className="text-base mb-2"><strong>Location:</strong> {event.location}</p>
      <p className="text-base mb-2"><strong>Type:</strong> {event.type}</p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleEdit}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark flex items-center"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
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
