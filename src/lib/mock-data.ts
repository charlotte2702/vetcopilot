import type {
  Animal,
  Appointment,
  DiagnosticResult,
  ImageAnalysisResult,
  ImageCategory,
  Notification,
  SoapReport,
  User,
} from "./types";

export const EMOJI: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🐦",
  rabbit: "🐰",
  hamster: "🐹",
  horse: "🐴",
};

export const DEMO_PROFILES: User[] = [
  {
    id: "u-vet",
    name: "Dr. Sophie Martin",
    role: "vet",
    initials: "SM",
    email: "s.martin@clinique-vetcopilot.fr",
  },
  {
    id: "u-asv",
    name: "Julie Lambert",
    role: "asv",
    initials: "JL",
    email: "j.lambert@clinique-vetcopilot.fr",
  },
  {
    id: "u-admin",
    name: "Admin Clinique",
    role: "admin",
    initials: "AC",
    email: "admin@clinique-vetcopilot.fr",
  },
];

export const CURRENT_USER: User = DEMO_PROFILES[0];

export const ROLE_LABEL: Record<User["role"], string> = {
  vet: "Vétérinaire",
  asv: "Auxiliaire (ASV)",
  admin: "Admin clinique",
};

export const CLINIC_NAME = "Clinique Vétérinaire des Trois Chênes";

export const ANIMALS: Animal[] = [
  {
    id: 1,
    name: "Rex",
    species: "Chien",
    breed: "Labrador",
    age: "5 ans",
    sex: "M",
    weight: "32 kg",
    owner: "M. Dupont",
    phone: "06 12 34 56 78",
    email: "dupont@email.fr",
    avatar: "dog",
    chip: "250269810012345",
    allergies: ["Pénicilline"],
    vaccinations: [
      { name: "Rage", date: "12/03/2026", status: "ok" },
      { name: "CHPL", date: "15/01/2026", status: "ok" },
      { name: "Leptospirose", date: "20/06/2026", status: "soon" },
      { name: "Toux du chenil", date: "01/12/2025", status: "late" },
    ],
    weights: [
      { month: "Jan", value: 30 },
      { month: "Fév", value: 30.5 },
      { month: "Mar", value: 31 },
      { month: "Avr", value: 31.8 },
      { month: "Mai", value: 32 },
    ],
    history: [
      { title: "Gastro-entérite", date: "Mars 2025", type: "consultation" },
      { title: "Otite externe", date: "Sept 2024", type: "consultation" },
      { title: "Stérilisation", date: "Juin 2023", type: "surgery" },
    ],
    treatments: [
      {
        name: "Caninsulin",
        dosage: "0.5 UI/kg",
        frequency: "2x/jour",
        startedAt: "10/01/2026",
      },
    ],
  },
  {
    id: 2,
    name: "Luna",
    species: "Chat",
    breed: "Persan",
    age: "3 ans",
    sex: "F",
    weight: "4.2 kg",
    owner: "Mme Bernard",
    phone: "06 98 76 54 32",
    email: "bernard@email.fr",
    avatar: "cat",
    allergies: [],
    vaccinations: [
      { name: "Typhus", date: "10/02/2026", status: "ok" },
      { name: "Coryza", date: "10/02/2026", status: "ok" },
      { name: "Leucose", date: "15/08/2026", status: "soon" },
    ],
    weights: [
      { month: "Jan", value: 4.0 },
      { month: "Fév", value: 4.0 },
      { month: "Mar", value: 4.1 },
      { month: "Avr", value: 4.1 },
      { month: "Mai", value: 4.2 },
    ],
    history: [
      { title: "Conjonctivite", date: "Janv 2026", type: "consultation" },
      { title: "Détartrage", date: "Nov 2025", type: "surgery" },
    ],
    treatments: [],
  },
  {
    id: 3,
    name: "Milo",
    species: "Chien",
    breed: "Border Collie",
    age: "2 ans",
    sex: "M",
    weight: "18 kg",
    owner: "Mme Garcia",
    phone: "06 45 78 12 34",
    email: "garcia@email.fr",
    avatar: "dog",
    chip: "250269810098765",
    allergies: [],
    vaccinations: [
      { name: "Rage", date: "05/05/2026", status: "ok" },
      { name: "CHPL", date: "05/05/2026", status: "ok" },
      { name: "Leptospirose", date: "05/05/2026", status: "ok" },
    ],
    weights: [
      { month: "Jan", value: 17.5 },
      { month: "Fév", value: 17.6 },
      { month: "Mar", value: 17.8 },
      { month: "Avr", value: 17.9 },
      { month: "Mai", value: 18 },
    ],
    history: [
      { title: "Vaccination annuelle", date: "Mai 2026", type: "vaccination" },
      { title: "Plaie patte avant", date: "Fév 2026", type: "emergency" },
    ],
    treatments: [],
  },
  {
    id: 4,
    name: "Noisette",
    species: "Lapin",
    breed: "Bélier nain",
    age: "2 ans",
    sex: "F",
    weight: "1.8 kg",
    owner: "Mme Moreau",
    phone: "06 23 45 67 89",
    email: "moreau@email.fr",
    avatar: "rabbit",
    allergies: [],
    vaccinations: [
      { name: "Myxomatose", date: "01/03/2026", status: "ok" },
      { name: "VHD", date: "01/03/2026", status: "ok" },
      { name: "VHD rappel", date: "01/09/2026", status: "soon" },
    ],
    weights: [
      { month: "Jan", value: 1.75 },
      { month: "Fév", value: 1.78 },
      { month: "Mar", value: 1.8 },
      { month: "Avr", value: 1.8 },
      { month: "Mai", value: 1.8 },
    ],
    history: [
      { title: "Vérification dentaire", date: "Mars 2026", type: "consultation" },
    ],
    treatments: [],
  },
];

