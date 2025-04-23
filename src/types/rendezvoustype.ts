export interface Appointment {
  _id: number|""; 
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  type: string;
  specialite: string; 
  medecin: string; 
  status: boolean|string
}
export interface Appointments {
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  type: string | null;
  specialite: string; 
  status: boolean| string; 
}
export interface convert {
  _id: number | ""
}