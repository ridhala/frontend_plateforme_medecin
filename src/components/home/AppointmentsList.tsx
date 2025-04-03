import React, { useEffect, useState } from 'react';
import { getrendezvous } from '../../services/serviceshome/rendezvousservice';
import { data } from 'react-router-dom';

interface Appointment {
  _id: number; 
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number; 
  telephone: number; 
  specialite: string; 
  medecin: string; 
  status: boolean; 
}

export default function AppointmentsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
const [rendezvous, setrendezvous]=useState<Appointment[]>([]);

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
useEffect(()=>{
  const afficahe =async()=>{
  const datarendezvous= await getrendezvous();
  console.log(datarendezvous)
 setrendezvous(datarendezvous)
  console.log(rendezvous)
  }
  afficahe()
},[])
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
          <table className="min-w-full div_ide-y div_ide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                  CIN Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                  Prénom Patient
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                  Nom Patient
                </th>
              
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                    Téléphone
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                    Spécialité
                  </th>
                 
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                    Date Rendez-vous
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                    Statut
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-w_ider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white div_ide-y div_ide-black">

                {rendezvous.length>0 ? ( rendezvous.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {appointment.cin_patient}
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
                      {appointment.telephone}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {appointment.specialite}
                    </td>
                  
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {new Date(appointment.date_rendez_vous).toLocaleDateString()}
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
                      <button className="text-indigo-900 hover:text-indigo-900" onClick={()=>console.log(rendezvous)}>
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))
               ) 
              :(
                <tr>
                  <td colSpan={9} className="px-4 py-8  text-center text-xl text-gray-900">
                    Aucune rendez-vous trouvée
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    
  );
}