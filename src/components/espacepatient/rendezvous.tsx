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



export const RendezvousTable = () => {
    



  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [selectedtime, setSelectedtime] = useState<string>("")

    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [rendezvousprise, setrendezvousprise]= useState<Appointmente[]>([])
    const [selectedrendez, setselectedrendez]= useState<Appointmente |null>()

  const [choisimed, setchoisimed]=useState<boolean>(false)
  const[sp, setsp]=useState<string>("")

const [listmedecin,setlistmedecin]=useState<MedecinProfile[]>([])
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
      onClick={() =>{setselectedrendez(rdv);
       // setSelectedDate(new Date(rdv.date_rendez_vous))
      }}
      className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold cursor-pointer
       rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-200"
    >
      Modifier RDV
    </button>
    <button 
      onClick={() => {setIsConfirmOpen(true);
      }}
      className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg cursor-pointer
       shadow-md hover:bg-red-600 hover:text-white transition duration-200">
      Annuler RDV
    </button>
   <Deletemodal
         open={isConfirmOpen}
         onClose={() => setIsConfirmOpen(false)}
         onConfirm={() => {
          deleterendezvous(rdv._id)
        
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
  </div>
  
</div>

  </div>
);

};