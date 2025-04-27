  import React, { useEffect, useState } from 'react';
  import { deleterendezvous, getrendezvous, postrendezvous,updateRendezvous  } from '../../services/serviceshome/rendezvousservice';
  import { Appointment, Appointments, convert, RendezvousUpdateData } from '../../types/rendezvoustype';
  import moment from 'moment';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import axios from 'axios';
import { Modal } from './pop-up/modal';
import { format } from 'date-fns';
import { ConfirmModal } from './pop-up/deletemodal';

  export default function AppointmentsList() {
   // for pop-up
    const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
const openEditPopup = (appointment: Appointment) => {
  setSelectedAppointment(appointment);
  setIsPopupOpen(true);
};

const closePopup = () => {
  setIsPopupOpen(false);
  setSelectedAppointment(null);
};

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [iddelete, setiddelete] = useState<string | null>("");



const [selectedTime, setSelectedTime] = useState<Date | null>(null);
const[ dateupdates, setdateupdates] = useState<string | null>("")

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);

    const [rendezvous, setrendezvous]=useState<Appointment[]>([]);

    const [isFormOpen, setIsFormOpen] = useState("affichage");

    const [appointments, setappointments]= useState<Appointments>({ 
    date_rendez_vous: "", prenom_patient: "" , nom_patient: "", 
    cin_patient: "", telephone: "", type:"", 
    status: "" })

      // prop change
      const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedAppointment((prev) => prev ? { ...prev, [name]: value } : prev);

      };
      const handleSubmits = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedAppointment) return;
      
        try {
          const fd =selectedDate?.toISOString().split('T')[0];

              const updateData: RendezvousUpdateData = {
            nom_patient: selectedAppointment.nom_patient ,
            prenom_patient: selectedAppointment.prenom_patient,
            telephone: selectedAppointment.telephone === "" ? undefined : Number(selectedAppointment.telephone),
            cin_patient: selectedAppointment.cin_patient === "" ? undefined : Number(selectedAppointment.cin_patient),
            date_rendez_vous:dateupdates ? moment(dateupdates, "DD-MM-YYYYTHH:mm").toDate(): undefined,
            status: typeof selectedAppointment.status === 'string' ? selectedAppointment.status : undefined
          };
      console.log(updateData)
          // Call update function (replace with your actual update function)
          await updateRendezvous(selectedAppointment._id.toString(), updateData);
      
          console.log("Rendez-vous mis à jour");
          
          // Refresh appointments
          const updatedRendezvous = await getrendezvous();
          setrendezvous(updatedRendezvous);
      setIsPopupOpen(false)
          // Close form and reset
          setIsFormOpen("affichage");
          setSelectedAppointment(null);
           setSelectedDate(null)
           setSelectedTime(null)
          window.location.reload()
        } catch (error) {
          console.error("Erreur lors de la mise à jour du rendez-vous :", error);
          // Add user feedback here (e.g., toast notification)
        }
      };

    
  //convert rendezvous to consultation
  const [convconsult]= useState<convert>({ 
    _id: ""
  })
  const converttoconsultation=async (convert: convert)=>{try{
  const response =await axios.post("http://localhost:3000/rendezvous/convertconsultation",  convert,
  { headers: {
      Authorization:`bearer ${localStorage.getItem('accessToken')}`        
      
    }}
  )
  return response.data;
  }
  catch(error){
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message
      );
  }
  }}

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate) return;

      const dateString = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  console.log(dateString)
      try {
        const response = await axios.get(
          `http://localhost:3000/rendezvous/available?date=${dateString}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        const formattedTimes = response.data.map((isoDate: string) =>
          new Date(isoDate)
        );
        setAvailableTimes(formattedTimes); 
        console.log(formattedTimes)
      
      } catch (error) {
        console.error('Erreur lors du chargement des horaires disponiblses :', error);
      }
    };
    fetchAvailableTimes();
  }, [selectedDate]);

    const handleAddAppointment = () => {
      setIsFormOpen("ajout");
    };

    const handleCloseForm = () => {
      setIsFormOpen("affichage");
    };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      // Handle numeric fields
      
      if (name === 'cin_patient' || name === 'telephone') {
        setappointments(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
      } 

       else {
        setappointments(prev => ({ ...prev, [name]: value }));
      }
    } ;

    const handleSubmit =async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted" ,appointments); 

      await postrendezvous(appointments);
    
      console.log("Form submitted" ,appointments); 
      const updatedRendezvous = await getrendezvous();
      setrendezvous(updatedRendezvous); 
        setIsFormOpen("affichage");
       window.location.reload();
    };
//////////////////////////////////// useeffect for creat automatic patient//////////////////
  useEffect(()=>{
    const affichage =async()=>{
    const datarendezvous= await getrendezvous();
  setrendezvous(datarendezvous)
    }
    affichage()
  },[])

 const deletebutton=async(elementdeleted: string | null)=>{  console.log()

 if (elementdeleted){
    await deleterendezvous((elementdeleted))
  window.location.reload()
  }
  }

    return (
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-center w-full">
      
            <h2 className="text-xl font-semibold text-gray-800">Rendez-vous à venir</h2>
          <button
            onClick={handleAddAppointment}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-400 transition-colors"
          >
            + Ajouter un rendez-vous
          </button>
        </div>

        {isFormOpen==="ajout" && (
          <div className="bg-white shadow-md rounded-lg p-6">
          <div className='flex '>
          <div className=" shadow-lg rounded-2xl p-3 w-4xl mx-auto">
  <h2 className="text-2xl font-bold text-teal-700 mb-6 border-b pb-2">
    📅 Nouveau Rendez-vous
  </h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">Jour de rendez-vous</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date) {
            const tunisianDateStr = date.toLocaleDateString('fr-TN', {
              timeZone: 'Africa/Tunis',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            const [day, month, year] = tunisianDateStr.split('/');
            const correctedDate = new Date(`${year}-${month}-${day}T12:00:00`);
            setSelectedDate(correctedDate);
          } else {
            setSelectedDate(null);
          }
        }}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        className="mt-1 w-3xl border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        placeholderText="Choisir une date"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">CIN Patient</label>
      <input
        type="number"
        name="cin_patient"
        value={appointments.cin_patient === null ? '' : appointments.cin_patient}  // Si null, on affiche vide
        onChange={handleChange}
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Prénom Patient</label>
      <input
        type="text"
        name="prenom_patient"
        value={appointments.prenom_patient}
        onChange={handleChange}
        required
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Nom Patient</label>
      <input
        type="text"
        name="nom_patient"
        value={appointments.nom_patient}
        onChange={handleChange}
        required
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Type de Consultation</label>
      <select
        required
        name="type"
        value={appointments.type?.toString()}
        onChange={handleChange}
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">Sélectionner</option>
        <option value="visite">Visite</option>
        <option value="control">Contrôle</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Téléphone</label>
      <input
        type="number"
        name="telephone"
        value={appointments.telephone}
        onChange={handleChange}
        required
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Statut</label>
      <select
        required
        name="status"
        value={appointments.status.toString()}
        onChange={handleChange}
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">Sélectionner</option>
        <option value="En attente">En attente</option>
        <option value="Confirmé">Confirmé</option>
        <option value="En salle d'attente">En salle d'attente</option>
      </select>
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


  <div className="w-1/3 pl-6 border-l">
    <h4 className="text-md font-medium text-gray-700 mb-3">Available Times</h4>
    {availableTimes.length > 0 || selectedDate ? (
      <div className="flex flex-wrap gap-2">
        {availableTimes.map((time, index) => {
    // Format time as HH:mm
    const timeString = new Date(time).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false ,
    });

    return (
      <button
        key={index}
        onClick={() => {
          // When clicked, create a new Date combining selected date and this time
          if (selectedDate) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const newDateTime = new Date(selectedDate);
            newDateTime.setHours(hours, minutes, 0, 0);
            // Update your appointments state
            setappointments(prev => ({
              ...prev,
              date_rendez_vous: newDateTime.toISOString()
            }));
          }
     
        }}
        className={`time-item text-center w-[calc(33.33%-10px)] p-2 rounded-xl ${
          appointments.date_rendez_vous && 
          new Date(appointments.date_rendez_vous).getHours() === new Date(time).getHours() && 
          new Date(appointments.date_rendez_vous).getMinutes() === new Date(time).getMinutes()
            ? 'bg-teal-600 text-white' // Selected style
            : 'bg-blue-500 text-white hover:bg-blue-600' // Default style
        }`}
      >
        {timeString}
      </button>
    );
  })}
      </div>
    ) : (
      <p className="text-gray-500">No available times</p>
    )}
  </div>
            </div>
          </div>
          
        ) } {isFormOpen==="affichage"&& (
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 z-10">
                <tr className='bg-gray-300'>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    CIN 
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Patient
                  </th>
                
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    type
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Date Rendez-vous
                  </th>
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Temps
                  </th>
                 
                  <th className="sticky top-0 px-4 py-3  text-left text-l font-medium text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-400">
                {rendezvous.length > 0 ? (
                  rendezvous.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-100 transition-colors duration-200">
                      <td className="px-4 py-4 whitespace-nowrap text-m font-bold text-gray-900">
                        {appointment.cin_patient}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
                       <div className='line-clamp-2 break-words'> {appointment.prenom_patient} {appointment.nom_patient}</div>
                      </td>
                      
                      <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
                        {appointment.telephone}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-m text-gray-900">
                        {appointment.type}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                      <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                            appointment.status==="En attente"&&(
                              "bg-yellow-100 w-15 text-yellow-700")}
                              ${ appointment.status==="Confirmé"&&(
                                "bg-green-200   w-15 text-center text-green-700")
                              }  ${ appointment.status==="En salle d'attente"&&(
                                "bg-blue-500  w-15 text-center text-black")
                              }` } >

                          { appointment.status==="En salle d'attente"&&( "En salle")} 
                           { appointment.status==="En attente"&&( "En attente" )} 
                            { appointment.status==="Confirmé"&&(  "Confirmé")}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-m  text-gray-900">
                      {moment(appointment.date_rendez_vous).format('DD/MM/YYYY')}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-m  text-gray-900">
                      {moment(appointment.date_rendez_vous).format('HH:mm')}
                      </td>
                     
                      <td className="px-2 py-2 font-medium space-x-1">
                      <button 
                    className="bg-blue-200 text-lg rounded-lg hover:text-black cursor-pointer"
                      onClick={() => openEditPopup(appointment)}>
                        Modifier
                      </button>
                      <button 
                      onClick={()=>{ setIsConfirmOpen(true)
                        setiddelete(appointment._id.toString())}}
                    className="bg-red-600 text-lg rounded-lg hover:text-black cursor-pointer">
                        Supprimer
                      </button>
                        <button className="bg-teal-500 text-lg rounded-lg hover:text-black cursor-pointer"
                        onClick={()=>{convconsult._id = appointment._id;
                          converttoconsultation(convconsult)
                          window.location.reload();
                        }}>
                          entrer
                        </button>
                      </td></tr>               
                  ))
                ) : (
                  <tr>
        <td colSpan={7} className="px-4 py-8 text-center text-xl text-gray-900">
        Aucun rendez-vous trouvé
                    </td> </tr>
                )}
              </tbody>
              </table>
          </div>
           <ConfirmModal
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => {deletebutton(iddelete)
                  console.log("Item supprimé !");
                  setIsConfirmOpen(false);
                }}
                message="Tu veux supprimer cette rendez-vous ?"
              />
        </div>
        
          )} 

         <Modal open={isPopupOpen} onclose={closePopup}>
  {selectedAppointment  && (
      <div> 
        <h2 className="text-lg font-semibold mb-4">Modifier le rendez-vous</h2>
      <form
        onSubmit={handleSubmits} // À implémenter dans ton composant
        className="space-y-4 "
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
          <label className="block font-medium">Nom</label>
          <input
            type="text"
            name='nom_patient'
            value={selectedAppointment?.nom_patient}
            onChange={handleChanges}
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>
      
        <div>
          <label className="block font-medium">Prénom</label>
          <input
            type="text"
            name='prenom_patient'
            value={selectedAppointment?.prenom_patient}
            required
            onChange={handleChanges}
            className="w-full border rounded p-2 bg-gray-100"
          /></div>
 </div>
 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        <div>
          <label className="block font-medium">CIN</label>
          <input
            type="text"
            name='cin_patient'
            value={selectedAppointment?.cin_patient}
            onChange={handleChanges}
            className="w-full border rounded p-2 bg-gray-100"
          /></div>
        
        <div>
          <label className="block font-medium">Téléphone</label>
          <input
            type="text"
            name='telephone'
            value={selectedAppointment?.telephone}
            onChange={handleChanges}
            className="w-full border rounded p-2 bg-gray-100"
          />
         
        </div> 
        </div>
        
      
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
      <label className="block font-medium">Date rendez-vous</label>

        <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
  if (date) {
    const tunisianDateStr = date.toLocaleDateString('fr-TN', {
      timeZone: 'Africa/Tunis',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const [day, month, year] = tunisianDateStr.split('/');
    const correctedDate = new Date(`${year}-${month}-${day}T12:00:00`);
    setSelectedDate(correctedDate);console.log(selectedDate)
    setSelectedAppointment((prev) => prev ? { ...prev, date: correctedDate } : prev);
  } else {
    setSelectedDate(null);
  }
}}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
        placeholderText="Choisir une date"
      /> </div>
        <div>
      <label className="block font-medium">Statut</label>
      <select
        required
        name="status"
        value={selectedAppointment.status.toString()}
        onChange={handleChanges}
        className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">Sélectionner</option>
        <option value="En attente">En attente</option>
        <option value="Confirmé">Confirmé</option>
        <option value="En salle d'attente">En salle d'attente</option>
      </select>
    </div>
      
      </div>



   {availableTimes.length > 0 && (
  <div className="mt-1">
    <label className="block font-medium mb-2">Créneaux disponibles</label>
    <div className="grid grid-cols-4 gap-2">
      {availableTimes.map((time, idx) => (
        <button
        type="button"
          key={idx}
          onClick={() => {
  
            setSelectedTime(time); 
           const formatted = moment(time).format("DD-MM-YYYYTHH:mm");
           setdateupdates(formatted)
            console.log(formatted)
            
            setSelectedAppointment((prev) => prev ? { ...prev, heure: time } : prev);
          }}
          className={`p-2 border rounded ${
            selectedTime === time 
              ? 'bg-teal-600 text-white' // Color for selected
              : 'bg-blue-500 text-white hover:bg-blue-600' // Color for unselected with hover effect
          }`}
        >
          {typeof time === 'string' ? time : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </button>
      ))}
    </div>
  </div>
)}

      { /*////////////////////////*/}
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
            onClick={()=>{ setIsPopupOpen(false);
              handleSubmits
          }}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  )}
</Modal>
        </div>
    );
  }