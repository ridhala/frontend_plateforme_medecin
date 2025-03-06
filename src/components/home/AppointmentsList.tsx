import React from 'react';

interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Confirmed' | 'Pending';
}

export default function AppointmentsList() {
  const appointments: Appointment[] = [
    {
      id: 1,
      patient: "Rayen Dlimi",
      date: "2024-03-06",
      time: "09:00",
      reason: "Consultation initiale",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Hakim Aouini",
      date: "2024-03-07",
      time: "14:30",
      reason: "Suivi tension",
      status: "Confirmed",
    },
    {
      id: 3,
      patient: "Mohamed Ali",
      date: "2024-03-08",
      time: "10:15",
      reason: "Contrôle général",
      status: "Pending",
    },
    {
      id: 4,
      patient: "Amina Cherif",
      date: "2024-03-09",
      time: "11:00",
      reason: "Examen annuel",
      status: "Confirmed",
    },
    {
      id: 5,
      patient: "Sofiane Ben Youssef",
      date: "2024-03-10",
      time: "15:45",
      reason: "Douleur abdominale",
      status: "Confirmed",
    },
    {
      id: 6,
      patient: "Leila Saidi",
      date: "2024-03-11",
      time: "09:30",
      reason: "Suivi diabète",
      status: "Pending",
    },
    {
      id: 7,
      patient: "Yassine Trabelsi",
      date: "2024-03-12",
      time: "13:00",
      reason: "Fièvre persistante",
      status: "Confirmed",
    },
    {
      id: 8,
      patient: "Fatima Zohra",
      date: "2024-03-13",
      time: "16:00",
      reason: "Contrôle post-opératoire",
      status: "Confirmed",
    },
    {
      id: 9,
      patient: "Omar Khalfi",
      date: "2024-03-14",
      time: "10:45",
      reason: "Consultation de routine",
      status: "Pending",
    },
    {
      id: 10,
      patient: "Nadia Belhaj",
      date: "2024-03-15",
      time: "14:00",
      reason: "Douleur dorsale",
      status: "Confirmed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Rendez-vous à venir</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          + Ajouter un rendez-vous
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Heure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Raison
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.patient}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appointment.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-teal-600 hover:text-teal-900 mr-4">
                    Voir
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}