export interface Consultation {
    _id: string | null;
    cin_patient: number | null;
    prenom_patient :string;
    nom_patient :string;
    diagnostic: string;
    ordonnance: string;
    type_consultation: string;
    date: string;
  }

  export interface Consultations {
    cin_patient: number | null;
    prenom_patient :string;
    nom_patient :string;
    diagnostic: string;
    ordonnance: string;
    type_consultation: string;
    date: string;
    telephone: number| null
  }