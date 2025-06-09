import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, CssBaseline, Drawer,
  IconButton, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Tabs, Tab, Card, CardContent, Table,
  TableHead, TableRow, TableCell, TableBody, Paper,
  TableContainer, Divider, CircularProgress, Alert
} from "@mui/material";
import {
  Dashboard as DashboardIcon, People as PeopleIcon, LocalHospital as LocalHospitalIcon,
  AssignmentInd as AssignmentIndIcon, Menu as MenuIcon,
} from "@mui/icons-material";
import {
  getPatients,
  getMedecins,
  getSecretaires,
  activerMedecin,
  desactiverMedecin,
} from "../services/admin/adminservice";

const drawerWidth = 260;

const AdminDashboard: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [medecins, setMedecins] = useState<any[]>([]);
  const [secretaires, setSecretaires] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
const handleActivation = async (id:string) => {
  try {
    const result = await activerMedecin(id);
    console.log('Médecin activé:', result);
  } catch (err) {
    console.error("probleme d'activation");
  }
};

const handleDesactivation = async (id: string) => {
  try {
    const result = await desactiverMedecin(id);
    console.log('Médecin désactivé:', result);
  } catch (err) {
    console.error("probleme de désactivation");
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
              ...(tab === index && { bgcolor: '#1976d2', '& .MuiListItemText-primary': { color: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }),
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
        <Typography variant="caption" color="text.secondary">
          © 2025 MEDPLAT
        </Typography>
      </Box>
    </Box>
  );

  // Dashboard with summary cards
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

  // Patients Table
  const renderPatientsTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell colSpan={4} sx={{ fontWeight: 'bold', fontSize: '1.2rem', py: 2 }}>
              Patients
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

  // Médecins Table
  const renderMedecinsTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell colSpan={6} sx={{ fontWeight: 'bold', fontSize: '1.2rem', py: 2 }}>
              Médecins
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'medium' }}>Nom</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>CIN</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>Téléphone</TableCell>
            <TableCell sx={{ fontWeight: 'medium' }}>vérification</TableCell>
                        <TableCell sx={{ fontWeight: 'medium' }}>Etat</TableCell>

            
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
                
                <TableCell>{ <div className="space-x-3"><button onClick={()=>{handleActivation(medecin._id)}}
                 className="bg-green-600 rounded-sm cursor-pointer">activer</button>

                <button onClick={()=>{handleDesactivation(medecin._id)}}
                 className="bg-red-600 rounded-sm cursor-pointer">desactiver</button>
                </div>}</TableCell>
                <TableCell>{medecin.verification ? <h2 className="text-green-500 rounded-xl font-semibold">Activé</h2>:
                <h2 className="text-red-500 font-semibold">Desactivé</h2>}</TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}>
                Aucun médecin trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Secrétaires Table
  const renderSecretairesTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell colSpan={4} sx={{ fontWeight: 'bold', fontSize: '1.2rem', py: 2 }}>
              Secrétaires
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: 'none', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' },
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
              sx={{ mb: 2, '& .MuiTab-root': { fontWeight: 'medium', textTransform: 'none', fontSize: '1rem' } }}
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
    </Box>
  );
};

export default AdminDashboard;