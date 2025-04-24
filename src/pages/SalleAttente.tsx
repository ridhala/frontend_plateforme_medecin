import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { 
  MedicalServices as DossierIcon,
  Home, 
  Person, 
  CalendarToday, 
  Settings, 
  QrCodeScanner, 
  SmartToy} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  BottomNavigation, 
  BottomNavigationAction, 
  IconButton, 
  Drawer, 
  CssBaseline, 
  AppBar, 
  Toolbar,
  Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#34a853',
    },
    error: {
      main: '#ea4335',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Composant Dossier Médical
const DossierMedical = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dossier'); // Redirection immédiate
  }, [navigate]);

  return null; // Aucun affichage, redirection automatique
};

// Composant AI Manager
const AIManager = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Espace AI Manager
      </Typography>
      <Typography variant="body1" paragraph>
        Utilisez notre assistant IA pour poser des questions sur votre santé ou prendre rendez-vous.
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Posez votre question
        </Typography>
        {/* Intégration du chat IA ici */}
      </Paper>
    </Box>
  );
};

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
  const [activeTab, setActiveTab] = useState('salleAttente');
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dossier':
        return <DossierMedical />;
      case 'ai':
        return <AIManager />;
      default:
        return (
          <>
            {/* Section médecin */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ borderLeft: `4px solid ${theme.palette.primary.main}`, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '24px' }}
            >
              <Box sx={{ p: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
                <Box sx={{ flexShrink: 0 }}>
                  <img 
                    src={doctor.avatar} 
                    alt={doctor.name}
                    style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${theme.palette.primary.main}` }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                        {doctor.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
                        {doctor.specialty}
                      </Typography>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#e8f0fe', px: 2, py: 1, borderRadius: '4px' }}>
                      <CalendarToday sx={{ fontSize: 16, color: theme.palette.primary.main, mr: 1 }} />
                      <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                        {doctor.consultationDuration}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
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
                    <Typography variant="caption" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                      ({doctor.rating})
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={3} sx={{ mt: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', color: theme.palette.primary.main, marginRight: '8px', marginTop: '2px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {doctor.location}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', color: theme.palette.primary.main, marginRight: '8px', marginTop: '2px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          Prochaine dispo: {doctor.nextAvailableSlot}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              
              <Box sx={{ px: 6, pb: 6, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                <Button
                  onClick={() => setShowBookingForm(true)}
                  fullWidth
                  variant="contained"
                  startIcon={<CalendarToday />}
                  sx={{ py: 3 }}
                >
                  Prendre Rendez-vous
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  sx={{ py: 3 }}
                >
                  Appeler le cabinet
                </Button>
              </Box>
            </motion.section>

            {/* Section file d'attente */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', padding: '24px', marginBottom: '24px' }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 4, color: theme.palette.text.primary }}>
                Votre position dans la file d'attente
              </Typography>
              
              <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 4, backgroundColor: '#e8f0fe', borderRadius: '8px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                      Numéro actuel
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                      {doctor.currentPatientNumber}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 4, backgroundColor: '#e8f0fe', borderRadius: '8px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                      Votre position
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                      {currentPosition}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 4, backgroundColor: '#e8f0fe', borderRadius: '8px' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
                      Temps estimé
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                      {timeLeft} min
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Début
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Progression
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Votre tour
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px', overflow: 'hidden', mt: 1 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      borderRadius: '9999px',
                      width: `${100 - ((currentPosition / (currentPosition + 5)) * 100)}%`,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    }}
                  />
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                {currentPosition === 1 
                  ? 'Vous êtes le prochain ! Préparez-vous' 
                  : currentPosition <= 3 
                    ? `Plus que ${currentPosition - 1} patient(s) devant vous` 
                    : `Environ ${timeLeft} minutes d'attente`}
              </Typography>
            </motion.section>

            {/* Statistiques utiles */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', padding: '24px', marginBottom: '24px' }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 4, color: theme.palette.text.primary }}>
                Informations d'attente
              </Typography>
              <Grid container spacing={4}>
                {queueStats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Paper sx={{ p: 3, border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'medium', color: theme.palette.text.secondary }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: theme.palette.text.primary }}>
                        {stat.value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </motion.section>

            {/* Actions principales */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={() => setIsReady(!isReady)}
                    fullWidth
                    variant={isReady ? 'contained' : 'outlined'}
                    color={isReady ? 'success' : 'primary'}
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    }
                    sx={{ py: 4 }}
                  >
                    {isReady ? 'Prêt pour la consultation' : 'Confirmer ma présence'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    }
                    sx={{ py: 4 }}
                  >
                    Signaler une urgence
                  </Button>
                </Grid>
              </Grid>
            </motion.section>

            {/* Ressources en attente */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', padding: '24px', marginTop: '24px' }}
            >
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 4, color: theme.palette.text.primary }}>
                En attendant votre tour
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={6} md={3}>
                  <Button
                    onClick={() => setActiveTab('dossier')}
                    fullWidth
                    variant="text"
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      p: 3,
                      '&:hover': { backgroundColor: '#e8f0fe' }
                    }}
                  >
                    <Avatar sx={{ 
                      width: 48, 
                      height: 48, 
                      backgroundColor: 'rgba(26, 115, 232, 0.08)', 
                      mb: 2 
                    }}>
                      <DossierIcon color="primary" />
                    </Avatar>
                    <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                      Dossier Médical
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      p: 3,
                      '&:hover': { backgroundColor: '#e8f0fe' }
                    }}
                  >
                    <Avatar sx={{ 
                      width: 48, 
                      height: 48, 
                      backgroundColor: 'rgba(26, 115, 232, 0.08)', 
                      mb: 2 
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', color: theme.palette.primary.main }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </Avatar>
                    <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                      Documents médicaux
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Button
                    onClick={() => setActiveTab('ai')}
                    fullWidth
                    variant="text"
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      p: 3,
                      '&:hover': { backgroundColor: '#e8f0fe' }
                    }}
                  >
                    <Avatar sx={{ 
                      width: 48, 
                      height: 48, 
                      backgroundColor: 'rgba(26, 115, 232, 0.08)', 
                      mb: 2 
                    }}>
                      <SmartToy color="primary" />
                    </Avatar>
                    <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                      AI Manager
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Button
                    fullWidth
                    variant="text"
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      p: 3,
                      '&:hover': { backgroundColor: '#e8f0fe' }
                    }}
                  >
                    <Avatar sx={{ 
                      width: 48, 
                      height: 48, 
                      backgroundColor: 'rgba(26, 115, 232, 0.08)', 
                      mb: 2 
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', color: theme.palette.primary.main }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Avatar>
                    <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                      Infos pratiques
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </motion.section>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AppBar position="fixed" sx={{
  zIndex: (theme) => theme.zIndex.drawer + 1,
  backgroundColor: '#1a73e8', // Bleu professionnel
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre douce
  transition: 'background-color 0.3s ease-in-out',
}}>
  <Toolbar sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: { xs: '0 16px', md: '0 24px' }, // Espacement responsive
  }}>
    {/* Bouton Menu */}
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={toggleDrawer(true)}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transition: 'background-color 0.2s ease-in-out',
        },
      }}
    >
      <MenuIcon sx={{ fontSize: 28 }} />
    </IconButton>

    {/* Titre Centré */}
    <Typography
      variant="h6"
      component="div"
      sx={{
        flexGrow: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: '1px',
        color: '#fff',
        textTransform: 'uppercase',
        marginLeft: '16px',
        marginRight: '16px',
        fontSize: { xs: '1rem', md: '1.25rem' }, // Responsive font size
      }}
    >
      {activeTab === 'dossier'
        ? 'Dossier Médical'
        : activeTab === 'ai'
        ? 'AI Manager'
        : "Salle d'Attente Virtuelle"}
    </Typography>

    {/* Icône Scanner QR */}
    <IconButton
      color="inherit"
      onClick={() => {}}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transition: 'background-color 0.2s ease-in-out',
        },
      }}
    >
      <QrCodeScanner sx={{ fontSize: 28 }} />
    </IconButton>
  </Toolbar>
</AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>JD</Avatar>
              <Typography variant="subtitle1">Jean Dupont</Typography>
            </Box>
            <Divider />
            <List>
              <ListItem 
                button 
                onClick={() => setActiveTab('salleAttente')}
                selected={activeTab === 'salleAttente'}
              >
                <ListItemIcon><Home color="primary" /></ListItemIcon>
                <ListItemText primary="Salle d'attente" />
              </ListItem>
              <ListItem 
                button 
                onClick={() => setActiveTab('dossier')}
                selected={activeTab === 'dossier'}
              >
                <ListItemIcon><DossierIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Dossier Médical" />
              </ListItem>
              <ListItem 
                button 
                onClick={() => setActiveTab('ai')}
                selected={activeTab === 'ai'}
              >
                <ListItemIcon><SmartToy color="primary" /></ListItemIcon>
                <ListItemText primary="AI Manager" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><Settings color="primary" /></ListItemIcon>
                <ListItemText primary="Paramètres" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: '64px' }}>
          {renderContent()}
        </Box>

        {activeTab === 'salleAttente' && (
          <BottomNavigation
            value={activeTab}
            onChange={(_event, newValue) => setActiveTab(newValue)}
            showLabels
            sx={{ width: '100%', position: 'fixed', bottom: 0 }}
          >
            <BottomNavigationAction label="Accueil" value="salleAttente" icon={<Home />} />
            <BottomNavigationAction label="Dossier" value="dossier" icon={<DossierIcon />} />
            <BottomNavigationAction label="AI" value="ai" icon={<SmartToy />} />
            <BottomNavigationAction label="Profil" value="profile" icon={<Person />} />
          </BottomNavigation>
        )}

        {/* Formulaire de rendez-vous */}
        <AnimatePresence>
          {showBookingForm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1300 }}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}
              >
                <Box sx={{ p: 6, borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    Nouveau rendez-vous
                  </Typography>
                  <IconButton 
                    onClick={() => setShowBookingForm(false)}
                    sx={{ p: 1, '&:hover': { backgroundColor: '#f3f4f6' } }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', color: theme.palette.text.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </IconButton>
                </Box>
                
                <Box component="form" onSubmit={handleBookAppointment} sx={{ p: 6, '& > * + *': { mt: 5 } }}>
                  <Box>
                    <Typography variant="subtitle2" component="label" sx={{ display: 'block', fontWeight: 'medium', mb: 1, color: theme.palette.text.primary }}>
                      Nom Complet
                    </Typography>
                    <Box
                      component="input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{ 
                        width: '100%', 
                        p: 3, 
                        border: '1px solid #d1d5db', 
                        borderRadius: '8px', 
                        '&:focus': { 
                          outline: 'none', 
                          ring: 2,
                          ringColor: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main 
                        } 
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" component="label" sx={{ display: 'block', fontWeight: 'medium', mb: 1, color: theme.palette.text.primary }}>
                      Téléphone
                    </Typography>
                    <Box
                      component="input"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      sx={{ 
                        width: '100%', 
                        p: 3, 
                        border: '1px solid #d1d5db', 
                        borderRadius: '8px', 
                        '&:focus': { 
                          outline: 'none', 
                          ring: 2,
                          ringColor: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main 
                        } 
                      }}
                    />
                  </Box>
                  
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Typography variant="subtitle2" component="label" sx={{ display: 'block', fontWeight: 'medium', mb: 1, color: theme.palette.text.primary }}>
                          Date
                        </Typography>
                        <Box
                          component="input"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          sx={{ 
                            width: '100%', 
                            p: 3, 
                            border: '1px solid #d1d5db', 
                            borderRadius: '8px', 
                            '&:focus': { 
                              outline: 'none', 
                              ring: 2,
                              ringColor: theme.palette.primary.main,
                              borderColor: theme.palette.primary.main 
                            } 
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Typography variant="subtitle2" component="label" sx={{ display: 'block', fontWeight: 'medium', mb: 1, color: theme.palette.text.primary }}>
                          Heure
                        </Typography>
                        <Box
                          component="input"
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          sx={{ 
                            width: '100%', 
                            p: 3, 
                            border: '1px solid #d1d5db', 
                            borderRadius: '8px', 
                            '&:focus': { 
                              outline: 'none', 
                              ring: 2,
                              ringColor: theme.palette.primary.main,
                              borderColor: theme.palette.primary.main 
                            } 
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box>
                    <Typography variant="subtitle2" component="label" sx={{ display: 'block', fontWeight: 'medium', mb: 1, color: theme.palette.text.primary }}>
                      Motif de consultation
                    </Typography>
                    <Box
                      component="textarea"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={4}
                      sx={{ 
                        width: '100%', 
                        p: 3, 
                        border: '1px solid #d1d5db', 
                        borderRadius: '8px', 
                        '&:focus': { 
                          outline: 'none', 
                          ring: 2,
                          ringColor: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main 
                        } 
                      }}
                      placeholder="Décrivez brièvement la raison de votre visite"
                    />
                  </Box>
                  
                  <Box sx={{ pt: 4, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                    <Button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      variant="outlined"
                      sx={{ 
                        px: 5, 
                        py: 2.5, 
                        borderRadius: '8px', 
                        fontWeight: 'medium',
                        borderColor: theme.palette.text.secondary,
                        color: theme.palette.text.primary
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ 
                        px: 5, 
                        py: 2.5, 
                        borderRadius: '8px', 
                        fontWeight: 'medium',
                        backgroundColor: theme.palette.primary.main,
                        color: 'white'
                      }}
                    >
                      Confirmer le rendez-vous
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
}