import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Consultation } from '../../types/consultationtype';
import { postconsultation } from '../../services/serviceshome/consultationservice';



export default function ConsultationsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentConsultation, setCurrentConsultation] = useState<Consultation>({
    _id: null,
    cin_patient: null,
    diagnostic: "",
    remarque: "",
    type_consultation: "",
    date: "",
    antecedents: ""
  });
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

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
    console.log( currentConsultation);

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
                <label className="block text-sm font-medium text-gray-700">Remarque</label>
                <input
                  type="text"
                  name="remarque"
                  value={currentConsultation.remarque || ''}
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
          <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-black table-fixed">
              <thead className="bg-gray-300">
                <tr>
                  <th className="sticky top-0 px-4 py-3   text-left text-l font-medium text-black uppercase tracking-wider">
                    CIN 
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Diagnostic
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Date
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Remarque
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
                      <td className="px-4 py-2 text-l text-gray-900 ">
                      <div className="line-clamp-2 break-words">
                        {consultation.diagnostic}
                      </div></td>

                      <td className="px-4 py-2 whitespace-nowrap w-20 text-l   text-gray-900 break-words">
                        {new Date(consultation.date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2 text-l text-gray-900">
            <div className="line-clamp-2 break-words">
              {consultation.remarque}
            </div>
          </td>   <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                          consultation.type_consultation==="control"&&
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
                        <button className="text-indigo-600 hover:text-black">
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-4 text-center text-sm text-gray-500">
                      Aucune consultation trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedConsultation && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-300 rounded-4xl p-6 max-w-2xl w-full max-h-[200vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 bg-white">
              <h3 className="text-3xl font-bold text-blue-700">Détails de la Consultation</h3>
              <button 
                onClick={() => setSelectedConsultation(null)}
                className="text-black  hover:text-black"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xl rounded-xl font-medium text-black bg-white">CIN Patient</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedConsultation.cin_patient}</p>
              </div>
              
              <div>
                <h4 className="text-xl rounded-xl font-medium text-black  bg-white">Diagnostic</h4>
                <p className="mt-1 text-sm text-gray-900 ">{selectedConsultation.diagnostic}</p>
              </div>
              
              <div>
                <h4 className="text-xl font-medium rounded-xl text-black  bg-white">Type de consultation</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedConsultation.type_consultation}</p>
              </div>
              
              <div>
                <h4 className="text-xl font-medium rounded-xl text-black  bg-white" >Remarque</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedConsultation.remarque}</p>
              </div>
              
              <div>
                <h4 className="text-xl font-medium rounded-xl text-black  bg-white">Date</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedConsultation.date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-medium text-black  rounded-xl bg-white">Antécédents</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedConsultation.antecedents || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}