export const APPOINTMENTS: Appointment[] = [
  { id: 1, time: "08:30", animalName: "Rex", ownerName: "M. Dupont", reason: "Contrôle diabète", avatar: "dog", status: "done", vet: "Dr. Martin", durationMin: 30 },
  { id: 2, time: "09:15", animalName: "Luna", ownerName: "Mme Bernard", reason: "Vaccination leucose", avatar: "cat", status: "done", vet: "Dr. Martin", durationMin: 20 },
  { id: 3, time: "10:00", animalName: "Milo", ownerName: "Mme Garcia", reason: "Contrôle vaccinal", avatar: "dog", status: "ok", vet: "Dr. Martin", durationMin: 30 },
  { id: 4, time: "10:45", animalName: "Noisette", ownerName: "Mme Moreau", reason: "Vérification dentaire", avatar: "rabbit", status: "ok", vet: "Dr. Martin", durationMin: 20 },
  { id: 5, time: "11:30", animalName: "Luna", ownerName: "Mme Bernard", reason: "Bilan thyroïdien", avatar: "cat", status: "urg", vet: "Dr. Martin", durationMin: 45 },
  { id: 6, time: "14:00", animalName: "Rocky", ownerName: "Mme Laurent", reason: "Suivi post-op tumeur", avatar: "dog", status: "ok", vet: "Dr. Durand", durationMin: 30 },
  { id: 7, time: "14:45", animalName: "Bella", ownerName: "M. Petit", reason: "Contrôle arthrose", avatar: "dog", status: "wait", vet: "Dr. Durand", durationMin: 30 },
  { id: 8, time: "15:30", animalName: "Simba", ownerName: "Mme Dubois", reason: "Suivi cystite", avatar: "cat", status: "ok", vet: "Dr. Martin", durationMin: 30 },
  { id: 9, time: "16:15", animalName: "Rex", ownerName: "M. Dupont", reason: "Échographie abdominale", avatar: "dog", status: "urg", vet: "Dr. Martin", durationMin: 60 },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 1, type: "urg", title: "Urgence — Luna", text: "Bilan thyroïdien anormal, consultation prioritaire", time: "Il y a 15 min", unread: true },
  { id: 2, type: "apt", title: "Prochain RDV dans 30 min", text: "Milo — Contrôle vaccinal à 10:00", time: "Il y a 25 min", unread: true },
  { id: 3, type: "cr", title: "CR à rédiger", text: "Compte rendu de Luna — Bilan thyroïdien en attente", time: "Il y a 1h", unread: true },
  { id: 4, type: "cr", title: "CR validé", text: "Compte rendu de Noisette validé par Dr. Durand", time: "Il y a 2h", unread: false },
  { id: 5, type: "vacc", title: "Rappel vaccination", text: "Leptospirose de Rex prévue le 20/06", time: "Hier", unread: false },
  { id: 6, type: "pay", title: "Paiement reçu", text: "Facture #2026-087 — Mme Bernard — 85,00 €", time: "Hier", unread: false },
];

