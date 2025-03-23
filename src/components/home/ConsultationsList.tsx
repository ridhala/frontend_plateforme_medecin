import React, { useState } from 'react';

interface Consultation {
  id: number; // Temporary ID for rendering
  medecin: string; // Reference to doctor (simplified as string for UI)
  cin_patient: number; // Reference to patient CIN
  diagnostic: string; // Diagnosis
  remarque: string; // Remarks (optional)
  rapport: string; // Report (optional)
  patient: string; // Reference to patient (simplified as string for UI)
  date: string; // Consultation date
  antécédents: string; // Medical history
}

export default function ConsultationsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const consultations: Consultation[] = [
    {
      id: 1,
      medecin: "Dr. Ahmed Ben Salah",
      cin_patient: 123456789,
      diagnostic: "Hypertension",
      remarque: "Suivi régulier recommandé",
      rapport: "Pression artérielle contrôlée",
      patient: "Mohamed Ali",
      date: "2024-03-05",
      antécédents: "Antécédents familiaux d'hypertension",
    },
    {
      id: 2,
      medecin: "Dr. Leila Haddad",
      cin_patient: 987654321,
      diagnostic: "Diabète de type 2",
      remarque: "",
      rapport: "Ajustement de l'insuline",
      patient: "Hakim Aouini",
      date: "2024-03-04",
      antécédents: "Obésité, prédisposition génétique",
    },
    {
      id: 3,
      medecin: "Dr. Samir Ben Ali",
      cin_patient: 456789123,
      diagnostic: "Infection respiratoire",
      remarque: "Antibiotiques prescrits",
      rapport: "Toux persistante",
      patient: "Rayen Dlimi",
      date: "2024-03-06",
      antécédents: "Asthme léger",
    },
    {
      id: 4,
      medecin: "Dr. Fatima Zarka",
      cin_patient: 789123456,
      diagnostic: "Contrôle annuel",
      remarque: "",
      rapport: "Résultats normaux",
      patient: "Amina Cherif",
      date: "2024-03-03",
      antécédents: "Aucun antécédent notable",
    },
    {
      id: 5,
      medecin: "Dr. Omar Khaldi",
      cin_patient: 321654987,
      diagnostic: "Gastrite",
      remarque: "Régime alimentaire recommandé",
      rapport: "Endoscopie prévue",
      patient: "Sofiane Ben Youssef",
      date: "2024-03-07",
      antécédents: "Ulcère passé",
    },
    {
      id: 6,
      medecin: "Dr. Nadia Essid",
      cin_patient: 654987321,
      diagnostic: "Suivi diabète",
      remarque: "Contrôle glycémie",
      rapport: "Stable",
      patient: "Leila Saidi",
      date: "2024-03-02",
      antécédents: "Diabète depuis 5 ans",
    },
    {
      id: 7,
      medecin: "Dr. Youssef Ben Amor",
      cin_patient: 147258369,
      diagnostic: "Fièvre",
      remarque: "Analyses en cours",
      rapport: "",
      patient: "Yassine Trabelsi",
      date: "2024-03-08",
      antécédents: "Aucun",
    },
    {
      id: 8,
      medecin: "Dr. Hichem Zouari",
      cin_patient: 258369147,
      diagnostic: "Post-opératoire",
      remarque: "",
      rapport: "Récupération en cours",
      patient: "Fatima Zohra",
      date: "2024-03-01",
      antécédents: "Chirurgie récente",
    },
    {
      id: 9,
      medecin: "Dr. Amel Ben Rhouma",
      cin_patient: 369147258,
      diagnostic: "Consultation annulée",
      remarque: "Patient indisponible",
      rapport: "",
      patient: "Omar Khalfi",
      date: "2024-03-09",
      antécédents: "Aucun",
    },
  ];

  const handleAddConsultation = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form data (e.g., API call) here
    console.log("Form submitted"); // Placeholder for submission logic
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-semibold text-gray-800">Historique des Consultations</h2>
        <button
          onClick={handleAddConsultation}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          + Ajouter une consultation
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajouter une nouvelle consultation</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Médecin</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CIN Patient</label>
              <input
                type="number"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Diagnostic</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarque</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rapport</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Antécédents</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCloseForm}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Médecin
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CIN Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnostic
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarque
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rapport
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Antécédents
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {consultation.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.medecin}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.cin_patient}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.diagnostic}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.remarque || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.rapport || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.patient}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {consultation.antécédents}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <button className="text-teal-600 hover:text-teal-900 mr-2">
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
      )}
    </div>
  );
}