import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MedicalServices as DossierIcon,CalendarToday,
  Emergency,Phone,Info,Description,} from '@mui/icons-material';
import {Typography,Paper,Avatar,  Button,IconButton,} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';




const SalleAttente = () => {
    const location = useLocation();
  const medecin = location.state?.medecin;
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  



 useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate) return;

      const dateString = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  console.log(dateString)
      try {
       const medecinId=medecin._id
        const response = await axios.post(
          `http://localhost:3000/rendezvous/disponible`,{ _id: medecinId, date: dateString },
         
        );
        const formattedTimes = response.data.map((isoDate: string) =>
          new Date(isoDate)
        );
        setAvailableTimes(formattedTimes); 
        console.log(formattedTimes)
      
      } catch (error) {
        console.error('Erreur lors du chargement des horaires disponiblses :', error);
      }
    };
    fetchAvailableTimes();
  }, [selectedDate]);

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15);
  const [isReady, setIsReady] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(3);
  const [showBookingForm, setShowBookingForm] = useState(false);


  const queueStats = [
    { label: 'Temps moyen d\'attente', value: '18 min' },
    { label: 'Patients aujourd\'hui', value: '24' },
    { label: 'Votre attente estimée', value: `${timeLeft} min` },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          
          navigate('/espace-patient/specialite');
          return 0;
        }
        return prev - 1;
      });
      if (currentPosition > 0 && Math.random() > 0.7) {
        setCurrentPosition((prev) => prev - 1);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [currentPosition, navigate]);

  

  return (
    <div className="min-h-screen bg-gray-100  max-w-6xl mx-auto">
      {/* Doctor Section */}
      <button className="mr-4 p-2 rounded-md border  border-gray-300 bg-white hover:bg-gray-50 transition-colors"
       onClick={()=>navigate(-1)}><ArrowLeft className="h-5 w-5" /></button>
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 mb-6 overflow-hidden"
>
  <div className="p-6 md:flex">
                {/* Photo et info de base */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                  <div className="h-32 w-32 rounded-full bg-gray-100 overflow-hidden border-2 border-blue-50">
                    {medecin.photo_profil ? (
                      <img 
                        src={medecin.photo_profil} 
                        alt={`Dr. ${medecin.nom}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">
                        👨‍⚕️
                      </div>
                    )}
                  </div>
                </div>

                {/* Détails principaux */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Dr. {medecin.prenom} {medecin.nom}
                      </h2>
                      <p className="text-blue-600 font-medium">{medecin.nom_specialite}</p>
                      <p className="text-gray-500 mt-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {medecin.adresse_cabinet}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 md:text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {medecin ? "60 D" : 'Non renseigné'}
                      </p>
                      <p className="text-sm text-gray-500">Consultation</p>
                    </div>
                  </div>

                  {/* Informations de contact */}
             
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <a href={`tel:${medecin.telephone_cabinet}`} className="text-gray-700 hover:text-blue-600">
                        {medecin.telephone_cabinet}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <a href={`mailto:${medecin.email}`} className="text-gray-700 hover:text-blue-600">
                        {medecin.email}
                      </a>
                    </div>
  </div></div>

        {/* Boutons d'action */}
        <div className="bg-gray-50 px-6 md:px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<CalendarToday />}
              className="flex-1 py-3 shadow-sm hover:shadow-md transition-shadow"
              fullWidth
            >
              Prendre Rendez-vous
            </Button>
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<Phone />} 
              className="flex-1 py-3 hover:bg-blue-50 transition-colors"
              fullWidth
            >
              Appeler le cabinet
            </Button>
          </div>
        </div>
      </motion.div>
<div className="mb-6">
  <label className="block text-2xl font-bold text-gray-900 mb-1">
    Consulter les dates disponibles  :
  </label>
  <DatePicker
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
  />
</div>


  {/*affivhage  Available Times Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="bg-white rounded-xl shadow-md p-3 mb-3"
>
  <Typography variant="h6" className="font-bold mb-4">
    Horaires disponibles le {selectedDate ? selectedDate.toLocaleDateString() : '...'}
  </Typography>

  {availableTimes.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
      {availableTimes.map((time, index) => (
        <button
          key={index}
          onClick={()=>console.log(time)}
          className="bg-blue-50 hover:bg-blue-100 w-2/3 text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-200 shadow-sm transition duration-200 ease-in-out"
        >
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:false })}
        </button>
      ))}
    </div>
  ) : (
    <Typography variant="body2" className="text-gray-500">
      Aucune disponibilité pour cette date.
    </Typography>
  )}
</motion.div>


      {/* Queue Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-6 mb-6"
      >
        <Typography variant="h6" className="font-bold mb-6">Votre position dans la file d'attente</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {queueStats.map((stat, index) => (
            <Paper key={index} className="p-4 bg-blue-50 rounded-lg">
              <Typography variant="caption" className="font-medium text-blue-600">{stat.label}</Typography>
              <Typography variant="h4" className="font-bold">{stat.value}</Typography>
            </Paper>
          ))}
        </div>
        <div className="mb-6">
          <div className="flex justify-between">
            <Typography variant="caption" className="text-gray-600">Début</Typography>
            <Typography variant="caption" className="text-gray-600">Progression</Typography>
            <Typography variant="caption" className="text-gray-600">Votre tour</Typography>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-green-600"
              style={{ width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%` }}
            />
          </div>
        </div>
        <Typography className="text-center text-gray-600">
          {currentPosition === 1
            ? 'Vous êtes le prochain ! Préparez-vous'
            : currentPosition <= 3
            ? `Plus que ${currentPosition - 1} patient(s) devant vous`
            : `Environ ${timeLeft} minutes d'attente`}
        </Typography>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <Button
          onClick={() => setIsReady(!isReady)}
          variant={isReady ? 'contained' : 'outlined'}
          color={isReady ? 'success' : 'primary'}
          startIcon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>}
          className="py-4"
        >
          {isReady ? 'Prêt pour la consultation' : 'Confirmer ma présence'}
        </Button>
        <Button variant="outlined" color="error" startIcon={<Emergency />} className="py-4"
         onClick={()=> {console.log(availableTimes, selectedDate, medecin._id)}}>
          Signaler une urgence
        </Button>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <Typography variant="h6" className="font-bold mb-6">En attendant votre tour</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <DossierIcon />, label: 'Dossier Médical', action: () => navigate('/dossier') },
            { icon: <Description />, label: 'Documents', action: () => {} },
            { icon: <Info />, label: 'Infos pratiques', action: () => {} },
          ].map((item, index) => (
            <Button
              key={index}
              onClick={item.action}
              variant="text"
              className="flex flex-col items-center p-4 hover:bg-blue-50"
            >
              <Avatar className="w-12 h-12 bg-blue-50 mb-2">{item.icon}</Avatar>
              <Typography variant="caption" className="font-medium text-center">{item.label}</Typography>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Booking Form */}
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
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <Typography variant="h6" className="font-bold">Nouveau rendez-vous</Typography>
                <IconButton onClick={() => setShowBookingForm(false)}>
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </IconButton>
              </div>
           
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default SalleAttente;
