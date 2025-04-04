export interface Appointment {
  _id: number|""; 
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  specialite: string; 
  medecin: string; 
  status: boolean; 
}
export interface Appointments {
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  specialite: string; 
  status: boolean| string; 
}
