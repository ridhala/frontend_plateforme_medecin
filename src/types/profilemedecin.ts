export interface MedecinProfile {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  numero_licence: number|null;
  telephone_personnel:  number|null;
  telephone_cabinet:  number|null;
  adresse_cabinet: string;
  nom_specialite: string;
  photo_profil: string;
  bio:string;
}
export interface MedecinProfilesec {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  numero_licence: number|null;
  telephone_personnel:  number|null;
  telephone_cabinet:  number|null;
  adresse_cabinet: string;
  nom_specialite: string;
  photo_profil: string;
  bio:string;
  cin_secretaire: number
}