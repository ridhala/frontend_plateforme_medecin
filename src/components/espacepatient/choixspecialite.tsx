import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MedecinProfile } from "../../types/profilemedecin";
import { fetchspecialite } from "../../services/servicedashpatient/servicepatient";
import { ListeMedecinschoisi } from "./medecinchoisi";

interface propsalle {
  salle:()=>void
}

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

if(choisimed) return <ListeMedecinschoisi specialty={sp} listmedecin={listmedecin} onBack={() => setchoisimed(false)} />
return(
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Spécialités</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialites.map((spec) => (
          <div 
            key={spec.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-blue-200"
            onClick={()=>{console.log(spec.name, listmedecin);
              setsp(spec.name)
              setchoisimed(true)
            }}
          >
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">
                  {spec.icon}
                </div>
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

    </div>
    )
};