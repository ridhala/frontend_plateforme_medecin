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

  // Données mockées avec plus de détails
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

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Simulation dynamique
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
      
      if (currentPosition > 0 && Math.random() > 0.85) {
        setCurrentPosition(prev => prev - 1);
      }
    }, 30000); // Mise à jour toutes les 30 secondes

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
    // Ici vous enverriez les données à votre backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header animé */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4 md:mb-0">
            <button 
              onClick={() => navigate('/')}
              className="mr-4 text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Salle d'Attente Virtuelle</h1>
              <p className="text-blue-600">Suivi en temps réel de votre consultation</p>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </motion.header>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche - Carte médecin */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 flex justify-center">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg transform hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{doctor.name}</h2>
                <p className="text-blue-600 font-medium mb-3">{doctor.specialty}</p>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-2">{doctor.rating}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{doctor.bio}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">Expérience: {doctor.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-gray-600">Langues: {doctor.languages.join(', ')}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Réserver un Rendez-vous
                </button>
              </div>
            </motion.div>

            {/* Section Assistance */}
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Besoin d'aide ?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Service Client</h4>
                    <p className="text-gray-600 text-sm">01 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600 text-sm">contact@mediconnect.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne de droite - Salle d'attente */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Carte Statut */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Votre Position</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Numéro Actuel</p>
                  <p className="text-4xl font-bold text-blue-600">{doctor.currentPatientNumber}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Votre Position</p>
                  <p className="text-4xl font-bold text-blue-600">{currentPosition}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Temps d'Attente</p>
                  <p className="text-4xl font-bold text-blue-600">{timeLeft} min</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-right">
                {currentPosition === 1 ? 'Vous êtes le prochain !' : `${currentPosition - 1} patients devant vous`}
              </p>
            </motion.div>

            {/* Carte Préparation */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Préparation Consultation</h2>
                <button
                  onClick={() => setIsReady(!isReady)}
                  className={`px-6 py-3 rounded-xl font-medium flex items-center justify-center transition-all ${
                    isReady 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {isReady ? 'Prêt pour la consultation ✓' : 'Confirmer ma présence'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Documents Requis
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Carte Vitale</li>
                    <li>Ordonnances récentes</li>
                    <li>Examens médicaux</li>
                    <li>Carte mutuelle</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Recommandations
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Connexion stable</li>
                    <li>Endroit calme</li>
                    <li>Préparer vos questions</li>
                    <li>Arriver 5 min avant</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Patients devant vous */}
            {currentPosition > 1 && (
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-xl p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">File d'Attente</h2>
                
                <div className="space-y-3">
                  {Array.from({ length: currentPosition - 1 }).map((_, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <span className="font-medium text-blue-600">{doctor.currentPatientNumber + idx}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Patient {doctor.currentPatientNumber + idx}</p>
                        <p className="text-sm text-gray-500">Consultation {doctor.specialty}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          idx === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          {idx === 0 ? 'En cours' : 'En attente'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Formulaire de Rendez-vous - Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Réserver un Rendez-vous</h3>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBookAppointment}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motif de consultation</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700"
                  >
                    Confirmer le Rendez-vous
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