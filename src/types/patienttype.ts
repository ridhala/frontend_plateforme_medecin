export interface Patient {
  _id: number | null ; // Temporary ID for rendering, can be replaced with cin_patient
  cin_patient: number | null; // Unique patient ID
  nom_patient: string; // Last name
  prenom_patient: string; // First name
  sex: string; // Gender
  password: string; // Password (masked for security)
  date_naissance: string; // Birth date
  email: string; // Email address
  telephone: number | null; // Phone number
}

export interface addpatient {
  cin_patient: number | ""; // Unique patient ID
  nom_patient: string; // Last name
  prenom_patient: string; // First name
  sex: string; // Gender
  date_naissance: string; // Birth date
  email: string; // Email address
  telephone: number | ""; // Phone number
}