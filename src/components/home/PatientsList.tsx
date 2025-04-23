import React, { useEffect, useState } from 'react';
import { ajoutpatient, fetchpatient } from '../../services/serviceshome/patientservice';
import { addpatient, Patient } from '../../types/patienttype';
import moment from 'moment';




export default function PatientsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [listpatient, setlistpatient] = useState<Patient[]>([]);
  const [patient, setpatient] = useState<addpatient>({
    cin_patient: "",
    nom_patient: "",
    prenom_patient: "",
    sex: "",
    date_naissance: "",
    email:"" ,
    telephone: "",

  });


//affichage de patients
  useEffect(() => {
    const fetchPatients = async () => {
   const list = await fetchpatient()
   console.log(list)
   setlistpatient(list)
    };
    fetchPatients();
  }, []);


  const handleAddPatient = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(patient)
await ajoutpatient(patient);

    console.log("Form submitted");
    setIsFormOpen(false);
  };
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     const { name, value } = e.target;
     
     // Handle numeric fields
     if (name === 'cin_patient' || name === 'telephone') {
       setpatient(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
     } else {
      setpatient(prev => ({ ...prev, [name]: value }));
     }
   } ;
 
  

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
              <label htmlFor="cin" className="block text-sm font-medium text-gray-700">CIN</label>
              <input
                id="cin"
                name="cin_patient"
                value={patient.cin_patient}
                onChange={handleChange}
                type="number"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                id="nom_patient"
                name="nom_patient"
                value={patient.nom_patient}
                onChange={handleChange}
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                id="prenom_patient"
                name="prenom_patient"
                value={patient.prenom_patient}
                onChange={handleChange}
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sexe</label>
              <select
                id="sex"
                name="sex"
                value={patient.sex}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Sélectionner</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-700">Date de Naissance</label>
              <input
                id="date_naissance"
                name="date_naissance"
                value={patient.date_naissance}
                onChange={handleChange}
                type="date"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                id="telephone"
                name="telephone"
                value={patient.telephone}
                onChange={handleChange}
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
            <thead className="bg-gray-300">
              <tr>
              <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
              CIN
                </th>
                <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Nom
                </th>
                <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Prénom
                </th>
                <th className="sticky top-0 px-4 py-3 w-5  text-left text-l font-medium text-black uppercase tracking-wider">
                  Sexe
                </th>
                <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Date de Naissance
                </th>
                
                <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
  {listpatient.length > 0 ? (
    listpatient.map((patient) => (
      <tr
        key={patient._id}
        className="hover:bg-gray-50 transition-colors duration-200"
      >
                    <td className="px-4 py-4 whitespace-nowrap text-m font-bold text-gray-900">
                    {patient.cin_patient}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
        {patient.nom_patient}
       </td>
       <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
       {patient.prenom_patient}
        </td>
        <td className="px-4 py-2 w-5 whitespace-nowrap text-m text-gray-900">
        {patient.sex}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
 {moment(patient.date_naissance).format('DD/MM/YYYY')}
        </td>
  
        <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
        {patient.telephone}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
         
          <button className="text-indigo-600 hover:text-indigo-900">
            Modifier
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
       <td colSpan={7} className="px-4 py-8 text-center text-xl text-gray-900">
                    Aucun patient trouvé
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