import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

// Types
interface Participant {
  id: string;
  role: 'admin' | 'medecin';
  name: string;
}

interface Message {
  _id: string;
  senderId: string;
  senderRole: 'admin' | 'medecin';
  text: string;
  read: boolean;
  createdAt: string;
}

interface Conversation {
  _id: string;
  participants: Participant[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

interface MessagingInterfaceProps {
  userId: string;
  userRole: 'admin' | 'medecin';
}

const MessagingInterface: React.FC<MessagingInterfaceProps> = ({ userId, userRole }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pusherRef = useRef<any>(null);

  // Fonction pour récupérer les conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:3000/support/conversations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setConversations(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des conversations');
      setLoading(false);
    }
  };

  // Fonction pour récupérer une conversation spécifique
  const fetchConversation = async (conversationId: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`http://localhost:3000/support/conversations/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSelectedConversation(response.data);
      markMessagesAsRead(conversationId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement de la conversation');
    }
  };

  // Fonction pour envoyer un message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedConversation) return;
    
    try {
      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:3000/support/messages', {
        conversationId: selectedConversation._id,
        text: message
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setMessage('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du message');
    }
  };

  // Fonction pour marquer les messages comme lus
  const markMessagesAsRead = async (conversationId: string) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.patch(`http://localhost:3000/support/conversations/${conversationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err: any) {
      console.error('Erreur lors du marquage des messages comme lus', err);
    }
  };

  // Fonction pour initialiser une conversation avec un médecin (pour admin)
  const initConversation = async (medecinId: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:3000/support/conversations', {
        medecinId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      fetchConversations();
      setSelectedConversation(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l\'initialisation de la conversation');
    }
  };

  // Défiler vers le bas des messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Charger les conversations au montage
  useEffect(() => {
    fetchConversations();
  }, []);

  // Défiler vers le bas lorsque les messages changent
  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  // Configurer Pusher
  useEffect(() => {
    // Initialiser Pusher
    pusherRef.current = new Pusher('71d63c611a2d434ead5b', {
      cluster: 'eu',
      
    });
    
    // Nettoyer lors du démontage
    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  // S'abonner aux canaux de conversation
  useEffect(() => {
    if (!pusherRef.current) return;
    
    // Désabonner des canaux précédents
    pusherRef.current.allChannels().forEach((channel: any) => {
      pusherRef.current.unsubscribe(channel.name);
    });
    
    // S'abonner aux canaux pour toutes les conversations
    conversations.forEach(conversation => {
      const channel = pusherRef.current.subscribe(`conversation-${conversation._id}`);
      
      // Recevoir un nouveau message
      channel.bind('new-message', (data: any) => {
        if (selectedConversation && selectedConversation._id === data.conversationId) {
          // Mettre à jour la conversation sélectionnée
          setSelectedConversation(prev => {
            if (!prev) return prev;
            
            const updatedMessages = [...prev.messages, data];
            return { ...prev, messages: updatedMessages };
          });
          
          // Marquer comme lu si l'expéditeur n'est pas l'utilisateur actuel
          if (data.senderId !== userId) {
            markMessagesAsRead(data.conversationId);
          }
        }
        
        // Mettre à jour la liste des conversations
        fetchConversations();
      });
      
      // Messages marqués comme lus
      channel.bind('messages-read', (data: any) => {
        if (selectedConversation && selectedConversation._id === data.conversationId) {
          setSelectedConversation(prev => {
            if (!prev) return prev;
            
            const updatedMessages = prev.messages.map(msg => {
              if (msg.senderId === userId && !msg.read) {
                return { ...msg, read: true };
              }
              return msg;
            });
            
            return { ...prev, messages: updatedMessages };
          });
        }
      });
      
      // Message supprimé
      channel.bind('message-deleted', (data: any) => {
        if (selectedConversation && selectedConversation._id === data.conversationId) {
          setSelectedConversation(prev => {
            if (!prev) return prev;
            
            const updatedMessages = prev.messages.filter(msg => msg._id !== data.messageId);
            return { ...prev, messages: updatedMessages };
          });
        }
        
        // Mettre à jour la liste des conversations
        fetchConversations();
      });
    });
  }, [conversations, selectedConversation, userId]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Obtenir le nom de l'autre participant
  const getOtherParticipantName = (conversation: Conversation) => {
    const otherParticipant = conversation.participants.find(p => p.id !== userId);
    return otherParticipant ? otherParticipant.name : 'Inconnu';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Liste des conversations */}
      <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Aucune conversation trouvée
          </div>
        ) : (
          <ul>
            {conversations.map(conversation => {
              // Vérifier s'il y a des messages non lus
              const unreadCount = conversation.messages.filter(
                msg => msg.senderId !== userId && !msg.read
              ).length;
              
              // Obtenir le dernier message
              const lastMessage = conversation.messages.length > 0 
                ? conversation.messages[conversation.messages.length - 1] 
                : null;
                
              return (
                <li 
                  key={conversation._id}
                  onClick={() => fetchConversation(conversation._id)}
                  className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                    selectedConversation?._id === conversation._id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{getOtherParticipantName(conversation)}</h3>
                      {lastMessage && (
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {lastMessage.text}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400">
                        {formatDate(conversation.updatedAt).split(' ')[0]}
                      </span>
                      {unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      
      {/* Zone de messages */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            {/* En-tête de la conversation */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold">
                {getOtherParticipantName(selectedConversation)}
              </h2>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {selectedConversation.messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                  Aucun message. Commencez la conversation !
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedConversation.messages.map(msg => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                          msg.senderId === userId
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs opacity-70">
                            {formatDate(msg.createdAt)}
                          </span>
                          {msg.senderId === userId && (
                            <span className="text-xs">
                              {msg.read ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Formulaire d'envoi */}
            <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tapez votre message..."
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center text-gray-500">
              <p>Sélectionnez une conversation pour commencer</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Message d'erreur */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="absolute top-0 right-0 px-2 py-1"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagingInterface;