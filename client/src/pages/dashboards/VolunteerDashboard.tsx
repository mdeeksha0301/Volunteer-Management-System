import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { FaCalendarAlt, FaHandHoldingHeart, FaDonate, FaUsers } from 'react-icons/fa';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

interface Event {
    id: string;
    title: string;
    date: string;
    participants: number;
}

interface Donation {
    amount: number;
    date: string;
}

const VolunteerDashboard: React.FC = () => {
    // Mock data
    const mockEvents: Event[] = [
        { id: '1', title: 'Community Cleanup', date: '2024-07-05', participants: 2 },
        { id: '2', title: 'Food Drive', date: '2024-07-12', participants: 5 },
        { id: '3', title: 'Charity Run', date: '2024-06-18', participants: 3 },
        { id: '4', title: 'Tree Plantation', date: '2024-05-22', participants: 4 }
    ];

    const mockDonations: Donation[] = [
        { amount: 50, date: '2024-07-10' },
        { amount: 30, date: '2024-07-15' },
        { amount: 20, date: '2024-06-20' },
        { amount: 40, date: '2024-05-30' }
    ];

    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [donations, setDonations] = useState<Donation[]>(mockDonations);
    const [monthlyEvents, setMonthlyEvents] = useState<number>(0);
    const [totalDonations, setTotalDonations] = useState<number>(0);
    const [eventTitles, setEventTitles] = useState<string[]>([]);
    const [eventParticipants, setEventParticipants] = useState<number[]>([]);
    const [donationCategories, setDonationCategories] = useState<number[]>([]);
    const [eventDates, setEventDates] = useState<string[]>([]);
    const [eventParticipations, setEventParticipations] = useState<number[]>([]);

    useEffect(() => {
        // Process event data for stats and charts
        const monthlyEventCount = events.filter(event => new Date(event.date).getMonth() === new Date().getMonth()).length;

        const totalDonationsAmount = donations.reduce((total, donation) => total + donation.amount, 0);

        // Process event data for charts
        const eventTitles = events.map(event => event.title);
        const eventParticipants = events.map(event => event.participants);
        const eventDates = events.map(event => new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        const eventParticipations = events.map(event => event.participants);

        setEventTitles(eventTitles);
        setEventParticipants(eventParticipants);
        setEventDates(eventDates);
        setEventParticipations(eventParticipations);

        // Process donation data for pie chart
        const donationCategories = donations.map(donation => donation.amount);
        setDonationCategories(donationCategories);

        setMonthlyEvents(monthlyEventCount);
        setTotalDonations(totalDonationsAmount);
    }, [events, donations]);

    // Line Chart data for Event Participation Over Time
    const participationData = {
        labels: eventDates,
        datasets: [
            {
                label: 'Participants per Event',
                data: eventParticipations,
                borderColor: '#55C2C3', // Primary color
                backgroundColor: 'rgba(85, 194, 195, 0.2)', // Primary color with transparency
                fill: true,
            },
        ],
    };

    // Pie Chart data for Donations Breakdown
    const donationData = {
        labels: donations.map((_, index) => `Donation ${index + 1}`),
        datasets: [{
            data: donationCategories,
            backgroundColor: [
                '#C9D1D5', // Secondary color
                '#55C2C3', // Primary color
                '#7E8C9C', // Fourth color
                '#011c2b'  // Primary color darker
            ],
        }],
    };

    return (
        <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className=" mb-6">
                <h2 className="text-2xl font-bold mb-4 border-primary text-primary text-center dark:text-secondary">Volunteer Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Total Events This Month */}
                    <div className="bg-white p-4 rounded shadow-md border border-primary flex items-center justify-center dark:bg-gray-900 dark:border-gray-600">
                        <FaCalendarAlt className="text-3xl mr-4 text-primary dark:text-secondary" />
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-primary dark:text-secondary">Events This Month</h3>
                            <p className="text-xl text-primary dark:text-secondary">{monthlyEvents}</p>
                        </div>
                    </div>

                    {/* Total Donations */}
                    <div className="bg-white p-4 rounded shadow-md border border-primary flex items-center justify-center dark:bg-gray-900 dark:border-gray-600">
                        <FaDonate className="text-3xl mr-4 text-primary dark:text-secondary" />
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-primary dark:text-secondary">Total Donations</h3>
                            {/* <p className="text-xl text-primary dark:text-secondary">${totalDonations.toFixed(2)}</p> */}
                            <p className="text-xl text-primary dark:text-secondary">${20}</p>
                        </div>
                    </div>

                    {/* Total Hours Volunteered */}
                    <div className="bg-white p-4 rounded shadow-md border border-primary flex items-center justify-center dark:bg-gray-900 dark:border-gray-600">
                        <FaHandHoldingHeart className="text-3xl mr-4 text-primary dark:text-secondary" />
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-primary dark:text-secondary">Total Hours Volunteered</h3>
                            <p className="text-xl text-primary dark:text-secondary">{events.length * 2} Hours</p> {/* Assuming 2 hours per event for simplicity */}
                        </div>
                    </div>

                    {/* Total Participation */}
                    <div className="bg-white p-4 rounded shadow-md border border-primary flex items-center justify-center dark:bg-gray-900 dark:border-gray-600">
                        <FaUsers className="text-3xl mr-4 text-primary dark:text-secondary" />
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-primary dark:text-secondary">Total Participants</h3>
                            <p className="text-xl text-primary dark:text-secondary">{events.reduce((total, event) => total + event.participants, 0)}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    {/* Line Chart for Event Participation Over Time */}
                    <div className="bg-white p-4 rounded shadow-md border border-primary dark:bg-gray-900 dark:border-gray-600">
                        <h3 className="text-lg font-bold mb-4 text-primary dark:text-secondary text-center">Event Participation Over Time</h3>
                        <Line data={participationData} />
                    </div>

                    {/* Pie Chart for Donations Breakdown */}
                    <div className="bg-white p-4 rounded shadow-md border border-primary flex justify-center items-center dark:bg-gray-900 dark:border-gray-600">
                        <div className="w-58 h-58"> {/* Adjust the width and height as needed */}
                            <h3 className="text-lg font-bold mb-4 text-primary dark:text-secondary text-center">Donations Overview</h3>
                            <Pie data={donationData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
