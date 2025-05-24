import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, CssBaseline, Drawer,
  IconButton, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Tabs, Tab, Card, CardContent, Table,
  TableHead, TableRow, TableCell, TableBody, Paper,
  TableContainer,
} from "@mui/material";
import {
  Dashboard as DashboardIcon, People as PeopleIcon, LocalHospital as LocalHospitalIcon,
  AssignmentInd as AssignmentIndIcon, Menu as MenuIcon
} from "@mui/icons-material";
import {
  getPatients,
  getMedecins,
  getSecretaires,
} from "../services/admin/adminservice";


const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [medecins, setMedecins] = useState<any[]>([]);
  const [secretaires, setSecretaires] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPatients, resMedecins, resSecretaires] = await Promise.all([
          getPatients(),
          getMedecins(),
          getSecretaires(),
        ]);
        setPatients(resPatients);
        setMedecins(resMedecins);
        setSecretaires(resSecretaires);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      }
    };
    fetchData();
  }, []);

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>MEDPLAT</Typography>
      </Toolbar>
      <List>
        {["Dashboard", "Patients", "Médecins", "Secrétaires"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setTab(index)}>
              <ListItemIcon>
                {[<DashboardIcon />, <PeopleIcon />, <LocalHospitalIcon />, <AssignmentIndIcon />][index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

 const renderDashboard = () => (
  <Box sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3, // spacing between cards
    justifyContent: 'center', // centers cards on larger screens
  }}>
    {/* Patient Card */}
    <Card sx={{ 
      flex: '1 1 300px', // grows, shrinks, min-width 300px
      maxWidth: '100%',
      backgroundColor: '#e3f2fd'
    }}>
      <CardContent>
        <Typography variant="h6">Patients</Typography>
        <Typography variant="h4">{patients.length}</Typography>
      </CardContent>
    </Card>

    {/* Doctor Card */}
    <Card sx={{ 
      flex: '1 1 300px',
      maxWidth: '100%',
      backgroundColor: '#f3e5f5'
    }}>
      <CardContent>
        <Typography variant="h6">Médecins</Typography>
        <Typography variant="h4">{medecins.length}</Typography>
      </CardContent>
    </Card>

    {/* Secretary Card */}
    <Card sx={{ 
      flex: '1 1 300px',
      maxWidth: '100%',
      backgroundColor: '#e8f5e9'
    }}>
      <CardContent>
        <Typography variant="h6">Secrétaires</Typography>
        <Typography variant="h4">{secretaires.length}</Typography>
      </CardContent>
    </Card>
  </Box>
);
  const renderTable = () => {
    const roles = [patients, medecins, secretaires];
    const labels = ["Patients", "Médecins", "Secrétaires"];
    const roleData = roles[tab - 1];
    const roleLabel = labels[tab - 1];

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ fontWeight: "bold", fontSize: 18 }}>{roleLabel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>CIN</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleData.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{`${user.nom || user.nom_patient || user.nom_secretaire} ${user.prenom || user.prenom_patient|| user.prenom_secretaire}`}</TableCell>
                <TableCell>{user.cin_patient || user.cin_medecin || user.cin_secretaire}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone_cabinet || user.telephone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: "none", sm: "block" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
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
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Card>
          <CardContent>
            <Tabs value={tab} onChange={(_, val) => setTab(val)} centered>
              <Tab label="Dashboard" />
              <Tab label="Patients" />
              <Tab label="Médecins" />
              <Tab label="Secrétaires" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {tab === 0 ? renderDashboard() : renderTable()}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
