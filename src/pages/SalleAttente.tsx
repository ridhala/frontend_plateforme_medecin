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

  // Données mockées enrichies
  const doctor = {
    name: "Dr. Sophie Martin",
    specialty: "Cardiologie",
    avatar: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
    status: "available" as const,
    currentPatientNumber: 42,
    rating: 4.9,
    experience: "12 ans",
    languages: ["Français", "Anglais"],
    bio: "Spécialiste en cardiologie interventionnelle, diplômée de l'Université de Paris.",
    location: "Centre Médical Paris Nord, Bâtiment A, 2ème étage",
    consultationDuration: "20 min",
    nextAvailableSlot: "Demain à 10h30"
  };

  const queueStats = [
    { label: "Temps moyen d'attente", value: "18 min" },
    { label: "Patients aujourd'hui", value: "24" },
    { label: "Votre attente estimée", value: `${timeLeft} min` }
  ];

  // Simulation dynamique plus réaliste
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          navigate('/consultation');
          return 0;
        }
        return Math.max(0, prev - 1);
      });
      
      // Simulation plus réaliste de la file d'attente
      if (currentPosition > 0 && Math.random() > 0.7) {
        setCurrentPosition(prev => prev - 1);
      }
    }, 60000); // Mise à jour chaque minute
    
    return () => clearInterval(timer);
  }, [currentPosition, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi au backend
    setTimeout(() => {
      alert(`Rendez-vous confirmé avec ${doctor.name} le ${formData.date} à ${formData.time}`);
      setShowBookingForm(false);
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        reason: ''
      });
    }, 1500);
  };

  // Couleurs médicales professionnelles
  const colors = {
    primary: '#1a73e8', // Bleu professionnel
    secondary: '#34a853', // Vert rassurant
    accent: '#fbbc05', // Jaune d'accentuation
    background: '#f8f9fa', // Fond très clair
    text: '#202124', // Texte sombre
    lightText: '#5f6368', // Texte secondaire
    card: '#ffffff', // Fond des cartes
    emergency: '#ea4335' // Rouge pour urgences
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header minimaliste */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-lg font-medium" style={{ color: colors.text }}>Salle d'Attente Virtuelle</h1>
          <div className="w-8"></div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Section médecin - Carte élégante */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
          style={{ borderLeft: `4px solid ${colors.primary}` }}
        >
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img 
                src={doctor.avatar} 
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover border-4"
                style={{ borderColor: colors.primary }}
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: colors.text }}>{doctor.name}</h2>
                  <p className="text-sm" style={{ color: colors.primary }}>{doctor.specialty}</p>
                </div>
                <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-medium" style={{ color: colors.primary }}>{doctor.consultationDuration}</span>
                </div>
              </div>
              
              <div className="mt-3 flex items-center">
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
                <span className="text-xs ml-1" style={{ color: colors.lightText }}>({doctor.rating})</span>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: colors.lightText }}>{doctor.location}</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span style={{ color: colors.lightText }}>Prochaine dispo: {doctor.nextAvailableSlot}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowBookingForm(true)}
              className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Prendre Rendez-vous
            </button>
            <button
              className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center border transition-colors"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appeler le cabinet
            </button>
          </div>
        </motion.section>

        {/* Section file d'attente - Design moderne */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden p-6"
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Votre position dans la file d'attente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Numéro actuel</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{doctor.currentPatientNumber}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Votre position</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{currentPosition}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Temps estimé</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{timeLeft} min</p>
            </div>
          </div>
          
          {/* Barre de progression améliorée */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1" style={{ color: colors.lightText }}>
              <span>Début</span>
              <span>Progression</span>
              <span>Votre tour</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%`,
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-center" style={{ color: colors.lightText }}>
            {currentPosition === 1 
              ? 'Vous êtes le prochain ! Préparez-vous' 
              : currentPosition <= 3 
                ? `Plus que ${currentPosition - 1} patient(s) devant vous` 
                : `Environ ${timeLeft} minutes d'attente`}
          </p>
        </motion.section>

        {/* Statistiques utiles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden p-6"
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>Informations d'attente</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {queueStats.map((stat, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <p className="text-xs font-medium" style={{ color: colors.lightText }}>{stat.label}</p>
                <p className="text-lg font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Actions principales */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <button
            onClick={() => setIsReady(!isReady)}
            className={`py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-colors ${
              isReady 
                ? 'bg-green-100 text-green-800' 
                : 'bg-white text-gray-800 shadow-md hover:shadow-lg'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isReady ? 'Prêt pour la consultation' : 'Confirmer ma présence'}
          </button>
          
          <button
            className="py-4 px-6 rounded-xl font-medium flex items-center justify-center bg-white shadow-md hover:shadow-lg transition-shadow"
            style={{ color: colors.emergency }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Signaler une urgence
          </button>
        </motion.section>

        {/* Ressources en attente */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden p-6"
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>En attendant votre tour</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${colors.primary}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-xs text-center" style={{ color: colors.text }}>Préparer mes questions</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${colors.primary}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs text-center" style={{ color: colors.text }}>Documents médicaux</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${colors.primary}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <span className="text-xs text-center" style={{ color: colors.text }}>Historique médical</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${colors.primary}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-xs text-center" style={{ color: colors.text }}>Infos pratiques</span>
            </button>
          </div>
        </motion.section>

        {/* Formulaire de rendez-vous - Modal moderne */}
        <AnimatePresence>
          {showBookingForm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>Nouveau rendez-vous</h3>
                  <button 
                    onClick={() => setShowBookingForm(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.lightText}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleBookAppointment} className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Nom Complet</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ borderColor: colors.primary, focusRingColor: colors.primary }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ borderColor: colors.primary, focusRingColor: colors.primary }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                        style={{ borderColor: colors.primary, focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Heure</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                        style={{ borderColor: colors.primary, focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Motif de consultation</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ borderColor: colors.primary, focusRingColor: colors.primary }}
                      placeholder="Décrivez brièvement la raison de votre visite"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-5 py-2.5 rounded-lg font-medium border"
                      style={{ borderColor: colors.lightText, color: colors.text }}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg font-medium text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Confirmer le rendez-vous
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}