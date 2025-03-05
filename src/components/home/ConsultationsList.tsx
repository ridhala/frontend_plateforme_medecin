import React from 'react';

export default function ConsultationsList() {
  const consultations = [
    { patient: "Mohamed Ali", date: "2024-03-05", details: "Contrôle général" },
    { patient: "Hakim Aouini", date: "2024-03-04", details: "Suivi tension" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Historique des Consultations</h2>
      <ul className="list-disc pl-5 space-y-2">
        {consultations.map((consultation, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded-lg">
            {consultation.patient} - {consultation.date} ({consultation.details})
          </li>
        ))}
      </ul>
    </div>
  );
}