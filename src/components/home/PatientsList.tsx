import React from 'react';

export default function PatientsList() {
  const patients = [
    { name: "Rayen Dlimi", age: 22 },
    { name: "Hakim Aouini", age: 45 },
    { name: "Mohamed Ali", age: 28 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Liste des Patients</h2>
      <ul className="list-disc pl-5">
        {patients.map((patient, index) => (
          <li key={index} className="py-1">{patient.name} - {patient.age} ans</li>
        ))}
      </ul>
    </div>
  );
}