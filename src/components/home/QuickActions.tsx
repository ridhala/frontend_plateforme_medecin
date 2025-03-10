import React from 'react';
import { FaUserPlus, FaCalendarCheck } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

function QuickActions() {
  // Data for the Line Chart (Patient Registrations over Time)
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
    datasets: [
      {
        label: 'Patient Registrations',
        data: [10, 15, 8, 20, 12, 18, 14],
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Options for the Line Chart
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 12 },
          color: '#4B5563', // Gray-700
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 12 },
        bodyFont: { size: 10 },
        padding: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#4B5563' },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: '#4B5563', beginAtZero: true },
      },
    },
  };

  // Data for the Bar Chart (Appointments per Day)
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Appointments',
        data: [5, 8, 3, 10, 6, 4, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the Bar Chart
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 12 },
          color: '#4B5563',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 12 },
        bodyFont: { size: 10 },
        padding: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#4B5563' },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: '#4B5563', beginAtZero: true },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Les Statistiques, Doctor Rayen:</h3>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Patient Registrations */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Patient Registrations (Weekly)</h4>
          <div className="h-48">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Bar Chart: Appointments per Day */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Appointments per Day (Weekly)</h4>
          <div className="h-48">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      

      

       
      </div>
    </div>
  );
}

export default QuickActions;