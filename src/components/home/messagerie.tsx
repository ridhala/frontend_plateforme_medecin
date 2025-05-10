import { useEffect, useState } from "react";
import { MedecinProfile } from "../../types/profilemedecin";
import { fetchmedecin, fetchMessages, sendMessage } from "../../services/messagerieservice";
import axios from "axios";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
prenom_medecin: string;
nom_medecin: string
  createdAt: string;
}

const Messagerie = () => {
  const [profileData, setProfileData] = useState<MedecinProfile[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<MedecinProfile | null>(null);
  const [search, setSearch] = useState("");
  const [specialite, setSpecialite] = useState("");
const[listmessages, setlistmessages]=useState<Message[]>([])
const [receiverId, setreceiverId]= useState<string>("")
const [SenderId, SetSenderId]= useState<string>("")
const [message, Setmessage]= useState<string>("")
  const specialtyOptions = JSON.parse(import.meta.env.VITE_SPECIALTY_NAMES || '[]');



useEffect(() => {
  const fetchUserId = async () => {
    try {
      const response = await axios.get('http://localhost:3000/update/me', {
        headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}

      });
      SetSenderId(response.data._id);
      console.log(response.data._id)
     
    } catch (error) {
      console.error('Erreur récupération ID:', error);
    }
  };
  
  fetchUserId();
}, []);

// profil medecin  
useEffect(() => {
    const ProfileData = async () => {
      try {
        const profil = await fetchmedecin();
        setProfileData(profil);

        
      } catch (err) {
        console.error("Erreur:", err);
      }
    };
    ProfileData();
  }, []);

  // envoyer un message 
  const envoyer = async () => {
    const data = { 
      senderId : SenderId, 
      receiverId, 
      message 
    };
    console.log(data)
    await sendMessage(data);
    const refresh=await fetchMessages(receiverId)
    setlistmessages(refresh)
    Setmessage("")
  }

  // fetch messages 
  useEffect(() => {
    const getmessage  = async () => {
      try {
        if(receiverId){
        const message = await fetchMessages(receiverId);
        console.log(message )
setlistmessages(message)}
        
      } catch (err) {
        console.error("Erreur:", err);
      }
    };
    getmessage();
  }, [receiverId]);



  const filteredUsers = (profileData || []).filter(
    (user) =>
      `${user.nom} ${user.prenom}`.toLowerCase().includes(search.toLowerCase()) &&
      (specialite === "" || user.nom_specialite === specialite)
);

const getMessagesForSelectedUser = () => {
  if (!selectedUser) {
    // Afficher tous les messages où "me" est soit l'expéditeur soit le destinataire
    return listmessages.filter(
      (msg) => msg.senderId === SenderId
    );
  }
  // Sinon, filtrer les messages avec l'utilisateur sélectionné
  return listmessages.filter(
    (msg) =>  
      (msg.senderId === SenderId&& msg.receiverId === receiverId)||
      (msg.receiverId === SenderId && msg.senderId === receiverId)
  );
};


  return (
    <div className="flex max-w-5xl mx-auto mt-10 h-[600px] border rounded-lg shadow-md overflow-hidden">
      {/* Liste des utilisateurs */}
      <div className="w-1/3 bg-gray-100 p-4 border-r overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Messagerie</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="w-full h-11 mb-4 p-2 border rounded-md"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)
              
            }
          >
            <option value="">Toutes les spécialités</option>
            {specialtyOptions.map((spec: string) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className="w-38 h-11 mb-1 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => {setSelectedUser(user);
                  setreceiverId(user._id)
                  console.log(receiverId)
                  
                }

                }
                className={`cursor-pointer p-2 rounded-md hover:bg-gray-200 ${
                  selectedUser?._id === user._id ? "bg-blue-100" : ""
                }`}
              >
                <div className="font-semibold">{user.nom} {user.prenom}</div>
                <div className="text-sm text-gray-500">{user.nom_specialite}</div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">Aucun utilisateur trouvé</li>
          )}
        </ul>
      </div>

      {/* Zone des messages */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="overflow-y-auto space-y-3 flex-1">
          <h3 className="text-xl font-semibold mb-4">
            {selectedUser
              ? `Conversation avec Dr ${selectedUser.nom}`
              : "Sélectionnez une conversation"}
          </h3>
          {getMessagesForSelectedUser().length > 0 ? (
            getMessagesForSelectedUser().map((msg) => (
              <div
                key={msg._id}
                className={`p-3 rounded-xl max-w-75 ${
                  msg.senderId === SenderId &&( "ml-auto bg-blue-400")
                }   ${
                  msg.receiverId === SenderId &&( "bg-gray-400")
                }
                 `}
              >
                <div className="text-sm text-gray-600 flex justify-between">
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <div className="mt-1 italic">{msg.message}</div>
              </div>
            ))
          ) : selectedUser ? (
            <p className="text-gray-500 italic">Aucun message</p>
          ) : null}
        </div>
        <div className="grid grid-cols-5 gap-2">
  <div className="col-span-4">
    <input
      type="text"
      value={message}
      onChange={(e)=>Setmessage(e.target.value)}
      placeholder="Écrire un message..."
      className="w-full border rounded-md p-2 h-10"
    />
  </div>
  <div className="col-span-1">
    <button 
      className="bg-blue-700 text-white rounded-md h-10 w-full flex items-center justify-center hover:bg-blue-800 transition"
      onClick={envoyer}
    >
      Envoyer
    </button>
  </div>
</div>
             </div>
    </div>
  );
};

export default Messagerie;
