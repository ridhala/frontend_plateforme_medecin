import { useEffect, useState } from "react";
import { MedecinProfile } from "../../types/profilemedecin";
import { fetchspecialite, listrendezvousprise } from "../../services/servicedashpatient/servicepatient";
import { ListeMedecinschoisi } from "./medecinchoisi";
import { Appointmente } from "../../types/rendezvoustype";
import { deleterendezvous, updateRendezvouspatient } from "../../services/serviceshome/rendezvousservice";
import { Deletemodal } from "./pop-up/deleterdv";
import { UpdateModal } from "./pop-up/updaterdv";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Modal } from "../home/pop-up/modal";
import { Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Emergency } from "@mui/icons-material";



export const RendezvousTable = () => {
    



  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [selectedtime, setSelectedtime] = useState<string>("")

    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [rendezvousprise, setrendezvousprise]= useState<Appointmente[]>([])
  //rendezvous selecté 
    const [selectedrendez, setselectedrendez]= useState<Appointmente |null>()
  const[rendezdelete, setrendezdelete]=useState<string>("")

  const [choisimed, setchoisimed]=useState<boolean>(false)

  // specialite
  const[sp, setsp]=useState<string>("")

  //for modal position
    const [isPopupOpen, setIsPopupOpen] = useState(false);
//
const [listmedecin,setlistmedecin]=useState<MedecinProfile[]>([])
//affichage de list medecin par specialité
useEffect(() => {
  const fetchData = async () => {
    if (sp) {
      const med = await fetchspecialite(sp);
      setlistmedecin(med);
      console.log(med);
    }
  };
  fetchData();
}, [sp]); 

//position 
  const [isReady, setIsReady] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);
  const [currentPosition, setCurrentPosition] = useState(3);
const closePopup = () => {
  setIsPopupOpen(false);
  setselectedrendez(null);
};
  const queueStats = [
    { label: 'Temps moyen d\'attente', value: '18 min' },
    { label: 'Patients aujourd\'hui', value: '24' },
    { label: 'Votre attente estimée', value: `${timeLeft} min` },
  ];
/////
// listes des rendezvous deja prise
useEffect(() => {
  const fetchlisterendezvousprise = async () => {
    try {
      const list = await listrendezvousprise();
      setrendezvousprise(list);
    } catch (error) {
      console.error("Échec de chargement des rendezvous :", error);
      setrendezvousprise([]); // en cas d'erreur, on évite un undefined
    }
  };

  fetchlisterendezvousprise();
}, [rendezvousprise]);
useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate) return;

      const dateString = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
      try {if(selectedrendez){
       const medecinId=selectedrendez.medecin._id
        const response = await axios.post(
          `http://localhost:3000/rendezvous/disponible`,{ _id: medecinId, date: dateString },
         
        );
        console.log(medecinId, dateString)
        const formattedTimes = response.data.map((isoDate: string) =>
          new Date(isoDate)
        );
        setAvailableTimes(formattedTimes); 
        
       }
      
      } catch (error) {
        console.error('Erreur lors du chargement des horaires disponiblses :', error);
      }
    };
    fetchAvailableTimes();
  }, [selectedDate, selectedrendez, availableTimes]);

if(choisimed) return <ListeMedecinschoisi specialty={sp} listmedecin={listmedecin} onBack={() => setchoisimed(false)} />


