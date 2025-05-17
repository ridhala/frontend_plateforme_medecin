import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MedecinProfile } from "../../types/profilemedecin";
import { fetchspecialite, listrendezvousprise } from "../../services/servicedashpatient/servicepatient";
import { ListeMedecinschoisi } from "./medecinchoisi";
import { Appointmente } from "../../types/rendezvoustype";


export const SpecialitesContent = () => {
    
 const specialites = [
  { id: 1, name: 'General Medicine', icon: '🩺'},
  { id: 2, name: 'Cardiology', icon: '❤️' },
  { id: 3, name: 'Dermatology', icon: '🧴'},
  { id: 4, name: 'Neurology', icon: '🧠'},
  { id: 5, name: 'Pediatrics', icon: '👶', },
  { id: 6, name: 'Orthopedics', icon: '🦴', },
  { id: 7, name: 'ENT', icon: '👂' },
  { id: 8, name: 'Gynecology', icon: '🌸'},
  { id: 9, name: 'Psychiatry', icon: '🧘'},
];
  const [rendezvousprise, setrendezvousprise]= useState<Appointmente[]>([])
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
      console.log(list)
    } catch (error) {
      console.error("Échec de chargement des rendezvous :", error);
      setrendezvousprise([]); // en cas d'erreur, on évite un undefined
    }
  };

  fetchlisterendezvousprise();
}, []);




if(choisimed) return <ListeMedecinschoisi specialty={sp} listmedecin={listmedecin} onBack={() => setchoisimed(false)} />
// ... keep your existing imports and component definition

return (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Spécialités</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {specialites.map((spec) => (
        <div
          key={spec.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-blue-200"
          onClick={() => {
            console.log(spec.name, listmedecin);
            setsp(spec.name);
            setchoisimed(true);
          }}
        >
          <div className="p-5">
            <div className="flex items-center mb-3">
              <div className="text-2xl mr-3">{spec.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{spec.name}</h3>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="text-blue-600 font-medium flex items-center">
                Voir médecins <EyeIcon className="h-4 w-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>

 
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
                  <td className="px-6 py-4 text-sm text-gray-800 font-bold">{rdv.medecin.nom_specialite}</td>

              <td className="px-6 py-4 text-sm text-gray-800">
              <div className="font-bold">{new Date(rdv.date_rendez_vous).toLocaleDateString()}</div>  
                 <div className="font-bold">{new Date(rdv.date_rendez_vous).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:false })}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 font-bold">{rdv.type}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  </div>
);

};