export const DIAGNOSTIC_DEMO: DiagnosticResult = {
  urgency: "moderee",
  urgencyLabel: "MODÉRÉE",
  hypotheses: [
    {
      name: "Gastrite aiguë / corps étranger digestif",
      probability: 62,
      level: "hi",
      description:
        "Les vomissements répétés associés à une anorexie de 48h et une douleur abdominale localisée orientent fortement vers une atteinte gastro-intestinale aiguë, potentiellement liée à l'ingestion d'un corps étranger ou à une gastrite alimentaire.",
      exams: [
        "Examen clinique complet avec palpation abdominale approfondie",
        "Bilan sanguin : NFS, biochimie (ALAT, PAL, lipase, créatinine)",
        "Radiographies abdominales face et profil",
        "Échographie abdominale ciblée",
        "Test SNAP cPL si suspicion de pancréatite associée",
      ],
    },
    {
      name: "Pancréatite aiguë",
      probability: 38,
      level: "md",
      description:
        "Race prédisposée et tableau clinique compatible. La douleur abdominale localisée crânialement et la déshydratation modérée renforcent cette suspicion.",
      exams: [
        "Spec cPL (lipase pancréatique spécifique canine)",
        "Échographie abdominale focalisée sur le pancréas",
        "Bilan hépatique complet",
      ],
    },
    {
      name: "Affection rénale aiguë",
      probability: 18,
      level: "lo",
      description:
        "Moins probable mais à exclure devant le tableau de déshydratation et l'anorexie. Bilan rénal nécessaire.",
      exams: [
        "Urée, créatinine, SDMA",
        "Analyse d'urine avec densité",
        "Échographie rénale",
      ],
    },
  ],
};

export const SOAP_DEMO: SoapReport = {
  id: 1,
  animalName: "Rex",
  ownerName: "M. Dupont",
  date: "19/05/2026",
  vet: "Dr. Sophie Martin",
  subjective:
    "Présenté pour vomissements répétés depuis 48h et anorexie totale. Le propriétaire rapporte une légère léthargie et une diminution de la prise de boisson. Pas d'ingestion connue de corps étranger, mais accès au jardin sans surveillance.",
  objective:
    "Animal vif mais abattu. T° = 39.4°C. FC = 110 bpm, FR = 28 mpm. Muqueuses légèrement pâles, TRC = 2.5s. Déshydratation estimée à 6%. Palpation abdominale : douleur localisée en région crâniale, pas de masse perceptible. Auscultation cardio-pulmonaire normale.",
  assessment:
    "Tableau évoquant en priorité une gastrite aiguë sur ingestion non identifiée, à différencier d'une pancréatite débutante. Pas d'éléments en faveur d'une atteinte rénale aiguë ou d'un syndrome occlusif.",
  plan: "1. Bilan sanguin complet + Spec cPL réalisé (résultats en attente)\n2. Échographie abdominale prévue à 14h\n3. Mise en place perfusion Ringer Lactate 4mL/kg/h\n4. Maropitant 1 mg/kg SC\n5. Mise à jeun strict 24h, réévaluation demain matin\n6. Recontrôle clinique à 18h ce jour",
  ownerSummary:
    "Bonjour M. Dupont,\n\nRex a été examiné aujourd'hui pour ses vomissements et sa perte d'appétit. Il est légèrement déshydraté mais reste stable. Nous avons réalisé une prise de sang et prévoyons une échographie cet après-midi pour identifier précisément la cause.\n\nIl reste hospitalisé sous perfusion et nous évitons toute alimentation pendant 24h. Nous vous tenons informé dès que nous avons les premiers résultats.\n\nCordialement,\nDr. Sophie Martin",
};

export const IMAGE_CATEGORIES: { value: ImageCategory; label: string; icon: string }[] = [
  { value: "radio-thorax", label: "Radio thoracique", icon: "🫁" },
  { value: "radio-abdo", label: "Radio abdominale", icon: "🩻" },
  { value: "dermato", label: "Dermatologie", icon: "🔬" },
  { value: "echo", label: "Échographie", icon: "📡" },
  { value: "other", label: "Autre", icon: "📷" },
];

