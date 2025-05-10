export interface Secretaire {
  _id?: string;
  cin_secretaire: number| null;
   nom_secretaire: string;
  prenom_secretaire: string;
  email: string;
  telephone: string;
  password?:string
 
}
export interface Secretaires {

  cin_secretaire: number| null;
   nom_secretaire: string;
  prenom_secretaire: string;
  email: string;
  telephone: string;
  password:string
 
}