return (
  <div className="p-6">
  


   {/* Rendez-vous Prise Table */}
<div className="mt-2">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Mes Rendez-vous</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-xl">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Médecin</th>
<th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Spécialité</th>
          <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Date</th>
         
          <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Type</th>

          <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Actions</th>
          
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rendezvousprise.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-4 text-gray-500">Aucun rendez-vous pris</td>
          </tr>
        ) : (
          rendezvousprise.map((rdv, index) => (
            <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-lg text-black font-semibold">
      {rdv.medecin ? `${rdv.medecin.nom} ${rdv.medecin.prenom}` : "—"}
    </td>
                  <td className="px-6 py-4 text-lg rounded-xl text-gray-800 font-semibold text-center">{rdv.medecin.nom_specialite}</td>

              <td className="px-6 py-4 text-lg rounded-xl text-gray-800 font-semibold text-center">
              <div className="font-semibold">{new Date(rdv.date_rendez_vous).toLocaleDateString()}</div>  
                 <div className="font-semibold">{new Date(rdv.date_rendez_vous).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:false })}</div>
              </td>
              <td className="px-6 py-4 "><h2 className="bg-teal-200 text-lg rounded-xl text-gray-800 font-bold text-center">{rdv.type}</h2></td>
     <td className="px-6 py-4 text-sm text-gray-800 font-semibold"> <div className="flex items-center space-x-2">
    <button 
      onClick={() =>{setselectedrendez(rdv)
        console.log(rdv.medecin.nom);
       // setSelectedDate(new Date(rdv.date_rendez_vous))
      }}
      className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold cursor-pointer
       rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-200"
    >
      Modifier RDV
    </button>
    <button 
      onClick={() => {setIsConfirmOpen(true)
        setrendezdelete(rdv._id)
      }}
      className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg cursor-pointer
       shadow-md hover:bg-red-600 hover:text-white transition duration-200">
      Annuler RDV
    </button> 
    <button 
    onClick={()=>setIsPopupOpen(true)}
      className="px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg cursor-pointer
       shadow-md hover:bg-teal-600 hover:text-white transition duration-200">
      Position
    </button>
   <Deletemodal
         open={isConfirmOpen}
         onClose={ () => setIsConfirmOpen(false)}
         onConfirm={async() => {
         await  deleterendezvous(rendezdelete)
          
        
           setIsConfirmOpen(false);
         }}
         message="Tu veux annuler ce Rendez-vous ?"
       />
  </div></td>

            </tr>
          ))
        )}
      </tbody>
    </table>
    <UpdateModal open={!!selectedrendez} onclose={()=>setselectedrendez(null)}>
  <div>
    <h1 className="text-center text-lg font-semibold">Passer le Date:</h1>
    {selectedrendez && (
   <div className="bg-white flex justify-center py-2 ">
      {<DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {  if (date) {
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
                }}
              }
          className="border border-black text-black font-bold rounded-md px-3 py-2 w-full"
          placeholderText="Choisir une date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />}

      </div>
  
    )}
    {availableTimes.length > 0 && (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
      {availableTimes.map((time, index) => (
        
    <button
  key={index}
  onClick={() => setSelectedtime(time.toISOString())}
  disabled={selectedtime === time.toISOString()}
  className={`w-2/3 py-2 px-4 rounded-lg border text-sm font-medium transition
    ${selectedtime === time.toISOString() 
      ? 'bg-blue-400 text-black cursor-not-allowed border-gray-300'
      : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-sm'}
  `}
>
  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:false })}
</button>

      ))}
    </div>
  )}
  <div className="flex justify-center py-6 font-semibold  ">
    <button className="bg-teal-400 rounded-lg h-10 text-xl font-bold w-50"
    onClick={async()=>{if (selectedrendez) {
      const response= await updateRendezvouspatient(selectedrendez?._id,new Date( selectedtime.toString()));
      console.log(response); setselectedrendez(null)}}}>
      Modifier</button></div>
  </div>
  </UpdateModal>
<Modal open={isPopupOpen} onclose={closePopup}>    {/* Queue Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-6 mb-6"
      >
        <Typography variant="h6" className="font-bold mb-6">Votre position dans la file d'attente aujourd'hui</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {queueStats.map((stat, index) => (
            <Paper key={index} className="p-4 bg-blue-50 rounded-lg">
              <Typography variant="caption" className="font-medium text-blue-600">{stat.label}</Typography>
              <Typography variant="h4" className="font-bold">{stat.value}</Typography>
            </Paper>
          ))}
        </div>
        <div className="mb-6">
          <div className="flex justify-between">
            <Typography variant="caption" className="text-gray-600">Début</Typography>
            <Typography variant="caption" className="text-gray-600">Progression</Typography>
            <Typography variant="caption" className="text-gray-600">Votre tour</Typography>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-green-600"
              style={{ width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%` }}
            />
          </div>
        </div>
        <Typography className="text-center text-gray-600">
          {currentPosition === 1
            ? 'Vous êtes le prochain ! Préparez-vous'
            : currentPosition <= 3
            ? `Plus que ${currentPosition - 1} patient(s) devant vous`
            : `Environ ${timeLeft} minutes d'attente`}
        </Typography>
      </motion.div>
       <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            >
              <Button
                onClick={() => setIsReady(!isReady)}
                variant={isReady ? 'contained' : 'outlined'}
                color={isReady ? 'success' : 'primary'}
                startIcon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>}
                className="py-4"
              >
                {isReady ? 'Prêt pour la consultation' : 'Confirmer ma présence'}
              </Button>
              <Button variant="outlined" color="error" startIcon={<Emergency />} className="py-4">
                Signaler une urgence
              </Button>
            </motion.div>
      </Modal>
  </div>
  
</div>

  </div>
);

};