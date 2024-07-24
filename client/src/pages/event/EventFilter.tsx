import React, { useState } from 'react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
}

interface EventFilterProps {
  events: Event[];
  onFilter: (filteredEvents: Event[]) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ events, onFilter }) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleFilter = () => {
    let filtered = events;

    if (location) {
      filtered = filtered.filter(event => event.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (type) {
      filtered = filtered.filter(event => event.type.toLowerCase() === type.toLowerCase());
    }

    onFilter(filtered);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-secondary text-center">Filter Events</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition duration-200"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition duration-200"
          >
            <option value="">Select type</option>
<option value="Environmental">Environmental</option>
<option value="Social Service">Social Service</option>
<option value="Animal Welfare">Animal Welfare</option>
<option value="Community Service">Community Service</option>
<option value="Health">Health</option>
<option value="Education">Education</option>

            {/* Add more types as needed */}
          </select>
        </div>
        <div className="flex items-end mt-4 sm:mt-0">
          <button
            onClick={handleFilter}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
