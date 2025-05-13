import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MedicalServices as DossierIcon,
  CalendarToday, 
  SmartToy,
  AccessTime,
  Emergency,
  Phone,
  Info,
  Description} from '@mui/icons-material';
import {  
  Typography, 
  Paper, 
  Avatar, 
  Button,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  ThemeProvider,
  createTheme,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Thème personnalisé
const theme = createTheme({
  palette: {
    primary: { main: '#1a73e8' },
    secondary: { main: '#34a853' },
    error: { main: '#ea4335' },
    background: { default: '#f8f9fa' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface Availability {
  id: number;
  date: string;
  time: string;
  status: 'available' | 'reserved' | 'passed';
}

const mockAvailabilities: Availability[] = [
  { id: 1, date: '2023-06-15', time: '09:00', status: 'available' },
  { id: 2, date: '2023-06-15', time: '09:30', status: 'reserved' },
  { id: 3, date: '2023-06-15', time: '10:00', status: 'available' },
  { id: 4, date: '2023-06-15', time: '10:30', status: 'available' },
  { id: 5, date: '2023-06-15', time: '11:00', status: 'passed' },
  { id: 6, date: '2023-06-15', time: '11:30', status: 'available' },
  { id: 7, date: '2023-06-16', time: '09:00', status: 'available' },
  { id: 8, date: '2023-06-16', time: '09:30', status: 'available' },
];

const AvailabilityBlock = ({ doctor }: { doctor: any }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredAvailabilities, setFilteredAvailabilities] = useState<Availability[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const filtered = selectedDate 
      ? mockAvailabilities.filter(avail => avail.date === selectedDate && avail.status === 'available')
      : mockAvailabilities.filter(avail => avail.status === 'available');
    setFilteredAvailabilities(filtered);
  }, [selectedDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
        marginBottom: '24px',
        width: '100%'
      }}
    >
      <div style={{ padding: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AccessTime color="primary" /> Disponibilités du Dr. {doctor.name.split(' ')[1]}
          </Typography>
          <TextField
            type="date"
            size="small"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday fontSize="small" color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {filteredAvailabilities.length > 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Heure</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAvailabilities.map((availability) => (
                  <TableRow key={availability.id} hover>
                    <TableCell>{new Date(availability.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{availability.time}</TableCell>
                    <TableCell>
                      <Chip 
                        label={availability.status === 'available' ? 'Disponible' : 'Réservé'} 
                        size="small" 
                        color={availability.status === 'available' ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        disabled={availability.status !== 'available'}
                        onClick={() => console.log('Book', availability)}
                        startIcon={<CalendarToday fontSize="small" />}
                      >
                        Réserver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#fafafa' }}>
            <Typography color="textSecondary">
              Aucune disponibilité trouvée pour cette date
            </Typography>
          </Paper>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            startIcon={<CalendarToday />}
            onClick={() => console.log('Voir plus de disponibilités')}
            sx={{ borderRadius: '8px' }}
          >
            Voir plus de créneaux
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function SalleAttente() {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [timeLeft, setTimeLeft] = useState(15);
  const [isReady, setIsReady] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(3);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });

  const doctor = {
    name: "Dr. Sophie Martin",
    specialty: "Cardiologie",
    avatar: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
    currentPatientNumber: 42,
    rating: 4.9,
    consultationDuration: "20 min",
    nextAvailableSlot: "Demain à 10h30",
    location: "Centre Médical Paris Nord, Bâtiment A, 2ème étage"
  };

  const queueStats = [
    { label: "Temps moyen d'attente", value: "18 min" },
    { label: "Patients aujourd'hui", value: "24" },
    { label: "Votre attente estimée", value: `${timeLeft} min` }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          navigate('/consultation');
          return 0;
        }
        return Math.max(0, prev - 1);
      });
      
      if (currentPosition > 0 && Math.random() > 0.7) {
        setCurrentPosition(prev => prev - 1);
      }
    }, 60000);
    
    return () => clearInterval(timer);
  }, [currentPosition, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section médecin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            borderLeft: `4px solid ${theme.palette.primary.main}`, 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
            marginBottom: '24px',
            width: '100%'
          }}
        >
          <div style={{ 
            padding: '48px', 
            display: 'flex', 
            gap: '48px',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              padding: '24px'
            }
          }}>
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
              <Avatar 
                src={doctor.avatar} 
                alt={doctor.name}
                sx={{ width: 96, height: 96, border: `4px solid ${theme.palette.primary.main}` }}
              />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    {doctor.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
                    {doctor.specialty}
                  </Typography>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: '#e8f0fe', 
                  padding: '4px 16px', 
                  borderRadius: '4px' 
                }}>
                  <CalendarToday sx={{ fontSize: 16, color: theme.palette.primary.main, marginRight: '8px' }} />
                  <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                    {doctor.consultationDuration}
                  </Typography>
                </div>
              </div>
              
              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ width: '16px', height: '16px', color: i < Math.floor(doctor.rating) ? '#fbbf24' : '#d1d5db' }} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <Typography variant="caption" sx={{ marginLeft: '8px', color: theme.palette.text.secondary }}>
                  ({doctor.rating})
                </Typography>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '24px', 
                marginTop: '32px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', color: theme.palette.primary.main, marginRight: '8px', marginTop: '2px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {doctor.location}
                  </Typography>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', color: theme.palette.primary.main, marginRight: '8px', marginTop: '2px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Prochaine dispo: {doctor.nextAvailableSlot}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            padding: '0 48px 48px 48px', 
            display: 'flex', 
            gap: '24px',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              padding: '0 24px 24px 24px'
            }
          }}>
            <Button
              onClick={() => setShowBookingForm(true)}
              fullWidth
              variant="contained"
              startIcon={<CalendarToday />}
              sx={{ py: 2 }}
            >
              Prendre Rendez-vous
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Phone />}
              sx={{ py: 2 }}
            >
              Appeler le cabinet
            </Button>
          </div>
        </motion.div>

        <AvailabilityBlock doctor={doctor} />

        {/* Section file d'attente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
            marginBottom: '24px',
            padding: '32px',
            width: '100%'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: '32px', color: theme.palette.text.primary }}>
            Votre position dans la file d'attente
          </Typography>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px', 
            marginBottom: '48px'
          }}>
            {queueStats.map((stat, index) => (
              <Paper key={index} sx={{ 
                padding: '24px', 
                backgroundColor: '#e8f0fe', 
                borderRadius: '8px', 
                height: '100%' 
              }}>
                <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                  {stat.value}
                </Typography>
              </Paper>
            ))}
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Début</Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Progression</Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Votre tour</Typography>
            </div>
            <div style={{ 
              width: '100%', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '9999px', 
              height: '12px', 
              overflow: 'hidden', 
              marginTop: '8px' 
            }}>
              <div style={{ 
                height: '100%', 
                borderRadius: '9999px',
                width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%`,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }}/>
            </div>
          </div>
          
          <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
            {currentPosition === 1 
              ? 'Vous êtes le prochain ! Préparez-vous' 
              : currentPosition <= 3 
                ? `Plus que ${currentPosition - 1} patient(s) devant vous` 
                : `Environ ${timeLeft} minutes d'attente`}
          </Typography>
        </motion.div>

        {/* Actions principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}
        >
          <Button
            onClick={() => setIsReady(!isReady)}
            fullWidth
            variant={isReady ? 'contained' : 'outlined'}
            color={isReady ? 'success' : 'primary'}
            startIcon={<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>}
            sx={{ py: 3 }}
          >
            {isReady ? 'Prêt pour la consultation' : 'Confirmer ma présence'}
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<Emergency />}
            sx={{ py: 3 }}
          >
            Signaler une urgence
          </Button>
        </motion.div>

        {/* Ressources en attente */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
            marginTop: '24px',
            padding: '32px',
            width: '100%'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: '32px', color: theme.palette.text.primary }}>
            En attendant votre tour
          </Typography>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '24px'
          }}>
            {[
              { icon: <DossierIcon />, label: 'Dossier Médical', action: () => navigate('/dossier') },
              { icon: <Description />, label: 'Documents', action: () => {} },
              { icon: <Info />, label: 'Infos pratiques', action: () => {} },
            ].map((item, index) => (
              <Button
                key={index}
                onClick={item.action}
                fullWidth
                variant="text"
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  padding: '16px',
                  '&:hover': { backgroundColor: '#e8f0fe' }
                }}
              >
                <Avatar sx={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: 'rgba(26, 115, 232, 0.08)', 
                  marginBottom: '8px' 
                }}>
                  {item.icon}
                </Avatar>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.text.primary, 
                  textAlign: 'center',
                  fontWeight: 'medium'
                }}>
                  {item.label}
                </Typography>
              </Button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showBookingForm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ 
                position: 'fixed', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '16px', 
                zIndex: 1300 
              }}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0 24px 48px rgba(0,0,0,0.2)', 
                  width: '100%', 
                  maxWidth: '500px', 
                  maxHeight: '90vh', 
                  overflowY: 'auto' 
                }}
              >
                <div style={{ 
                  padding: '24px', 
                  borderBottom: '1px solid #e5e7eb', 
                  position: 'sticky', 
                  top: 0, 
                  backgroundColor: 'white', 
                  zIndex: 1, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    Nouveau rendez-vous
                  </Typography>
                  <IconButton onClick={() => setShowBookingForm(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', color: theme.palette.text.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </IconButton>
                </div>
                
                <form onSubmit={handleBookAppointment} style={{ padding: '24px' }}>

                <TextField
                    label="Cin "
                    name="CIN"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Nom "
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                  />
                   <TextField
                    label="prenom "
                    name="prenom"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                    type="tel"
                  />
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginTop: '16px'
                  }}>
                    <TextField
                      label="Date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                   
                  </div>
                  
                
                  <div style={{ 
                    paddingTop: '32px', 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: '16px' 
                  }}>
                    <Button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      variant="outlined"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                    >
                      Confirmer
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}