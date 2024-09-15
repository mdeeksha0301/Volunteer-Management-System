import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { Context } from '../../context/AuthUser'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; // Using react-modal for simplicity

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  city: string;
  country: string;
  image?: string; // image is optiona
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://volunteer-management-system-ybtz.onrender.com/event/opportunities');
      setEvents(response.data); // Correctly update state with fetched data
    } catch (error) {
      toast.error("Error fetching events");
    }
  };

  const openRegisterModal = (event: Event) => {
    if (!isAuthorized) {
      toast.error("You need to log in to register for an event");
      navigate('/login');
      return;
    }
    setSelectedEvent(event);
    setFormData({
      userName: user.userName || '',
      email: user.email,
      phoneNumber: user.phoneNumber?.toString() || '',
    });
    setModalIsOpen(true);
  };

  const closeRegisterModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://volunteer-management-system-ybtz.onrender.com/event/register', {
        userId: user._id,
        eventId: selectedEvent?._id,
      });
      toast.success("Successfully registered for the event");
      closeRegisterModal();
    } catch (error) {
      toast.error("Error registering for the event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Volunteer Opportunities</h1>
      {events.length === 0 ? (
        <p>No volunteer opportunities available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.city}, {event.country}</p>
              {event.image && <img src={event.image} alt={event.title} className="mt-2" />}
              <button
                onClick={() => openRegisterModal(event)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register for Event"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-semibold">Register for {selectedEvent?.title}</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Join Event
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
