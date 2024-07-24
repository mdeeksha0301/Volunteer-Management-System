import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaDonate, FaListAlt, FaUserFriends } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

interface Event {
    _id: string;
    count: number;
}

interface Donation {
    _id: string;
    total: number;
}

interface EventType {
    _id: string;
    count: number;
}

const generateRandomData = () => {
    const now = new Date();
    const lastMonth = new Date(now.setMonth(now.getMonth() - 1));

    return {
        monthlyEvents: [
            { _id: lastMonth.toISOString(), count: Math.floor(Math.random() * 5) },
            { _id: new Date().toISOString(), count: Math.floor(Math.random() * 30) }
        ],
        donations: [
            { _id: lastMonth.toISOString(), total: Math.floor(Math.random() * 2) },
            { _id: new Date().toISOString(), total: Math.floor(Math.random() * 5) }
        ],
        eventTypeDistribution: [
            { _id: 'Environmental', count: Math.floor(Math.random() * 70) },
            { _id: 'Social service', count: Math.floor(Math.random() * 30) },
            { _id: 'Education', count: Math.floor(Math.random() * 50) },
            { _id: 'Charity', count: Math.floor(Math.random() * 10) },
        ]
    };
};

const AdminDashboard: React.FC = () => {
    const [eventCount, setEventCount] = useState<number>(0);
    const [monthlyEvents, setMonthlyEvents] = useState<Event[]>([]);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [eventTypeDistribution, setEventTypeDistribution] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API data fetching
                const { monthlyEvents, donations, eventTypeDistribution } = generateRandomData();

                setMonthlyEvents(monthlyEvents);
                setDonations(donations);
                setEventTypeDistribution(eventTypeDistribution);

                const totalEvents = monthlyEvents.reduce((sum, event) => sum + event.count, 0);
                setEventCount(totalEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Data for the charts
    const lineChartData = {
        labels: monthlyEvents.map(event => new Date(event._id).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
        datasets: [
            {
                label: 'Number of Events',
                data: monthlyEvents.map(event => event.count),
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                fill: true,
            },
        ],
    };

    const barChartData = {
        labels: donations.map(donation => new Date(donation._id).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })),
        datasets: [
            {
                label: 'Total Donations',
                data: donations.map(donation => donation.total),
                backgroundColor: '#50E3C2',
            },
        ],
    };

    const pieChartData = {
        labels: eventTypeDistribution.map(event => event._id),
        datasets: [
            {
                data: eventTypeDistribution.map(event => event.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    color: '#333',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    color: '#333',
                },
            },
        },
    };

    return (
        <div className="p-6 space-y-6 min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <h2 className="text-3xl font-bold mb-6 text-primary dark:text-fivth text-center">Admin Dashboard</h2>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg flex items-center space-x-4">
                    <FaCalendarAlt className="text-3xl text-blue-500" />
                    <div>
                        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{eventCount}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Events</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg flex items-center space-x-4">
                    <FaListAlt className="text-3xl text-green-500" />
                    <div>
                        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            {monthlyEvents.filter(event => new Date(event._id).getMonth() === new Date().getMonth()).length}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Events This Month</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg flex items-center space-x-4">
                    <FaDonate className="text-3xl text-yellow-500" />
                    <div>
                        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            ${20}
                            {/* ${donations.reduce((total, donation) => total + donation.total, 0).toFixed(2)} */}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Donations</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg flex items-center space-x-4">
                    <FaUserFriends className="text-3xl text-red-500" />
                    <div>
                        <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">0</div> {/* Placeholder */}
                        <div className="text-sm text-gray-500 dark:text-gray-400">Top Donors</div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-fivth">Events per Month</h3>
                    <div className="h-80">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-fivth">Monthly Donations</h3>
                    <div className="h-80">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-fivth">Event Type Distribution</h3>
                    <div className="h-80">
                        <Pie data={pieChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
