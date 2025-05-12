import { useEffect, useRef, useState } from "react";
import { MedecinProfile } from "../../types/profilemedecin";
import { fetchdiscussion, fetchmedecin, fetchMessages, sendMessage } from "../../services/messagerieservice";
import axios from "axios";
import Pusher from "pusher-js"; // Import the Pusher client library

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  prenom_medecin: string;
  nom_medecin: string;
  createdAt: string;
  isRead?: boolean;
}

const Messagerie = () => {

    const [discussion, setdiscussion] = useState<MedecinProfile[] | null>(null);

  const [profileData, setProfileData] = useState<MedecinProfile[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<MedecinProfile | null>(null);
  const [search, setSearch] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [listmessages, setlistmessages] = useState<Message[]>([]);
  const [receiverId, setreceiverId] = useState<string>("");
  const [SenderId, SetSenderId] = useState<string>("");
  const [message, Setmessage] = useState<string>("");
  const specialtyOptions = JSON.parse(import.meta.env.VITE_SPECIALTY_NAMES || "[]");
  const [pusherChannel, setPusherChannel] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Pusher once when component mounts
  useEffect(() => {
    const pusher = new Pusher("71d63c611a2d434ead5b", {
      cluster: "eu",
      forceTLS: true,
    });
    
    return () => {
      // Clean up Pusher connection when component unmounts
      if (pusher) {
        pusher.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/update/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        SetSenderId(response.data._id);
      } catch (error) {
        console.error("Erreur récupération ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Subscribe to Pusher channel when SenderId and receiverId are available
  useEffect(() => {
    if (SenderId && receiverId) {
      // Unsubscribe from previous channel if exists
      if (pusherChannel) {
        pusherChannel.unsubscribe();
      }

      // Create the channel name the same way as in the backend
      // Changed from private-chat to chat (public channel)
      const channelName = `chat-${[SenderId, receiverId].sort().join("-")}`;
      const pusher = new Pusher("71d63c611a2d434ead5b", {
        cluster: "eu",
        forceTLS: true,
      });
      
      const channel = pusher.subscribe(channelName);
      setPusherChannel(channel);

      // Listen for new messages
      channel.bind("new-message", (data: Message) => {
        setlistmessages((prevMessages) => {
          // Check if message already exists to avoid duplicates
          const messageExists = prevMessages.some((msg) => msg._id === data._id);
          if (messageExists) {
            return prevMessages;
          }
          return [...prevMessages, data];
        });
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [SenderId, receiverId]);

  // affichage de la liste des medecins 
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


  //affichage de la list de discussion
  useEffect(() => {
    const listdiscussion = async () => {
      try {
        const listmessage = await fetchdiscussion();
        setdiscussion(listmessage);
      } catch (err) {
        console.error("Erreur:", err);
      }
    };
    listdiscussion();
  }, [discussion]);



  const envoyer = async () => {
    if (!message.trim()) return; // Don't send empty messages
    
    const data = {
      senderId: SenderId,
      receiverId,
      message,
    };
    
    try {
      await sendMessage(data);
      // We don't need to manually fetch messages here anymore
      // as the Pusher event will update our message list
      Setmessage("");
    } catch (error) {
      console.error("Erreur d'envoi du message:", error);
    }
  };
// scroll
useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [message]);




  useEffect(() => {
    const getmessage = async () => {
      try {
        if (receiverId) {
          const message = await fetchMessages(receiverId);
          setlistmessages(message);
          Setmessage("");
        }
      } catch (err) {
        console.error("Erreur:", err);
      }
    };
    getmessage();
  }, [receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listmessages]);

  const filteredUsers = (profileData || []).filter(
    (user) =>
      `${user.nom} ${user.prenom}`.toLowerCase().includes(search.toLowerCase()) &&
      (specialite === "" || user.nom_specialite === specialite)
  );

  const getMessagesForSelectedUser = () => {
    if (!selectedUser) {
      return listmessages.filter((msg) => msg.senderId === SenderId);
    }
    return listmessages.filter(
      (msg) =>
        (msg.senderId === SenderId && msg.receiverId === receiverId) ||
        (msg.receiverId === SenderId && msg.senderId === receiverId)
    );
  };

  // Handle enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      envoyer();
    }
  };

return (
  <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-4 md:mt-10 h-[calc(100vh-180px)] md:h-[530px] border rounded-2xl shadow-lg overflow-hidden bg-white">

    {/* Sidebar : Liste des médecins ou discussions - Hidden on mobile when conversation is selected */}
    <div className={`w-full md:w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
      {/* En-tête et filtres */}
      <div className="p-4 md:p-5 border-b border-blue-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-3 md:mb-4">Messagerie</h2>

        <div className="space-y-2 md:space-y-3">
          <select
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Discussions récentes</option>
            {specialtyOptions.map((spec: string) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un médecin..."
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="flex-1 overflow-y-auto px-3 md:px-5 py-3 md:py-4">
        <ul className="space-y-2">
          {(specialite || search) ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    setreceiverId(user._id);
                  }}
                  className={`cursor-pointer p-2 md:p-3 rounded-xl transition shadow-sm ${
                    selectedUser?._id === user._id
                      ? "bg-blue-100 text-blue-900 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-400">
                      <img
                        src={user.photo_profil}
                        alt="Photo de profil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-gray-500">{user.nom_specialite}</div>
                      <div className="text-sm md:text-base font-medium text-gray-800">
                        {user.nom} {user.prenom}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">Aucun utilisateur trouvé</li>
            )
          ) : (
            (discussion || []).map((user) => (
              <li
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setreceiverId(user._id);
                }}
                className={`cursor-pointer p-2 md:p-3 rounded-xl transition shadow-sm ${
                  selectedUser?._id === user._id
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-400">
                    <img
                      src={user.photo_profil}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-500">{user.nom_specialite}</div>
                    <div className="text-sm md:text-base font-medium text-gray-800">
                      {user.nom} {user.prenom}
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>

    {/* Zone des messages - Hidden on mobile when no conversation is selected */}
    <div className={`w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-between ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
      {/* Header de conversation with back button on mobile */}
      <div className="mb-3 md:mb-4 border-b pb-3 flex items-center space-x-3 md:space-x-4">
        {selectedUser && (
          <>
            <button 
              onClick={() => setSelectedUser(null)} 
              className="md:hidden mr-2 text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src={selectedUser.photo_profil}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Dr {selectedUser.nom}
            </h3>
          </>
        )}
      </div>

      {/* Liste des messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
        {selectedUser && getMessagesForSelectedUser().length > 0 ? (
          getMessagesForSelectedUser().map((msg) => (
            <div
              key={msg._id}
              className={`p-2 md:p-3 rounded-2xl max-w-[85%] md:max-w-[75%] text-xs md:text-sm shadow-md break-words ${
                msg.senderId === SenderId
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              <div className="text-xs mb-1 opacity-70">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
              <div className="italic">{msg.message}</div>
            </div>
          ))
        ) : selectedUser ? (
          <p className="text-sm text-gray-500 italic text-center mt-10">Aucun message</p>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full">
            <p className="text-gray-800 font-semibold">Sélectionnez une conversation pour commencer</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Champ de saisie */}
      {selectedUser && (
        <div className="mt-3 md:mt-4 grid grid-cols-5 gap-2 md:gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => Setmessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Écrire un message..."
            className="col-span-4 px-3 md:px-4 h-10 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={envoyer}
            disabled={!message.trim()}
            className="col-span-1 h-10 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>
        </div>
      )}
    </div>
  </div>
);


};

export default Messagerie;