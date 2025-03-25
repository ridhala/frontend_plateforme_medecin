// Chat.tsx
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { FiMessageCircle, FiX } from 'react-icons/fi';

const socket = io('http://localhost:5000'); // URL du backend

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  file?: string;
  createdAt: string;
}

const Chat: React.FC<{ doctorId: string }> = ({ doctorId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage && !file) return;

    const formData = new FormData();
    formData.append('senderId', doctorId);
    formData.append('receiverId', receiverId);
    formData.append('text', newMessage);
    if (file) formData.append('file', file);

    try {
      const { data } = await axios.post('http://localhost:5000/api/messages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      socket.emit('sendMessage', data);
      setMessages([...messages, data]);
      setNewMessage('');
      setFile(null);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  };

  return (
    <div>
      {/* Icône flottante */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Boîte de chat */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg border overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h2 className="text-lg font-bold">Messagerie</h2>
            <button onClick={() => setIsOpen(false)}><FiX size={20} /></button>
          </div>

          <div className="p-3 flex flex-col h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.senderId === doctorId ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`p-2 rounded-lg max-w-xs ${msg.senderId === doctorId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  <p>{msg.text}</p>
                  {msg.file && <a href={`http://localhost:5000/uploads/${msg.file}`} download className="text-blue-200">📄 Télécharger</a>}
                  <span className="block text-xs text-gray-300">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex items-center">
            <input
              type="text"
              placeholder="Écrire un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} className="ml-2" />
            <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;