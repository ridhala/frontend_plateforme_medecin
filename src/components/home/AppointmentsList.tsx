  import React, { useEffect, useState } from 'react';
  import { getrendezvous, postrendezvous } from '../../services/serviceshome/rendezvousservice';
  import { Appointment, Appointments, convert } from '../../types/rendezvoustype';
  import moment from 'moment';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import axios from 'axios';
import { Modal } from './pop-up/modal';

  export default function AppointmentsList() {
   // for pop-up
    const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
const openEditPopup = (appointment: Appointment) => {
  setSelectedAppointment(appointment);
  setIsPopupOpen(true);
};
// 
const closePopup = () => {
  setIsPopupOpen(false);
  setSelectedAppointment(null);
};
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);

    const [rendezvous, setrendezvous]=useState<Appointment[]>([]);

    const [isFormOpen, setIsFormOpen] = useState("affichage");

    const [appointments, setappointments]= useState<Appointments>({ 
    date_rendez_vous: "", prenom_patient: "" , nom_patient: "", 
    cin_patient: "", telephone: "", type:"",  specialite: "", 
    status: "" })

    const [updateappointments, setupdateappointments]= useState<Appointments>({ 
      date_rendez_vous: "",prenom_patient: "" , nom_patient: "", 
      cin_patient: "",telephone: "",type:"",specialite: "", status: "" })
      // prop change
      const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedAppointment((prev) => {
          if (!prev) return prev; // Si null, ne rien faire
          return {
            ...prev,
            [name]: value,
          };
        });
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
      } else {
        setappointments(prev => ({ ...prev, [name]: value }));
      }
    } ;
    const handleSubmit =async (e: React.FormEvent) => {
      e.preventDefault();

      await postrendezvous(appointments);
    
      console.log("Form submitted"); 
      const updatedRendezvous = await getrendezvous();
      setrendezvous(updatedRendezvous); 
        setIsFormOpen("affichage");
        window.location.reload()
        setappointments({ 
          date_rendez_vous: "",
          prenom_patient: "" ,
          nom_patient: "", 
          cin_patient: "",
          telephone: "",
          type:"",
          specialite: "", 
          status: "" })
    };

  useEffect(()=>{
    const affichage =async()=>{
    const datarendezvous= await getrendezvous();
  setrendezvous(datarendezvous)
    }
    affichage()
  },[])
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ajouter un nouveau rendez-vous</h3>
          <div className='flex '>
            <div className='w-4/3'>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
    <label className="block text-sm font-medium text-gray-700">jour de rendez vous </label>
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => {
        if (date) {
          //  Créer une nouvelle date en forçant le fuseau tunisien
          const tunisianDateStr = date.toLocaleDateString('fr-TN',
            
            { timeZone: 'Africa/Tunis',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
          // Convertir en Date (méthode robuste)
          const [day, month, year] = tunisianDateStr.split('/');
          const correctedDate = new Date(`${year}-${month}-${day}T12:00:00`);
          setSelectedDate(correctedDate);
        } 
        else {
          setSelectedDate(null);
        }
      }}

    timeCaption="Heure"
    timeIntervals={30}
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
      placeholderText="Choisir une date et heure"
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
                <label className="block text-sm font-medium text-gray-700">Type de Consultation</label>
                <select
                  required
                  name='type'
                  value={appointments.type?.toString()}
                  onChange={handleChange}

                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="visite">visite</option>
                  <option value="control">control</option>


                </select>
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
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <select
                  required
                  name='status'
                  value={appointments.status.toString()}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="En attente">En attente</option>
                  <option value="Confirmé">Confirmé</option>
                  <option value="En salle d'attente">En Salle d'Attente</option>


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

  <div className="w-1/3 pl-6 border-l">
    <h4 className="text-md font-medium text-gray-700 mb-3">Available Times</h4>
    {availableTimes.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {availableTimes.map((time, index) => {
    // Format time as HH:mm
    const timeString = new Date(time).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false ,
      hourCycle: 'h23'
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
                        {appointment.prenom_patient} {appointment.nom_patient}
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
                              } 
                        `}
                        >
                          { appointment.status==="En salle d'attente"&&(
                            "En salle"
                          )}
                          { appointment.status==="En attente"&&(
                            "En attente"
                          )} { appointment.status==="Confirmé"&&(
                            "Confirmé"
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-m  text-gray-900">
                      {moment(appointment.date_rendez_vous).format('DD/MM/YYYY')}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-m  text-gray-900">
                      {moment(appointment.date_rendez_vous).format('HH:MM')}
                      </td>
                     
                      <td className="px-2 py-2 font-medium space-x-1">
                      <button 
                    className="bg-blue-200 rounded-lg hover:text-black text-xl"
                      onClick={() => openEditPopup(appointment)}>
                        Modifier
                      </button>
                        <button className="bg-teal-500 rounded-lg hover:text-black text-xl"
                        onClick={()=>{convconsult._id = appointment._id;
                          converttoconsultation(convconsult)
                          window.location.reload();
                        }}>
                          entrer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
        <td colSpan={7} className="px-4 py-8 text-center text-xl text-gray-900">
        Aucun rendez-vous trouvé
                    </td> </tr>
                )}
              </tbody></table>
          </div>
        </div>
          )} 

         <Modal open={isPopupOpen} onclose={closePopup}>
  {selectedAppointment  && (
      <div> <h2 className="text-lg font-semibold mb-4">Modifier le rendez-vous</h2>
      <form
        onSubmit={handleAddAppointment} // À implémenter dans ton composant
        className="space-y-4"
      >
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
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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