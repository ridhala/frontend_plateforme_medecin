// types/types.ts
export interface Patientform {
  cin_patient: number | '';
  nom_patient: string;
  prenom_patient: string;
  email: string;
  telephone: number | '';
  password: string;
  date_naissance: string;
  sex: string;
}
