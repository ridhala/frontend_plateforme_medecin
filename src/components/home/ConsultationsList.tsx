import React, { useEffect, useState } from 'react';import { Consultation, Consultations } from '../../types/consultationtype';
import { deleteconsultation, getconsultation, postconsultation, updateconsultation } from '../../services/serviceshome/consultationservice';
import { Modal } from "./pop-up/modal";
import { CalendarDays, FileText, User, ClipboardList, Stethoscope } from "lucide-react"
import { ConfirmModal } from './pop-up/deletemodal';


export default function ConsultationsList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [iddelete, setiddelete] = useState<string | null>("");
  const today = new Date().toISOString().split('T')[0];
  const [datechoisis, setdatechoisis ] = useState<string>(today);
  
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentConsultation, setCurrentConsultation] = useState<Consultations>({
    
    cin_patient: null,
    prenom_patient :"",
    nom_patient :"",
    diagnostic: "",
    ordonnance: "",
    type_consultation: "",
    date: "",
    telephone: null
  });
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formConsultation, setFormConsultation] = useState<Consultation | null>(null);
  
  useEffect(() => {
    if (selectedConsultation) {
      setFormConsultation(selectedConsultation);
    }
  }, [selectedConsultation]);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormConsultation((prev) => prev ? { ...prev, [name]: value } : prev);
  };
 const handleSubmits = async (e: React.FormEvent) => {
        e.preventDefault();
      if(formConsultation){

    await updateconsultation(formConsultation._id, formConsultation)
setIsFormOpen(false)
window.location.reload()
      }
      }


      useEffect(() => {
        const fetchConsultations = async () => {
          if (datechoisis) {
            const listconsultation = await getconsultation(datechoisis);
            setConsultations(listconsultation);
          }
        };
        fetchConsultations();
      }, [datechoisis]);
      
      

  const handleAddConsultation = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
