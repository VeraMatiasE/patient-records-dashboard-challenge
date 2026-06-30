export type Patient = {
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  id: string;
};

export type NewPatient = Omit<Patient, "id" | "createdAt">;
