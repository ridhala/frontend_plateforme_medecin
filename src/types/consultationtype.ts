export interface Consultation {
    _id: number | null;
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
  }