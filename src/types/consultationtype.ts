export interface Consultation {
    _id: number | null;
    cin_patient: number | null;
    diagnostic: string;
    remarque: string;
    type_consultation: string;
    date: string;
    antecedents: string;
  }