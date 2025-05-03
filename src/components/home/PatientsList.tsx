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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
  <div>
    <label className="block text-sm font-medium text-gray-700">
      CIN
    </label>
    <input
      type="number"
      name="cin_patient"
      id="cin"
      value={patient.cin_patient}
      onChange={handleChange}
      required
      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Téléphone
    </label>
    <input
      type="number"
      name="telephone"
      id="telephone"
      value={patient.telephone}
      onChange={handleChange}
      required
      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Nom
    </label>
    <input
      type="text"
      name="nom_patient"
      id="nom_patient"
      value={patient.nom_patient}
      onChange={handleChange}
      required
      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Prénom
    </label>
    <input
      type="text"
      name="prenom_patient"
      id="prenom_patient"
      value={patient.prenom_patient}
      onChange={handleChange}
      required
      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Sexe
    </label>
    <select
      name="sex"
      id="sex"
      value={patient.sex}
      onChange={handleChange}
      required
      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm bg-white focus:ring-teal-500 focus:border-teal-500"
    >
      <option value="">Sélectionner</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Date de Naissance
    </label>
    <input
      type="date"
      name="date_naissance"
      id="date_naissance"
      value={patient.date_naissance}
      onChange={handleChange}
      required
      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
    />
  </div>

  <div className="flex items-end justify-end gap-4 md:col-span-2">
    <button
      type="button"
      onClick={handleCloseForm}
      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
    >
      Annuler
    </button>
    <button
      type="submit"
      className="px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition shadow"
    >
      Ajouter
    </button>
  </div>

</form>

        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-200">
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