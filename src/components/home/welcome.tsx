import { useState } from "react";

// Define Consultation Type
interface Consultation {
  id: number;
  patient: string;
  date: string;
  details: string;
}

// Modal Component (Reusable)
const ConsultationModal = ({
  consultation,
  onClose,
}: {
  consultation: Consultation;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h3 className="text-xl font-bold text-indigo-600">Consultation Details</h3>
        <p><strong>Patient:</strong> {consultation.patient}</p>
        <p><strong>Date:</strong> {consultation.date}</p>
        <p><strong>Details:</strong> {consultation.details}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main Table Component
function ConsultationTable() {
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // Sample consultations data
  const consultations: Consultation[] = [
    { id: 1, patient: "John Doe", date: "2025-04-01", details: "Routine check-up" },
    { id: 2, patient: "Jane Smith", date: "2025-04-02", details: "Follow-up appointment" },
    { id: 3, patient: "Alice Brown", date: "2025-04-03", details: "Blood test review" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Consultations</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id} className="border-b">
              <td
                className="px-4 py-2 text-indigo-600 font-bold cursor-pointer hover:underline"
                onClick={() => setSelectedConsultation(consultation)}
              >
                {consultation.id}
              </td>
              <td className="px-4 py-2">{consultation.patient}</td>
              <td className="px-4 py-2">{consultation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal should be outside the table but always present */}
      {selectedConsultation && (
        <ConsultationModal consultation={selectedConsultation} onClose={() => setSelectedConsultation(null)} />
      )}
    </div>
  );
}

export default ConsultationTable;
