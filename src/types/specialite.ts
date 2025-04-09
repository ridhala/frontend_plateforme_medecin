export interface Specialty {
    id: string;
    name: string;
    description: string;
    icon: string; // You can use icon classes (e.g., Font Awesome, Heroicons)
  }
  
  export const medicalSpecialties: Specialty[] = [
    {
      id: "cardio",
      name: "Cardiology",
      description: "Specializes in heart and cardiovascular system disorders",
      icon: "fa-heart-pulse", // Font Awesome icon
    },
    {
      id: "dermato",
      name: "Dermatology",
      description: "Specializes in skin, hair, and nail conditions",
      icon: "fa-allergies", // Font Awesome icon
    },
    {
      id: "neuro",
      name: "Neurology",
      description: "Specializes in disorders of the nervous system",
      icon: "fa-brain", // Font Awesome icon
    },
    {
      id: "pediatrie",
      name: "Pediatrics",
      description: "Specializes in the health of infants, children, and adolescents",
      icon: "fa-baby", // Font Awesome icon
    },
    {
      id: "ortho",
      name: "Orthopedics",
      description: "Specializes in musculoskeletal system (bones, joints, ligaments)",
      icon: "fa-bone", // Font Awesome icon
    },
    {
      id: "ophtalmo",
      name: "Ophthalmology",
      description: "Specializes in eye and vision care",
      icon: "fa-eye", // Font Awesome icon
    },
    {
      id: "radio",
      name: "Radiology",
      description: "Specializes in medical imaging (X-rays, MRI, CT scans)",
      icon: "fa-x-ray", // Font Awesome icon
    },
    {
      id: "chirurgie",
      name: "General Surgery",
      description: "Specializes in surgical procedures",
      icon: "fa-scalpel", // Font Awesome icon
    },
    {
      id: "psychiatrie",
      name: "Psychiatry",
      description: "Specializes in mental health and disorders",
      icon: "fa-head-side-virus", // Font Awesome icon
    },
    {
      id: "endo",
      name: "Endocrinology",
      description: "Specializes in hormonal and metabolic disorders",
      icon: "fa-gland", // Font Awesome icon
    },
    {
      id: "uro",
      name: "Urology",
      description: "Specializes in urinary tract and male reproductive system",
      icon: "fa-kidneys", // Font Awesome icon
    },
    {
      id: "pneumo",
      name: "Pulmonology",
      description: "Specializes in respiratory system disorders",
      icon: "fa-lungs", // Font Awesome icon
    },
    {
      id: "gastro",
      name: "Gastroenterology",
      description: "Specializes in digestive system disorders",
      icon: "fa-stomach", // Font Awesome icon
    },
    {
      id: "gyneco",
      name: "Gynecology",
      description: "Specializes in female reproductive health",
      icon: "fa-venus", // Font Awesome icon
    },
    {
      id: "orl",
      name: "ENT (Otolaryngology)",
      description: "Specializes in ear, nose, and throat disorders",
      icon: "fa-ear-listen", // Font Awesome icon
    },
  ];