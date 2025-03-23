import React, { useState } from 'react';

interface Patient {
  id: number; // Temporary ID for rendering, can be replaced with cin_patient
  cin_patient: number; // Unique patient ID
  nom_patient: string; // Last name
  prenom_patient: string; // First name
  sex: string; // Gender
  password: string; // Password (masked for security)
  date_naissance: string; // Birth date
  email: string; // Email address
  telephone: number; // Phone number
}

export default function PatientsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const patients: Patient[] = [
    { id: 1, cin_patient: 123456789, nom_patient: "Dlimi", prenom_patient: "Rayen", sex: "Male", password: "********", date_naissance: "2002-03-15", email: "rayen.dlimi@example.com", telephone: 987654321 },
    { id: 2, cin_patient: 987654321, nom_patient: "Aouini", prenom_patient: "Hakim", sex: "Male", password: "********", date_naissance: "1999-05-20", email: "hakim.aouini@example.com", telephone: 123456789 },
    { id: 3, cin_patient: 456789123, nom_patient: "Ali", prenom_patient: "Mohamed", sex: "Male", password: "********", date_naissance: "1996-01-10", email: "mohamed.ali@example.com", telephone: 456789123 },
    { id: 4, cin_patient: 789123456, nom_patient: "Ben Ali", prenom_patient: "Rafik", sex: "Male", password: "********", date_naissance: "1992-06-25", email: "rafik.benali@example.com", telephone: 789123456 },
    { id: 5, cin_patient: 321654987, nom_patient: "Jalel", prenom_patient: "Yasmine", sex: "Female", password: "********", date_naissance: "1979-04-12", email: "yasmine.jalel@example.com", telephone: 321654987 },
    { id: 6, cin_patient: 654987321, nom_patient: "Rahmeni", prenom_patient: "Nouri", sex: "Male", password: "********", date_naissance: "1986-08-30", email: "nouri.rahmeni@example.com", telephone: 654987321 },
    { id: 7, cin_patient: 147258369, nom_patient: "Ben Jannet", prenom_patient: "Achref", sex: "Male", password: "********", date_naissance: "1986-08-30", email: "achref.bennjannet@example.com", telephone: 147258369 },
    { id: 8, cin_patient: 258369147, nom_patient: "Mostfa", prenom_patient: "Sihem", sex: "Female", password: "********", date_naissance: "1986-08-30", email: "sihem.mostfa@example.com", telephone: 258369147 },
    { id: 9, cin_patient: 369147258, nom_patient: "Ahmed", prenom_patient: "Ala", sex: "Male", password: "********", date_naissance: "1993-07-15", email: "ala.ahmed@example.com", telephone: 369147258 },
  ];

  const handleAddPatient = () => {
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
        <h2 className="text-xl font-semibold text-gray-800">Liste des Patients</h2>
        <button
          onClick={handleAddPatient}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          + Ajouter un patient
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un nouveau patient</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CIN</label>
              <input
                type="number"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sexe</label>
              <select
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Sélectionner</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de Naissance</label>
              <input
                type="date"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
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
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CIN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prénom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sexe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de Naissance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
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
                    {patient.cin_patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.nom_patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.prenom_patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.sex}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.date_naissance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.telephone}
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
      )}
    </div>
  );
}