export const IMAGE_ANALYSIS_DEMOS: Record<ImageCategory, ImageAnalysisResult> = {
  "radio-thorax": {
    examType: "Radio thoracique — incidence latérale droite",
    examIcon: "🫁",
    confidence: 94,
    findings: [
      "Opacité focale arrondie d'environ 3 cm dans le lobe pulmonaire moyen droit",
      "Silhouette cardiaque dans les limites de la normale (VHS ≈ 9.8)",
      "Pas d'épanchement pleural visible",
      "Bonne aération des autres champs pulmonaires",
      "Trame bronchovasculaire normale pour l'âge",
    ],
    hypotheses: [
      { name: "Pneumonie bactérienne focale (foyer infectieux)", probability: 58, level: "hi" },
      { name: "Néoplasie pulmonaire primaire", probability: 27, level: "md" },
      { name: "Granulome inflammatoire / fongique", probability: 15, level: "lo" },
    ],
    recommendations: [
      "Bilan sanguin : NFS, biochimie, CRP",
      "Ponction écho-guidée de la lésion si accessible (cytologie)",
      "Antibiothérapie empirique en attente (Amoxicilline-Clavulanate)",
      "Recontrôle radiographique à 10-14 jours pour suivi évolution",
      "Référer à un radiologue vétérinaire pour second avis si doute persistant",
    ],
  },
  "radio-abdo": {
    examType: "Radio abdominale — incidence latérale",
    examIcon: "🩻",
    confidence: 89,
    findings: [
      "Présence d'un corps étranger radio-opaque en région gastrique distale",
      "Distension gazeuse modérée des anses intestinales en amont",
      "Silhouette hépatique normale",
      "Pas de pneumopéritoine visible (pas de perforation décelable)",
    ],
    hypotheses: [
      { name: "Corps étranger gastrique (objet ingéré)", probability: 82, level: "hi" },
      { name: "Iléus mécanique débutant", probability: 14, level: "md" },
      { name: "Pneumatose gastrique", probability: 4, level: "lo" },
    ],
    recommendations: [
      "Endoscopie en urgence pour extraction si accessible",
      "Bilan préopératoire complet (NFS, biochimie, hémostase)",
      "Mise à jeun stricte, perfusion Ringer Lactate",
      "Anti-émétique (Maropitant) en attente",
      "Chirurgie envisagée si endoscopie non réalisable sous 12h",
    ],
  },
  dermato: {
    examType: "Dermatologie — lésion alopécique",
    examIcon: "🔬",
    confidence: 91,
    findings: [
      "Lésion alopécique circulaire d'environ 2 cm, bordure érythémateuse",
      "Présence de croûtes fines au centre, peau légèrement squameuse",
      "Pas de signe de surinfection bactérienne franche",
      "Lésion unique, localisation périoculaire droite",
    ],
    hypotheses: [
      { name: "Dermatophytose (teigne — Microsporum canis)", probability: 64, level: "hi" },
      { name: "Démodécie localisée", probability: 22, level: "md" },
      { name: "Dermatite allergique focale", probability: 14, level: "lo" },
    ],
    recommendations: [
      "Lampe de Wood pour recherche de fluorescence",
      "Raclage cutané pour examen parasitaire direct",
      "Culture fongique (DTM) sur 14 jours",
      "Isoler l'animal si contact avec enfants ou immunodéprimés",
      "Traitement antifongique topique (Énilconazole) en attente des résultats",
    ],
  },
  echo: {
    examType: "Échographie abdominale — coupe sagittale",
    examIcon: "📡",
    confidence: 87,
    findings: [
      "Épaississement de la paroi gastrique (>6 mm), perte de stratification focale",
      "Contenu hétérogène avec zones hypoéchogènes",
      "Ganglion mésentérique légèrement augmenté (12 mm)",
      "Pancréas et foie d'échogénicité normale",
      "Pas d'épanchement abdominal",
    ],
    hypotheses: [
      { name: "Gastrite chronique sévère", probability: 48, level: "hi" },
      { name: "Néoplasie gastrique (lymphome / adénocarcinome)", probability: 38, level: "md" },
      { name: "Inflammation granulomateuse", probability: 14, level: "lo" },
    ],
    recommendations: [
      "Endoscopie haute avec biopsies multiples (gastrique + duodénales)",
      "Cytoponction du ganglion mésentérique si accessible",
      "Bilan sanguin complet + ionogramme + cobalamine/folates",
      "Mise en place d'un traitement gastroprotecteur (Oméprazole)",
      "Reprogrammer une écho de contrôle dans 4 semaines",
    ],
  },
  other: {
    examType: "Image clinique générique",
    examIcon: "📷",
    confidence: 72,
    findings: [
      "Image cliniquement exploitable",
      "Cadrage et exposition corrects pour l'analyse",
      "Aucune anomalie évidente détectée automatiquement",
    ],
    hypotheses: [
      { name: "Aspect compatible avec la normale", probability: 60, level: "md" },
      { name: "Anomalie à confirmer cliniquement", probability: 40, level: "lo" },
    ],
    recommendations: [
      "Examen clinique complet en complément",
      "Préciser le contexte clinique pour affiner l'analyse",
      "Catégoriser l'image (radio, dermato, écho…) pour une analyse spécialisée",
    ],
  },
};

export function findAnimalById(id: number): Animal | undefined {
  return ANIMALS.find((a) => a.id === id);
}
