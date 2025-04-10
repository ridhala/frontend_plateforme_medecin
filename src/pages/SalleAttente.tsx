import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SalleAttente() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<number>(3);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });

  // Données mockées
  const doctor = {
    name: "Dr. Sophie Martin",
    specialty: "Cardiologie",
    avatar: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
    status: "available" as const,
    currentPatientNumber: 42,
    rating: 4.9,
    experience: "12 ans",
    languages: ["Français", "Anglais"],
    bio: "Spécialiste en cardiologie interventionnelle, diplômée de l'Université de Paris."
  };

  // Simulation dynamique
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
      if (currentPosition > 0 && Math.random() > 0.85) {
        setCurrentPosition(prev => prev - 1);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [currentPosition]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Rendez-vous confirmé avec ${doctor.name} le ${formData.date} à ${formData.time}`);
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-3 md:p-6">
      {/* Header simplifié pour mobile */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-4 rounded-lg shadow-sm mb-4 sticky top-0 z-10"
      >
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-blue-900 text-center flex-1">Salle d'Attente</h1>
          <div className="w-6"></div> {/* Pour équilibrer le layout */}
        </div>
        <p className="text-xs text-blue-600 text-center mt-1">Suivi en temps réel</p>
      </motion.header>

      {/* Contenu principal en colonne pour mobile */}
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Carte médecin optimisée mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 flex justify-center">
            <img 
              src={doctor.avatar} 
              alt={doctor.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-blue-600 text-sm md:text-base">{doctor.specialty}</p>
              </div>
              <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-blue-800">{timeLeft} min</span>
              </div>
            </div>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-600 ml-1">{doctor.rating}</span>
            </div>

            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium text-sm md:text-base flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Réserver
            </button>
          </div>
        </motion.div>

        {/* Section statut de position */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">Votre Position</h2>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-blue-50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">Numéro Actuel</p>
              <p className="text-2xl font-bold text-blue-600">{doctor.currentPatientNumber}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">Votre Position</p>
              <p className="text-2xl font-bold text-blue-600">{currentPosition}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">Temps Restant</p>
              <p className="text-2xl font-bold text-blue-600">{timeLeft} min</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
              style={{ width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 text-right">
            {currentPosition === 1 ? 'Vous êtes le prochain !' : `${currentPosition - 1} patients devant vous`}
          </p>
        </motion.div>

        {/* Bouton de confirmation mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <button
            onClick={() => setIsReady(!isReady)}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center ${
              isReady 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-600 text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isReady ? 'Prêt ✓' : 'Confirmer ma présence'}
          </button>
        </motion.div>

        {/* Préparation consultation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">Préparation</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-bold text-blue-800 text-sm mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Documents Requis
              </h3>
              <ul className="list-disc list-inside text-xs text-gray-700 pl-2 space-y-1">
                <li>Carte Vitale</li>
                <li>Ordonnances</li>
                <li>Examens médicaux</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-bold text-blue-800 text-sm mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Recommandations
              </h3>
              <ul className="list-disc list-inside text-xs text-gray-700 pl-2 space-y-1">
                <li>Connexion stable</li>
                <li>Endroit calme</li>
                <li>Préparer vos questions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* File d'attente */}
        {currentPosition > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-3">File d'Attente</h2>
            
            <div className="space-y-2">
              {Array.from({ length: Math.min(3, currentPosition - 1) }).map((_, idx) => (
                <div key={idx} className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-blue-600">
                      {doctor.currentPatientNumber + idx}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Patient {doctor.currentPatientNumber + idx}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    idx === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {idx === 0 ? 'En cours' : 'En attente'}
                  </span>
                </div>
              ))}
              {currentPosition - 1 > 3 && (
                <p className="text-xs text-gray-500 text-center mt-1">
                  + {currentPosition - 4} autres patients devant vous
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Section assistance mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-3">Assistance</h2>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Contactez le secrétariat</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Annuler le rendez-vous</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Formulaire de rendez-vous mobile */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50"
          >
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white rounded-t-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Prendre Rendez-vous</h3>
                  <button 
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleBookAppointment} className="p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motif</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="py-2 bg-gray-200 text-gray-800 rounded-lg font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="py-2 bg-blue-600 text-white rounded-lg font-medium"
                  >
                    Confirmer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}