import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Consultation } from '../../types/consultationtype';
import { postconsultation } from '../../services/serviceshome/consultationservice';
import { Modal } from "./pop-up/modal";


export default function ConsultationsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentConsultation, setCurrentConsultation] = useState<Consultation>({
    _id: null,
    cin_patient: null,
    prenom_patient :"",
    nom_patient :"",
    diagnostic: "",
    ordonnance: "",
    type_consultation: "",
    date: "",
    antecedents: ""
  });
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formConsultation, setFormConsultation] = useState<Consultation | null>(null);
  const handleSave = async () => { setSelectedConsultation(null);
    window.location.reload();}
  useEffect(() => {
    if (selectedConsultation) {
      setFormConsultation(selectedConsultation);
    }
  }, [selectedConsultation]);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormConsultation((prev) => prev ? { ...prev, [name]: value } : prev);
  };



  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/consultation/', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setConsultations(response.data.consultations || []);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };
    fetchConsultations();
  }, []);

  const handleAddConsultation = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    await postconsultation(currentConsultation)
    setIsFormOpen(false);
        window.location.reload()

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentConsultation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
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
                <label className="block text-sm font-medium text-gray-700">CIN Patient</label>
                <input
                  type="number"
                  name="cin_patient"
                  value={currentConsultation.cin_patient || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700">Type de Consultation</label>
              <select
                required
                name='type_consultation'
                value={currentConsultation.type_consultation.toString()}
                onChange={handleInputChange}

                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Sélectionner</option>
                <option value="visite">visite</option>
                <option value="control">control</option>


              </select>
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Diagnostic</label>
                <input
                  type="text"
                  name="diagnostic"
                  value={currentConsultation.diagnostic || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ordonnance</label>
                <input
                  type="text"
                  name="ordonnance"
                  value={currentConsultation.ordonnance || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date de Consultation</label>
                <input
                  type="date"
                  name="date"
                  value={currentConsultation.date || ''}
                  onChange={handleInputChange}
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
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
            <div className='max-h-[70vh] overflow-y-auto'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-300 sticky top-0 z-10">
                <tr>
                  <th className="sticky top-0 px-4 py-3   text-left text-l font-medium text-black uppercase tracking-wider">
                    CIN 
                  </th>
                  <th className="sticky top-0 px-4 py-3   text-left text-l font-medium text-black uppercase tracking-wider">
                   Patient
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Diagnostic
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Date
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Ordonnance
                  </th>
                
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                  Consultation
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-400">
                {consultations.length > 0 ? (
                  consultations.map((consultation) => (
                    <tr 
                      key={consultation._id} 
                      className="hover:bg-gray-300 transition-colors duration-100 cursor-pointer"
                      onClick={() => setSelectedConsultation(consultation)}
                    >
                      <td className="px-4 py-2 text-left font-bold text-gray-900 break-words">
                        {consultation.cin_patient}
                      </td>
                      <td className="px-4 py-2px-4 py-2 text-l text-gray-900">
                      <div className="line-clamp-2 break-words">
                        {consultation.prenom_patient} {consultation.nom_patient} 
                         </div>
                      </td>
                      <td className="px-4 py-2 text-l text-gray-900 ">
                      <div className="line-clamp-2">
                        {consultation.diagnostic}
                      </div></td>

                      <td className="px-4 py-2 whitespace-nowrap w-20 text-l   text-gray-900 break-words">
                        {new Date(consultation.date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2 text-l text-gray-900">
            <div className="line-clamp-2 break-words">
              {consultation.ordonnance}
            </div>
          </td>   
          <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          consultation.type_consultation==="control"&&
                             "bg-yellow-100 w-15 text-yellow-700"}
                              ${
                          consultation.type_consultation==="En salle"&&
                             "bg-yellow-100 w-15 text-yellow-700"}
                             
                             ${consultation.type_consultation==="visite"&&
                              "bg-green-200   w-15 text-center text-green-700"
                             } 
                      `}
                      >
                        {consultation.type_consultation==="visite"&&(
                          " Visite "
                        )}
                        {consultation.type_consultation==="control"&&(
                          "Control"
                        )}
                      </span>
                    </td>
                     
                     
                      <td 
                        className="px-4 py-2 whitespace-nowrap text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button 
                          className=" w-10 text-teal-600 hover:text-black mr-2"
                          onClick={() => setSelectedConsultation(consultation)}
                        >
                          Voir
                        </button>
                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
       <td colSpan={7} className="px-4 py-8 text-center text-xl text-gray-900">
       Aucune consultation trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
      <Modal open={!!selectedConsultation} onclose={() => setSelectedConsultation(null)}>
  <div className="rounded-xl p-4 max-w-2xl w-full max-h-[80vh] overflow-auto">
    <div className="flex justify-between items-center mb-4 bg-white">
      <h3 className="text-3xl font-bold text-blue-700">
        {isEditing ? "Modifier la consultation" : "Détails de la Consultation"}
      </h3>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Modifier
        </button>
      )}
    </div>

    {formConsultation && (
      <div className="space-y-4">
        {isEditing ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CIN Patient</label>
              <input
                type="number"
                name="cin_patient"
                value={formConsultation.cin_patient ?? ""}
                onChange={handleFormChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                name="nom_patient"
                value={formConsultation.nom_patient ?? ""}
                onChange={handleFormChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                name="prenom_patient"
                value={formConsultation.prenom_patient ?? ""}
                onChange={handleFormChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Diagnostic</label>
              <input
                type="text"
                name="diagnostic"
                value={formConsultation.diagnostic ?? ""}
                onChange={handleFormChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ordonnance</label>
              <input
                type="text"
                name="ordonnance"
                value={formConsultation.ordonnance ?? ""}
                onChange={handleFormChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type de consultation</label>
              <select
                name="type_consultation"
                value={formConsultation.type_consultation ?? ""}
                onChange={handleFormChange}
                className="block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Sélectionner</option>
                <option value="visite">Visite</option>
                <option value="control">Contrôle</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xl font-medium text-black">CIN</h4>
                <p className="mt-1 text-sm text-gray-900">{formConsultation.cin_patient}</p>
              </div>
              <div>
                <h4 className="text-xl font-medium text-black">Patient</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {formConsultation.prenom_patient} {formConsultation.nom_patient}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-medium text-black">Diagnostic</h4>
              <p className="mt-1 text-sm text-gray-900">{formConsultation.diagnostic}</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-black">Ordonnance</h4>
              <p className="mt-1 text-sm text-gray-900">{formConsultation.ordonnance}</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-black">Date</h4>
              <p className="mt-1 text-sm text-gray-900">
                {formConsultation.date ? new Date(formConsultation.date).toLocaleDateString() : "Non disponible"}
              </p>
            </div>
          </>
        )}
      </div>
    )}
  </div>
</Modal>


     
    </>
  );
}