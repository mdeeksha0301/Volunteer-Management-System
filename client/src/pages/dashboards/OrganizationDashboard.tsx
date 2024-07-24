import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaCalendarAlt, FaUserFriends, FaChartBar } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

interface Event {
    id: string;
    title: string;
    date: string;
    participants: number;
}

const OrganizationDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [monthlyEvents, setMonthlyEvents] = useState<number>(0);
    const [totalParticipants, setTotalParticipants] = useState<number>(0);
    const [participantCounts, setParticipantCounts] = useState<number[]>([]);
    const [eventTitles, setEventTitles] = useState<string[]>([]);
    const [monthlyParticipantCounts, setMonthlyParticipantCounts] = useState<number[]>([]);
    const [months, setMonths] = useState<string[]>([]);

    useEffect(() => {
        fetchOrganizationData();
    }, []);

    const fetchOrganizationData = () => {
        // Mock events data
        const fetchedEvents: Event[] = [
            { id: '1', title: 'Event 1', date: '2024-07-10', participants: 10 },
            { id: '2', title: 'Event 2', date: '2024-07-15', participants: 40 },
            { id: '3', title: 'Event 3', date: '2024-06-20', participants: 20 },
            { id: '4', title: 'Event 4', date: '2024-05-30', participants: 50 },
        ];

        setEvents(fetchedEvents);

        // Process events for charts and stats
        const currentMonth = new Date().getMonth();
        const monthlyEventCount = fetchedEvents.filter(event => new Date(event.date).getMonth() === currentMonth).length;
        setMonthlyEvents(monthlyEventCount);

        const totalParticipantsCount = fetchedEvents.reduce((total, event) => total + event.participants, 0);
        setTotalParticipants(totalParticipantsCount);

        // Process event data for charts
        const participantCounts = fetchedEvents.map(event => event.participants);
        const eventTitles = fetchedEvents.map(event => event.title);
        setParticipantCounts(participantCounts);
        setEventTitles(eventTitles);

        // Monthly participant counts
        const monthlyParticipantCounts = Array(12).fill(0);
        fetchedEvents.forEach(event => {
            const month = new Date(event.date).getMonth();
            monthlyParticipantCounts[month] += event.participants;
        });
        setMonthlyParticipantCounts(monthlyParticipantCounts);

        // Set months for x-axis
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        setMonths(monthNames);
    };

    // Charts data
    const participantPerEventData = {
        labels: eventTitles,
        datasets: [
            {
                label: 'Participants per Event',
                data: participantCounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const monthlyParticipantData = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Participants',
                data: monthlyParticipantCounts,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-primary text-center dark:text-white">Organization Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {/* Total Events */}
                <div className="bg-white border border-primary p-4 rounded-lg shadow-md flex items-center dark:bg-gray-900 dark:border-gray-600">
                    <FaCalendarAlt className="text-4xl text-primary mr-4 dark:text-secondary" />
                    <div>
                        <h3 className="text-lg font-semibold text-primary dark:text-secondary">Total Events</h3>
                        <p className="text-xl text-black dark:text-white">{events.length}</p>
                    </div>
                </div>

                {/* Events This Month */}
                <div className="bg-white border border-primary p-4 rounded-lg shadow-md flex items-center dark:bg-gray-900 dark:border-gray-600">
                    <FaCalendarAlt className="text-4xl text-primary mr-4 dark:text-secondary" />
                    <div>
                        <h3 className="text-lg font-semibold text-primary dark:text-secondary">Events This Month</h3>
                        <p className="text-xl text-black dark:text-white">{monthlyEvents}</p>
                    </div>
                </div>

                {/* Total Participants */}
                <div className="bg-white border border-primary p-4 rounded-lg shadow-md flex items-center dark:bg-gray-900 dark:border-gray-600">
                    <FaUserFriends className="text-4xl text-primary mr-4 dark:text-secondary" />
                    <div>
                        <h3 className="text-lg font-semibold text-primary dark:text-secondary">Total Participants</h3>
                        <p className="text-xl text-black dark:text-white">{totalParticipants}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Participants per Event Chart */}
                <div className="bg-white border border-primary p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-600">
                    <h3 className="text-lg font-semibold mb-4 text-primary dark:text-secondary">Participants per Event</h3>
                    <Line data={participantPerEventData} />
                </div>

                {/* Monthly Participants Bar Chart */}
                <div className="bg-white border border-primary p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-600">
                    <h3 className="text-lg font-semibold mb-4 text-primary dark:text-secondary">Monthly Participants</h3>
                    <Bar data={monthlyParticipantData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top' as const,
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return `Participants: ${tooltipItem.raw}`;
                                    }
                                }
                            }
                        }
                    }} />
                </div>
            </div>
        </div>
    );
};

export default OrganizationDashboard;
