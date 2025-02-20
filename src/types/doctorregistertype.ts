// types/types.ts
export interface DoctorFormData {
    cin_medecin: string; // Numéro CIN (chaîne de caractères)
    nom: string; // Nom du médecin
    prenom: string; // Prénom du médecin
    numero_licence: string; // Numéro de licence (chaîne de caractères)
    nom_specialite: string; // Spécialité du médecin
    email: string; // Email
    telephone_personnel: string; // Téléphone personnel (chaîne de caractères)
    adresse_cabinet: string; // Adresse du cabinet
    telephone_cabinet: string; // Téléphone du cabinet (chaîne de caractères)
    password: string; // Mot de passe
    photo_profil: File | null; // Photo de profil (fichier)
  }