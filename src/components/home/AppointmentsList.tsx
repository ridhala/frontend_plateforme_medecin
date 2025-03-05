import React from 'react';

export default function AppointmentsList() {
  const appointments = [
    { patient: "Rayen Dlimi", date: "2024-03-06" },
    { patient: "Hakim Aouini", date: "2024-03-07" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Rendez-vous à venir</h2>
      <ul className="list-disc pl-5 space-y-2">
        {appointments.map((appointment, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded-lg">
            {appointment.patient} - {appointment.date}
          </li>
        ))}
      </ul>
    </div>
  );
}