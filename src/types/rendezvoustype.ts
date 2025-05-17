export interface Appointment {
  _id: number|""; 
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  type: string;
  nom_specialite: string; 
  medecin: string; 
  status: boolean|string
}
export interface RendezvousUpdateData {
  nom_patient?: string
  prenom_patient?: string
  telephone?: number
  cin_patient?: number 
  date_rendez_vous?: Date | null;
  status?: string;
}

export interface Appointments {
  date_rendez_vous: string | "";
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  type: string | null;
  status: boolean| string; 
}
export interface convert {
  _id: number | ""
}
// for patient
export interface Appointmente {
  _id: number|""; 
  date_rendez_vous: string;
  prenom_patient: string; 
  nom_patient: string; 
  cin_patient: number|""; 
  telephone: number| ""; 
  type: string;
  status: boolean|string;
  medecin: {
    _id: string;
    nom: string;
    prenom: string;
    nom_specialite: string
  };
}