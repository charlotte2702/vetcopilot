export type AnimalAvatar = "dog" | "cat" | "bird" | "rabbit" | "hamster" | "horse";
export type Role = "vet" | "asv" | "admin";
export type AptStatus = "ok" | "wait" | "urg" | "done";
export type VaccinationStatus = "ok" | "soon" | "late";
export type HistoryType = "consultation" | "surgery" | "emergency" | "vaccination";
export type Urgency = "critique" | "moderee" | "faible";

export interface User {
  id: string;
  name: string;
  role: Role;
  initials: string;
  email: string;
}

export interface Vaccination {
  name: string;
  date: string;
  status: VaccinationStatus;
}

export interface WeightPoint {
  month: string;
  value: number;
}

export interface HistoryItem {
  title: string;
  date: string;
  type: HistoryType;
}

export interface Treatment {
  name: string;
  dosage: string;
  frequency: string;
  startedAt: string;
  endsAt?: string;
}

export interface Animal {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  sex: "M" | "F";
  weight: string;
  owner: string;
  phone: string;
  email: string;
  avatar: AnimalAvatar;
  chip?: string;
  allergies: string[];
  vaccinations: Vaccination[];
  weights: WeightPoint[];
  history: HistoryItem[];
  treatments: Treatment[];
}

export interface Appointment {
  id: number;
  time: string;
  animalName: string;
  ownerName: string;
  reason: string;
  avatar: AnimalAvatar;
  status: AptStatus;
  vet: string;
  durationMin: number;
}

export interface Notification {
  id: number;
  type: "urg" | "apt" | "cr" | "vacc" | "pay";
  title: string;
  text: string;
  time: string;
  unread: boolean;
}

export interface DiagnosticHypothesis {
  name: string;
  probability: number;
  level: "hi" | "md" | "lo";
  description: string;
  exams: string[];
}

export interface DiagnosticResult {
  urgency: Urgency;
  urgencyLabel: string;
  hypotheses: DiagnosticHypothesis[];
}

export interface SoapReport {
  id: number;
  animalName: string;
  ownerName: string;
  date: string;
  vet: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  ownerSummary: string;
}