console.log(currentConsultation)
    await postconsultation(currentConsultation)
    setIsFormOpen(false);
        window.location.reload()

  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
    const { name, value } = e.target;
    setCurrentConsultation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const deletebutton=async(elementdeleted: string | null)=>{  console.log()

 if (elementdeleted){
    await deleteconsultation((elementdeleted));
  window.location.reload();
  }
  }

  return (
    <>
      <div className="space-y-4 w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl font-semibold text-gray-800">Historique des Consultations</h2>
          <button
            onClick={handleAddConsultation}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            + Ajouter une consultation
          </button>
        </div>
        <div className='flex justify-right items-center py-1'>
            <div><h1 className='text-gray-500 text-lg w-30'>Consultation :</h1></div>
      <input
        type="date"
        value={datechoisis}
        onChange={async (e)=>{setdatechoisis(e.target.value)
        console.log(datechoisis)
        }}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />   
</div>

        {isFormOpen ? (
  <div className="bg-white shadow-lg rounded-2xl p-4 w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-teal-700 mb-6 border-b pb-2">
      🩺 Nouvelle Consultation
    </h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <User className="inline w-4 h-4 mr-1" /> CIN Patient
        </label>
        <input
          type="number"
          name="cin_patient"
          value={currentConsultation.cin_patient || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <User className="inline w-4 h-4 mr-1" /> Telephone
        </label>
        <input
          type="number"
          name="telephone"
          value={currentConsultation.telephone || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom du Patient</label>
        <input
          type="text"
          name="prenom_patient"
          value={currentConsultation.prenom_patient || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du Patient</label>
        <input
          type="text"
          name="nom_patient"
          value={currentConsultation.nom_patient || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <CalendarDays className="inline w-4 h-4 mr-1" /> Date de Consultation
        </label>
        <input
          type="date"
          name="date"
          value={currentConsultation.date || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <ClipboardList className="inline w-4 h-4 mr-1" /> Type de Consultation
        </label>
        <select
          required
          name="type_consultation"
          value={currentConsultation.type_consultation || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="">Sélectionner</option>
          <option value="visite">Visite</option>
          <option value="control">Contrôle</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          <Stethoscope className="inline w-4 h-4 mr-1" /> Diagnostic
        </label>
        <textarea
          name="diagnostic"
          rows={2}
          value={currentConsultation.diagnostic || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 resize-none"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          <FileText className="inline w-4 h-4 mr-1" /> Ordonnance
        </label>
        <textarea
          name="ordonnance"
          rows={2}
          value={currentConsultation.ordonnance || ''}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 resize-none"
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
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
            <div className='max-h-[70vh] overflow-y-auto'>
           
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-200 sticky top-0 z-10">
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
                {consultations?.length > 0 ? (
                  consultations.map((consultation) => (
                    <tr 
                      key={consultation._id} 
                      className="hover:bg-gray-300 transition-colors duration-100 "
                    //  onClick={() => setSelectedConsultation(consultation)}
                    >
                      <td className="px-4 py-2 text-left font-bold text-gray-900 break-words">
                        {consultation.cin_patient}
                      </td>
                      <td className="px-4 py-2px-4 py-2 text-l text-gray-900">
                      <div className="line-clamp-2 break-words">
                        {consultation.prenom_patient} {consultation.nom_patient} 
                         </div>
                      </td>
                      <td className="px-4 py-2 text-l text-gray-900 max-w-xs">
  <div className="line-clamp-2 overflow-hidden text-ellipsis break-words">
    {consultation.diagnostic}
  </div>
</td>


                      <td className="px-4 py-2 whitespace-nowrap w-20 text-l   text-gray-900 break-words">
                        {new Date(consultation.date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2 text-l text-gray-900 max-w-xs">
            <div className="line-clamp-2 overflow-hidden text-ellipsis break-words">
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
                      </span></td>
                    
                      <td 
  className="px-4 py-2 whitespace-nowrap text-sm font-medium"
  onClick={(e) => e.stopPropagation()}
>
  <div className="flex items-center space-x-3">
    <button 
      onClick={() => setSelectedConsultation(consultation)}
      className="px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg  cursor-pointer
       shadow-md hover:bg-teal-600 hover:text-white transition duration-200"
    >
      Voir
    </button>
    <button 
      onClick={() => {
        setIsConfirmOpen(true);
        setiddelete(consultation._id);
      }}
      className="px-4 py-2 bg-red-500 text-white text-sm font-semibold cursor-pointer
       rounded-lg shadow-md hover:bg-red-600 hover:text-white transition duration-200"
    >
      Supprimer
    </button>
  </div>
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

      {/**prop for suppression */}

      <ConfirmModal
      open={isConfirmOpen}
      onClose={() => setIsConfirmOpen(false)}
      onConfirm={() => {deletebutton(iddelete)
        console.log("Item supprimé !");
        setIsConfirmOpen(false);
      }}
      message="Tu veux supprimer cette consultation ?"
    />


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
  <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
    {isEditing ? (
      <form         
      onSubmit={handleSubmits} // À implémenter dans ton composant

       className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          type="text"
          name="prenom_patient"
          value={formConsultation.prenom_patient ?? ""}
          onChange={handleFormChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
    
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          name="nom_patient"
          value={formConsultation.nom_patient ?? ""}
          onChange={handleFormChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
    
      <div>
        <label className="block text-sm font-medium text-gray-700">CIN Patient</label>
        <input
          type="number"
          name="cin_patient"
          value={formConsultation.cin_patient ?? ""}
          onChange={handleFormChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
    
      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-gray-700">Type de consultation</label>
        <select
          name="type_consultation"
          value={formConsultation.type_consultation ?? ""}
          onChange={handleFormChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        >
          <option value="">Sélectionner</option>
          <option value="visite">Visite</option>
          <option value="control">Contrôle</option>
        </select>
      </div>
    
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Diagnostic</label>
        <textarea
          name="diagnostic"
          rows={3}
          value={formConsultation.diagnostic ?? ""}
          onChange={handleFormChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-teal-500 focus:border-teal-500 resize-none transition duration-200"
        />
      </div>
    
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Ordonnance</label>
        <textarea
          name="ordonnance"
          rows={2}
          value={formConsultation.ordonnance ?? ""}
          onChange={handleFormChange}
          className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-teal-500 focus:border-teal-500 resize-none transition duration-200"
        />
      </div>
    
      <div className="md:col-span-2 flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200 focus:outline-none"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none transition duration-200 shadow-lg"
        >
          Sauvegarder
        </button>
      </div>
    </form>
    
    ) : (
      <div className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h4 className="text-sm font-semibold text-gray-600">CIN</h4>
      <p className="mt-1 text-lg text-gray-900 font-medium">
        {formConsultation.cin_patient || "Non disponible"}
      </p>
    </div>
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h4 className="text-sm font-semibold text-gray-600">Patient</h4>
      <p className="mt-1 text-lg text-gray-900 font-medium">
        {formConsultation.prenom_patient} {formConsultation.nom_patient}
      </p>
    </div>
  </div>
  <div className="bg-gray-100 p-4 shadow-md rounded-lg">
    <h4 className="text-sm font-semibold text-gray-600">Date</h4>
    <p className="mt-1 text-base text-gray-900">
      {formConsultation.date
        ? new Date(formConsultation.date).toLocaleDateString()
        : "Non disponible"}
    </p>
  </div>

  <div className="bg-gray-100 p-4 shadow-md rounded-lg">
    <h4 className="text-sm font-semibold text-gray-600">Diagnostic</h4>
    <p className="mt-1 text-base text-gray-900 line-clamp-2 overflow-hidden text-ellipsis break-words">
      {formConsultation.diagnostic || "creer votre diagnostic"}
    </p>
  </div>

  <div className="bg-gray-100 p-4 shadow-md rounded-lg">
    <h4 className="text-sm font-semibold text-gray-600">Ordonnance</h4>
    <p className="mt-1 text-base text-gray-900 line-clamp-2 overflow-hidden text-ellipsis break-words">
      {formConsultation.ordonnance || "creer votre ordonnance"}
    </p>
  </div>

 
</div>

    )}
  </div>
)}

  </div>
</Modal>
    </>
  );
}