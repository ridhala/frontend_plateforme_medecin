import React, { useEffect, useState } from 'react';
import { getrendezvous, postrendezvous } from '../../services/serviceshome/rendezvousservice';
import { Appointment, Appointments } from '../../types/rendezvoustype';


export default function AppointmentsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [appointments, setappointments]= useState<Appointments>({ 
    
   date_rendez_vous: "",
   prenom_patient: "" ,
   nom_patient: "", 
   cin_patient: "",
   telephone: "",
   specialite: "", 
   status: "" })
const [rendezvous, setrendezvous]=useState<Appointment[]>([]);


  const handleAddAppointment = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === 'cin_patient' || name === 'telephone') {
      setappointments(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setappointments(prev => ({ ...prev, [name]: value }));
    }
  } ;
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...appointments,
      date_rendez_vous: new Date(appointments.date_rendez_vous).toISOString(),
      status: appointments.status === "true"
  };   
   console.log(payload)
    await postrendezvous(payload);
    console.log("Form submitted"); 
    const updatedRendezvous = await getrendezvous();
    setrendezvous(updatedRendezvous); 
       setIsFormOpen(false);
       setappointments({ 
    
        date_rendez_vous: "",
        prenom_patient: "" ,
        nom_patient: "", 
        cin_patient: "",
        telephone: "",
        specialite: "", 
        status: "" })
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
                name='date_rendez_vous'
                value={appointments.date_rendez_vous}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom Patient</label>
              <input
                type="text"
                name='prenom_patient'
                value={appointments.prenom_patient}
                onChange={handleChange}

                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom Patient</label>
              <input
                type="text"
                name='nom_patient'
                value={appointments.nom_patient}
                onChange={handleChange}

                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CIN Patient</label>
              <input
                type="number"
                name='cin_patient'
                value={appointments.cin_patient}
                onChange={handleChange}

                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                type="number"
                name='telephone'
                value={appointments.telephone}
                onChange={handleChange}

                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Spécialité</label>
              <input
                type="text"
                name='specialite'
                value={appointments.specialite}
                onChange={handleChange}

                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Statut</label>
              <select
                required
                name='status'
                value={appointments.status.toString()}
                onChange={handleChange}

                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Sélectionner</option>
                <option value="false">En attente</option>
                <option value="true">Confirmé</option>
                <option value="true">En Salle d'Attente</option>


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
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  CIN Patient
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  Prénom Patient
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  Nom Patient
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  Date Rendez-vous
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gray-50 text-left text-l font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rendezvous.length > 0 ? (
                rendezvous.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-2 whitespace-nowrap text-m text-gray-500">
                      {appointment.cin_patient}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-m font-medium text-gray-900">
                      {appointment.prenom_patient}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-m text-gray-500">
                      {appointment.nom_patient}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-m text-gray-500">
                      {appointment.telephone}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-m text-gray-500">
                      {new Date(appointment.date_rendez_vous).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status ? "Confirmé" : "En attente"}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-teal-600 hover:text-teal-900">
                        Voir
                      </button>
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => console.log(appointment)}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xl text-gray-900">
                    Aucun rendez-vous trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        )}
      </div>
    
  );
}