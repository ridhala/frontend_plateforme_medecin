import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar, Toolbar, Typography, Box, CssBaseline, Drawer,
  IconButton, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Tabs, Tab, Card, CardContent, Table,
  TableHead, TableRow, TableCell, TableBody, Paper,
  TableContainer, Divider, CircularProgress, Alert,
  Chip, Button, Snackbar
} from "@mui/material";
import {
  Dashboard as DashboardIcon, People as PeopleIcon, LocalHospital as LocalHospitalIcon,
  AssignmentInd as AssignmentIndIcon, Menu as MenuIcon,
  CheckCircle as CheckCircleIcon, Cancel as CancelIcon
} from "@mui/icons-material";
import {
  getPatients,
  getMedecins,
  getSecretaires,
  activerMedecin,
  desactiverMedecin,
} from "../services/admin/adminservice";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authentification/loginService";

const drawerWidth = 260;

interface Patient {
  _id: string;
  nom_patient?: string;
  nom?: string;
  prenom_patient?: string;
  prenom?: string;
  cin_patient?: string;
  email?: string;
  telephone?: string;
}

interface Medecin {
  _id: string;
  nom?: string;
  prenom?: string;
  cin_medecin?: string;
  email?: string;
  telephone_cabinet?: string;
  telephone?: string;
  verification: boolean;
}

interface Secretaire {
  _id: string;
  nom_secretaire?: string;
  nom?: string;
  prenom_secretaire?: string;
  prenom?: string;
  cin_secretaire?: string;
  email?: string;
  telephone?: string;
}

const AdminDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [secretaires, setSecretaires] = useState<Secretaire[]>([]);
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
const navigate= useNavigate();
  // Optimisation: Mise à jour immédiate de l'état local
  const updateMedecinVerification = useCallback((id: string, verification: boolean) => {
    setMedecins(prevMedecins => 
      prevMedecins.map(medecin => 
        medecin._id === id 
          ? { ...medecin, verification } 
          : medecin
      )
    );
  }, []);

  const handleActivation = async (id: string) => {
    setActionLoading(id);
    try {
      // Mise à jour immédiate de l'UI (optimistic update)
      updateMedecinVerification(id, true);
      
      const result = await activerMedecin(id);
      console.log('Médecin activé:', result);
      showSnackbar('Médecin activé avec succès', 'success');
    } catch (err) {
      console.error("Problème d'activation:", err);
      // Rollback en cas d'erreur
      updateMedecinVerification(id, false);
      showSnackbar("Erreur lors de l'activation", 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDesactivation = async (id: string) => {
    setActionLoading(id);
    try {
      // Mise à jour immédiate de l'UI (optimistic update)
      updateMedecinVerification(id, false);
      
      const result = await desactiverMedecin(id);
      console.log('Médecin désactivé:', result);
      showSnackbar('Médecin désactivé avec succès', 'success');
    } catch (err) {
      console.error("Problème de désactivation:", err);
      // Rollback en cas d'erreur
      updateMedecinVerification(id, true);
      showSnackbar("Erreur lors de la désactivation", 'error');
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resPatients, resMedecins, resSecretaires] = await Promise.all([
          getPatients(),
          getMedecins(),
          getSecretaires(),
        ]);
        setPatients(resPatients);
        setMedecins(resMedecins);
        setSecretaires(resSecretaires);
        setError(null);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        setError("Échec du chargement des données. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Professional Sidebar
  const drawer = (
    <Box sx={{ bgcolor: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ bgcolor: '#1976d2', color: 'white', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          MEDPLAT
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, p: 2 }}>
        {["Dashboard", "Patients", "Médecins", "Secrétaires"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              mb: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#e0e0e0' },
              ...(tab === index && { 
                bgcolor: '#1976d2', 
                '& .MuiListItemText-primary': { color: 'white' }, 
                '& .MuiSvgIcon-root': { color: 'white' } 
              }),
            }}
          >
            <ListItemButton onClick={() => setTab(index)} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ color: tab === index ? 'white' : 'text.secondary' }}>
                {[<DashboardIcon />, <PeopleIcon />, <LocalHospitalIcon />, <AssignmentIndIcon />][index]}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ fontWeight: 'medium', fontSize: '1.1rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        
        <Typography color="blue">
      <button onClick={()=>{navigate("/loginadmin") ;logout()} } className="cursor-pointer"
        >Deconnexion</button>   
        </Typography>
      </Box>
      <Box sx={{ p: 2, textAlign: 'center' }}>

        <Typography variant="caption" color="text.secondary">
          © 2025 MEDPLAT
        </Typography>
      </Box>
      
    </Box>
  );

  // Dashboard with summary cards - Optimisé avec useMemo
  const renderDashboard = () => (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      justifyContent: 'center',
    }}>
      <Card sx={{ flex: '1 1 300px', maxWidth: '100%', bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary">Patients</Typography>
          <Typography variant="h4">{patients.length}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: '1 1 300px', maxWidth: '100%', bgcolor: '#f3e5f5', borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">Médecins</Typography>
          <Typography variant="h4">{medecins.length}</Typography>
          <Typography variant="caption" color="text.secondary">
            {medecins.filter(m => m.verification).length} actifs
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: '1 1 300px', maxWidth: '100%', bgcolor: '#e8f5e9', borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="success.main">Secrétaires</Typography>
          <Typography variant="h4">{secretaires.length}</Typography>
        </CardContent>
      </Card>
    </Box>
  );

  // Patients Table - Optimisé
  const renderPatientsTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell colSpan={4} sx={{ fontWeight: 'bold', fontSize: '1.2rem', py: 2 }}>
              Patients ({patients.length})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'medium' }}>Nom</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>CIN</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Téléphone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <TableRow key={patient._id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                <TableCell>{`${patient.nom_patient || patient.nom || ''} ${patient.prenom_patient || patient.prenom || ''}`}</TableCell>
                <TableCell>{patient.cin_patient || '-'}</TableCell>
                <TableCell>{patient.email || '-'}</TableCell>
                <TableCell>{patient.telephone || '-'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}>
                Aucun patient trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Médecins Table - Complètement optimisé
  const renderMedecinsTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell colSpan={6} sx={{ fontWeight: 'bold', fontSize: '1.2rem', py: 2 }}>
              Médecins ({medecins.length})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'medium' }}>Nom</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>CIN</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Téléphone</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Actions</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>État</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medecins.length > 0 ? (
            medecins.map((medecin) => (
              <TableRow key={medecin._id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                <TableCell>{`${medecin.nom || ''} ${medecin.prenom || ''}`}</TableCell>
                <TableCell>{medecin.cin_medecin || '-'}</TableCell>
                <TableCell>{medecin.email || '-'}</TableCell>
                <TableCell>{medecin.telephone_cabinet || medecin.telephone || '-'}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {!medecin.verification ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleActivation(medecin._id)}
                        disabled={actionLoading === medecin._id}
                        sx={{ minWidth: 100 }}
                      >
                        {actionLoading === medecin._id ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          'Activer'
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => handleDesactivation(medecin._id)}
                        disabled={actionLoading === medecin._id}
                        sx={{ minWidth: 100 }}
                      >
                        {actionLoading === medecin._id ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          'Désactiver'
                        )}
                      </Button>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={medecin.verification ? 'Activé' : 'Désactivé'}
                    color={medecin.verification ? 'success' : 'error'}
                    variant="filled"
                    size="small"
                    sx={{ fontWeight: 'medium' }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                Aucun médecin trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Secrétaires Table - Optimisé
  const renderSecretairesTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell colSpan={4} sx={{ fontWeight: 'bold', fontSize: '1.2rem', py: 2 }}>
              Secrétaires ({secretaires.length})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'medium' }}>Nom</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>CIN</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Téléphone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secretaires.length > 0 ? (
            secretaires.map((secretaire) => (
              <TableRow key={secretaire._id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                <TableCell>{`${secretaire.nom_secretaire || secretaire.nom || ''} ${secretaire.prenom_secretaire || secretaire.prenom || ''}`}</TableCell>
                <TableCell>{secretaire.cin_secretaire || '-'}</TableCell>
                <TableCell>{secretaire.email || '-'}</TableCell>
                <TableCell>{secretaire.telephone || '-'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}>
                Aucun secrétaire trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: 'none', sm: 'block' },
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            borderRight: 'none', 
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)' 
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#fafafa' }}>
        <Toolbar />
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Tabs
              value={tab}
              onChange={(_, val) => setTab(val)}
              centered
              sx={{ 
                mb: 2, 
                '& .MuiTab-root': { 
                  fontWeight: 'medium', 
                  textTransform: 'none', 
                  fontSize: '1rem' 
                } 
              }}
            >
              <Tab label="Dashboard" />
              <Tab label="Patients" />
              <Tab label="Médecins" />
              <Tab label="Secrétaires" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : tab === 0 ? (
                renderDashboard()
              ) : tab === 1 ? (
                renderPatientsTable()
              ) : tab === 2 ? (
                renderMedecinsTable()
              ) : (
                renderSecretairesTable()
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={closeSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;