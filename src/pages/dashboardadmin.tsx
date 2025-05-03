import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MenuIcon from "@mui/icons-material/Menu";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "patient" | "medecin" | "secretaire";
}

const drawerWidth = 250;

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: "1", fullName: "Ahmed Ben Ali", email: "ahmed@gmail.com", phone: "+216 98 123 456", role: "patient" },
        { id: "2", fullName: "Dr. Sana Maatoug", email: "sana@hopital.tn", phone: "+216 23 456 789", role: "medecin" },
        { id: "3", fullName: "Nadia Ferjani", email: "nadia@admin.tn", phone: "+216 29 654 321", role: "secretaire" },
        { id: "4", fullName: "Walid Jemni", email: "walid@gmail.com", phone: "+216 56 987 123", role: "patient" },
      ]);
    }, 500);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderTable = (role: User["role"]) => (
    <TableContainer component={Paper} className="shadow-md">
      <Table>
        <TableHead sx={{ backgroundColor: "#e0f7fa" }}>
          <TableRow>
            <TableCell><strong>Nom Complet</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Téléphone</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.filter((user) => user.role === role).map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const drawer = (
    <div className="h-full bg-gradient-to-b from-blue-600 to-blue-400 text-white">
      <Toolbar>
        <Typography variant="h6" className="mx-auto font-bold">Clinique Admin</Typography>
      </Toolbar>
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon /> },
          { text: "Patients", icon: <PeopleIcon /> },
          { text: "Médecins", icon: <LocalHospitalIcon /> },
          { text: "Secrétaires", icon: <AssignmentIndIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => setTabValue(index === 0 ? 0 : index - 1)}>
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} className="text-white font-semibold" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: "#0288d1" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          MedPlat Admin Dashboard 
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#f0f4f8", minHeight: "100vh" }}
      >
        <Toolbar />
        <Card className="shadow-xl">
          <CardContent>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="secondary"
              variant="fullWidth"
              className="mb-6"
            >
              <Tab label="Patients" />
              <Tab label="Médecins" />
              <Tab label="Secrétaires" />
            </Tabs>

            {tabValue === 0 && renderTable("patient")}
            {tabValue === 1 && renderTable("medecin")}
            {tabValue === 2 && renderTable("secretaire")}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
