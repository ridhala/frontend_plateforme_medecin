import React from 'react';

interface Patient {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
  status: 'Active' | 'Inactive';
}

export default function PatientsList() {
  const patients: Patient[] = [
    { id: 1, name: "Rayen Dlimi", age: 22, lastVisit: "2024-03-01", status: "Active" },
    { id: 2, name: "Hakim Aouini", age: 25, lastVisit: "2024-02-28", status: "Active" },
    { id: 3, name: "Mohamed Ali", age: 28, lastVisit: "2024-01-05", status: "Inactive" },
    { id: 1, name: "Rafik ben ali", age: 32, lastVisit: "2024-06-01", status: "Active" },
    { id: 2, name: "yasmine jalel", age: 45, lastVisit: "2024-04-28", status: "Active" },
    { id: 3, name: "nouri rahmeni", age: 38, lastVisit: "2024-08-05", status: "Inactive" },
    { id: 3, name: "Achref ben jannet", age: 38, lastVisit: "2024-08-05", status: "Inactive" },
    { id: 3, name: "Sihem mostfa", age: 38, lastVisit: "2024-08-05", status: "Inactive" },
    { id: 3, name: "Ala ahmed", age: 31, lastVisit: "2024-08-06", status: "Inactive" },
  ];
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Patients</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          + Ajouter un patient
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
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Âge
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dernière visite
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
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.age} ans
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {patient.status}
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