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

import { useEffect, useState } from 'react';
import { getstatrendezvous } from '../../services/serviceshome/rendezvousservice';
import { statrendez,statconsultation, statpatient } from '../../types/statistiquetype';
import { getstatconsultation } from '../../services/serviceshome/consultationservice';
import { statistiquepatients } from '../../services/serviceshome/patientservice';

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
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [rendezstats, setrendezStats] = useState<statrendez>({
    MounthRendezvous: 0,
    rendezvousToday: 0,
    rendezvousConfirmer: 0,
    rendezvousensalle: 0,
  });
//////////////////
const [patientsatat, setpatientstat]=useState<statpatient>({
  tottalpatient: 0,
  nouveauxdemois: 0,
  nouveaudujournee: 0
})
/////////////////
  const [consultationstats, setconsultationStats] = useState<statconsultation>({
   Mounthconsultation: 0,
  consultationToday: 0,
  consultationcontrol: 0,
  consultationvisite: 0
  });
  //////////
useEffect(() =>{
  const fetchpatientStats = async () => {
try{
const data =await  statistiquepatients()
setpatientstat(data)
}
catch (error) {
  console.error(error);
}
};  fetchpatientStats();
}, )


  useEffect(() => {
    const fetchrendezStats = async () => {
      try {
        const data = await getstatrendezvous();
        setrendezStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchrendezStats();
  }, []);


  useEffect(() => {
    const fetchconsultationStats = async () => {
      try {
        const data = await getstatconsultation();
        setconsultationStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchconsultationStats();
  }, []);





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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">toutes les Patients</p>
              <h3 className="text-xl font-bold text-gray-800">{patientsatat.tottalpatient}</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">nouveaux dans ce mois</p>
              <h3 className="text-xl font-bold text-gray-800">{patientsatat.nouveauxdemois}</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">nouveau aujourd'hui</p>
              <h3 className="text-xl font-bold text-gray-800">{patientsatat.nouveaudujournee}</h3>
            </div>
          </div>
        { /* <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
            <p className="text-gray-500">nouveau aujourd'hui</p>
            <h3 className="text-xl font-bold text-gray-800">{patientsatat.nouveaudujournee}</h3>
            </div>
          </div>*/}
        </div>
      </div>
    );
  }

  if (activeSection === "rendez-vous") {
    
   
  
    return (
      <div className="space-y-6">
       
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUserPlus className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Rendez-vous du mois</p>
            <h3 className="text-xl font-bold text-gray-800">{rendezstats.MounthRendezvous}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUserPlus className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Rendez-vous d'aujourd'hui</p>
            <h3 className="text-xl font-bold text-gray-800">{rendezstats.rendezvousToday}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUserPlus className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Rendez-vous confirmés</p>
            <h3 className="text-xl font-bold text-gray-800">{rendezstats.rendezvousConfirmer}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUserPlus className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">En salle d'attente</p>
            <h3 className="text-xl font-bold text-gray-800">{rendezstats.rendezvousensalle}</h3>
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
              <p className="text-gray-500">Consultations du mois</p>
              <h3 className="text-xl font-bold text-gray-800">{consultationstats.Mounthconsultation}</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Aujourd'hui</p>
              <h3 className="text-xl font-bold text-gray-800">{consultationstats.consultationToday}</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Control</p>
              <h3 className="text-xl font-bold text-gray-800">{consultationstats.consultationcontrol}</h3>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Visite</p>
              <h3 className="text-xl font-bold text-gray-800">{consultationstats.consultationvisite}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // For "Profil" or other sections
}

function getRendezvousStats(selectedDate: string) {
  throw new Error('Function not implemented.');
}
