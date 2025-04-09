import { FaUserPlus, FaUserMd, FaHeartbeat, FaDollarSign } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticsSectionProps {
  activeSection: string | null;
}

export default function StatisticsSection({ activeSection }: StatisticsSectionProps) {
  // Chart data for Patients, Consultations, and Appointments
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Months
    datasets: [
      {
        label: 'Patients',
        data: [45, 50, 55, 60, 65, 70],
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curve
      },
      {
        label: 'Consultations',
        data: [90, 85, 95, 100, 105, 110],
        borderColor: 'rgba(75, 192, 192, 1)', // Green
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curve
      },
      {
        label: 'Appointments',
        data: [50, 55, 60, 65, 70, 75],
        borderColor: 'rgba(255, 99, 132, 1)', // Red
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Chart options for a professional look
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
          },
          color: '#4B5563', // Gray-700
        },
      },
      title: {
        display: false, // We already have a title in the component
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: '#4B5563', // Gray-700
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
        },
        ticks: {
          color: '#4B5563', // Gray-700
          beginAtZero: true,
        },
      },
    },
  };

  if (!activeSection || activeSection === "Dashboard") {
    return (
      <div className="space-y-6"> {/* Single parent div to wrap all elements */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">New Patients</p>
              <h3 className="text-xl font-bold text-gray-800">45</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserMd className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Our Doctor</p>
              <h3 className="text-xl font-bold text-gray-800">23</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaHeartbeat className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Operation</p>
              <h3 className="text-xl font-bold text-gray-800">14</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaDollarSign className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Income</p>
              <h3 className="text-xl font-bold text-gray-800">$5728</h3>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics Overview</h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
         
            
          
        </div>
      </div>
    );
  }

  if (activeSection === "patients") {
    return (
      <div className="space-y-6"> {/* Single parent div for Patients section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Total Patients</p>
              <h3 className="text-xl font-bold text-gray-800">120</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">New This Month</p>
              <h3 className="text-xl font-bold text-gray-800">15</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaHeartbeat className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">In Follow-up</p>
              <h3 className="text-xl font-bold text-gray-800">85</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Active Consultations</p>
              <h3 className="text-xl font-bold text-gray-800">30</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "rendez-vous") {
    return (
      <div className="space-y-6"> {/* Single parent div for Rendez-vous section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Total Appointments</p>
              <h3 className="text-xl font-bold text-gray-800">50</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Today</p>
              <h3 className="text-xl font-bold text-gray-800">8</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Confirmed</p>
              <h3 className="text-xl font-bold text-gray-800">35</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Pending</p>
              <h3 className="text-xl font-bold text-gray-800">10</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === "consultations") {
    return (
      <div className="space-y-6"> {/* Single parent div for Consultations section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Total Consultations</p>
              <h3 className="text-xl font-bold text-gray-800">90</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">This Month</p>
              <h3 className="text-xl font-bold text-gray-800">25</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Completed</p>
              <h3 className="text-xl font-bold text-gray-800">70</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Urgent</p>
              <h3 className="text-xl font-bold text-gray-800">15</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // For "Profil" or other sections
}