import React, { useState } from 'react';

interface Appointment {
  id: number; // Temporary ID for rendering
  date_rendez_vous: string; // Appointment date
  prenom_patient: string; // Patient first name
  nom_patient: string; // Patient last name
  cin_patient: number; // Patient CIN
  telephone: number; // Patient phone number
  specialite: string; // Specialty (simplified as string for UI)
  medecin: string; // Doctor (simplified as string for UI)
  status: boolean; // Appointment status (false = pending/scheduled, true = confirmed)
}

export default function AppointmentsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const appointments: Appointment[] = [
    {
      id: 1,
      date_rendez_vous: "2024-03-06",
      prenom_patient: "Rayen",
      nom_patient: "Dlimi",
      cin_patient: 123456789,
      telephone: 987654321,
      specialite: "Cardiologie",
      medecin: "Dr. Ahmed Ben Salah",
      status: false, // Scheduled/Pending
    },
    {
      id: 2,
      date_rendez_vous: "2024-03-07",
      prenom_patient: "Hakim",
      nom_patient: "Aouini",
      cin_patient: 987654321,
      telephone: 123456789,
      specialite: "Endocrinologie",
      medecin: "Dr. Leila Haddad",
      status: true, // Confirmed
    },
    {
      id: 3,
      date_rendez_vous: "2024-03-08",
      prenom_patient: "Mohamed",
      nom_patient: "Ali",
      cin_patient: 456789123,
      telephone: 456789123,
      specialite: "Médecine générale",
      medecin: "Dr. Samir Ben Ali",
      status: false, // Scheduled/Pending
    },
    {
      id: 4,
      date_rendez_vous: "2024-03-09",
      prenom_patient: "Amina",
      nom_patient: "Cherif",
      cin_patient: 789123456,
      telephone: 789123456,
      specialite: "Gynécologie",
      medecin: "Dr. Fatima Zarka",
      status: false, // Scheduled/Pending
    },
    {
      id: 5,
      date_rendez_vous: "2024-03-10",
      prenom_patient: "Sofiane",
      nom_patient: "Ben Youssef",
      cin_patient: 321654987,
      telephone: 321654987,
      specialite: "Gastro-entérologie",
      medecin: "Dr. Omar Khaldi",
      status: true, // Confirmed
    },
    {
      id: 6,
      date_rendez_vous: "2024-03-11",
      prenom_patient: "Leila",
      nom_patient: "Saidi",
      cin_patient: 654987321,
      telephone: 654987321,
      specialite: "Endocrinologie",
      medecin: "Dr. Nadia Essid",
      status: false, // Scheduled/Pending
    },
    {
      id: 7,
      date_rendez_vous: "2024-03-12",
      prenom_patient: "Yassine",
      nom_patient: "Trabelsi",
      cin_patient: 147258369,
      telephone: 147258369,
      specialite: "Infectiologie",
      medecin: "Dr. Youssef Ben Amor",
      status: false, // Scheduled/Pending
    },
    {
      id: 8,
      date_rendez_vous: "2024-03-13",
      prenom_patient: "Fatima",
      nom_patient: "Zohra",
      cin_patient: 258369147,
      telephone: 258369147,
      specialite: "Chirurgie",
      medecin: "Dr. Hichem Zouari",
      status: true, // Confirmed
    },
    {
      id: 9,
      date_rendez_vous: "2024-03-14",
      prenom_patient: "Omar",
      nom_patient: "Khalfi",
      cin_patient: 369147258,
      telephone: 369147258,
      specialite: "Médecine générale",
      medecin: "Dr. Amel Ben Rhouma",
      status: false, // Scheduled/Pending
    },
    {
      id: 10,
      date_rendez_vous: "2024-03-15",
      prenom_patient: "Nadia",
      nom_patient: "Belhaj",
      cin_patient: 741852963,
      telephone: 741852963,
      specialite: "Orthopédie",
      medecin: "Dr. Khaled Ben Amor",
      status: false, // Scheduled/Pending
    },
  ];

  const handleAddAppointment = () => {
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
        <h2 className="text-xl font-semibold text-gray-800">Rendez-vous à venir</h2>
        <button
          onClick={handleAddAppointment}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          + Ajouter un rendez-vous
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un nouveau rendez-vous</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Rendez-vous</label>
              <input
                type="date"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom Patient</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom Patient</label>
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
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                type="number"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Spécialité</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Médecin</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Statut</label>
              <select
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Sélectionner</option>
                <option value="false">En attente</option>
                <option value="true">Confirmé</option>
              </select>
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
                  Prénom Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CIN Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spécialité
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médecin
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Rendez-vous
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {appointment.id}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.prenom_patient}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.nom_patient}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.cin_patient}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.telephone}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.specialite}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.medecin}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.date_rendez_vous}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status
                            ? "bg-green-100 text-green-800" // True = Confirmed
                            : "bg-yellow-100 text-yellow-800" // False = Pending/Scheduled
                        }`}
                      >
                        {appointment.status ? "Confirmé" : "En attente"}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
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
        )}
      </div>
    
  );
}