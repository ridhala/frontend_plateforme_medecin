import React from 'react';

interface Consultation {
  id: number;
  patient: string;
  date: string;
  details: string;
  consultType: 'Routine' | 'Urgent' | 'Follow-up';
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export default function ConsultationsList() {
  const consultations: Consultation[] = [
    {
      id: 1,
      patient: "Mohamed Ali",
      date: "2024-03-05",
      details: "Contrôle général",
      consultType: "Routine",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Hakim Aouini",
      date: "2024-03-04",
      details: "Suivi tension",
      consultType: "Follow-up",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Rayen Dlimi",
      date: "2024-03-06",
      details: "Consultation initiale",
      consultType: "Routine",
      status: "Pending",
    },
    {
      id: 4,
      patient: "Amina Cherif",
      date: "2024-03-03",
      details: "Examen annuel",
      consultType: "Routine",
      status: "Completed",
    },
    {
      id: 5,
      patient: "Sofiane Ben Youssef",
      date: "2024-03-07",
      details: "Douleur abdominale",
      consultType: "Urgent",
      status: "Pending",
    },
    {
      id: 6,
      patient: "Leila Saidi",
      date: "2024-03-02",
      details: "Suivi diabète",
      consultType: "Follow-up",
      status: "Completed",
    },
    {
      id: 7,
      patient: "Yassine Trabelsi",
      date: "2024-03-08",
      details: "Fièvre persistante",
      consultType: "Urgent",
      status: "Pending",
    },
    {
      id: 8,
      patient: "Fatima Zohra",
      date: "2024-03-01",
      details: "Contrôle post-opératoire",
      consultType: "Follow-up",
      status: "Completed",
    },
    {
      id: 9,
      patient: "Omar Khalfi",
      date: "2024-03-09",
      details: "Consultation annulée",
      consultType: "Routine",
      status: "Cancelled",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Historique des Consultations</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          + Ajouter une consultation
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
                Détails
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type de Consultation
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
            {consultations.map((consultation) => (
              <tr
                key={consultation.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {consultation.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {consultation.patient}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {consultation.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {consultation.details}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      consultation.consultType === "Routine"
                        ? "bg-blue-100 text-blue-800"
                        : consultation.consultType === "Urgent"
                        ? "bg-red-100 text-red-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {consultation.consultType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      consultation.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : consultation.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {consultation.status}
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