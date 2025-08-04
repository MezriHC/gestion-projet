// Base : 35h/semaine pour chaque personne (Mezri et Maeva)
export const WEEKLY_HOURS = 35;
export const HOURS_PER_DAY = 7; // 1 jour = 7h

// Fonction pour nettoyer les nombres flottants
const cleanNumber = (num: number, decimals: number = 1) => {
  return parseFloat(num.toFixed(decimals));
};

export interface ProjectActivity {
  name: string;
  days: number;
  hours?: number; // Optionnel, pour les activités en heures
  type: 'ADS_MANAGEMENT' | 'ADS_STRATEGY' | 'ADS_MAILING' | 'ADS_REPORTING' | 'CREATIVE_DESIGN' | 'CREATIVE_MAILING' | 'INTEGRATION' | 'SOCIAL';
  pole: 'ADS' | 'CREATIVE' | 'INTEGRATION' | 'SOCIAL';
}

export interface SimpleProject {
  client: string;
  totalDaysSold: number;
  totalAdsCount: number; // Nombre d'ADS
  activities: ProjectActivity[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  pole: 'ACQUISITION';
  clientType: 'ecommerce' | 'non-ecommerce';
}

// Données du pôle Acquisition - Organisation par pôles
export const projects: SimpleProject[] = [
  {
    client: "ELEC DIRECT",
    totalDaysSold: 14,
    totalAdsCount: 10,
    priority: 'HIGH',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 6, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Stratégie créative et brief", days: 1, type: 'ADS_STRATEGY', pole: 'ADS' },
      { name: "Stratégie mailing auto", days: 1, type: 'ADS_MAILING', pole: 'ADS' },
      { name: "Reporting", days: 2, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 1, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' },
      { name: "Design mailing auto", days: 1, type: 'CREATIVE_MAILING', pole: 'CREATIVE' },
      { name: "Intégration emailing auto", days: 1, type: 'INTEGRATION', pole: 'INTEGRATION' },
      { name: "Réseaux sociaux", days: 1, type: 'SOCIAL', pole: 'SOCIAL' }
    ]
  },
  {
    client: "LE PETIT GRASSOIS",
    totalDaysSold: 11.5,
    totalAdsCount: 9.5,
    priority: 'HIGH',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 6, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Stratégie créative et brief", days: 1, type: 'ADS_STRATEGY', pole: 'ADS' },
      { name: "Stratégie mailing auto", days: 1, type: 'ADS_MAILING', pole: 'ADS' },
      { name: "Reporting", days: 1.5, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 0.5, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' },
      { name: "Design mailing auto", days: 1, type: 'CREATIVE_MAILING', pole: 'CREATIVE' },
      { name: "Intégration emailing auto", days: 0.5, type: 'INTEGRATION', pole: 'INTEGRATION' }
    ]
  },
  {
    client: "SMELLINGOOD (interne)",
    totalDaysSold: 6,
    totalAdsCount: 4,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 2.5, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Stratégie créative et brief", days: 0.5, type: 'ADS_STRATEGY', pole: 'ADS' },
      { name: "Stratégie mailing auto", days: 0.5, type: 'ADS_MAILING', pole: 'ADS' },
      { name: "Reporting", days: 0.5, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 0.5, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' },
      { name: "Design mailing auto + Anim co", days: 1, type: 'CREATIVE_MAILING', pole: 'CREATIVE' },
      { name: "Intégration emailing auto + Anim co", days: 0.5, type: 'INTEGRATION', pole: 'INTEGRATION' }
    ]
  },
  {
    client: "SCENT AND MORE",
    totalDaysSold: 5,
    totalAdsCount: 3.5,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 2, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Stratégie créative et brief", days: 0.5, type: 'ADS_STRATEGY', pole: 'ADS' },
      { name: "Stratégie mailing auto", days: 0.5, type: 'ADS_MAILING', pole: 'ADS' },
      { name: "Reporting", days: 0.5, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 0.5, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' },
      { name: "Design mailing auto + Anim co", days: 0.5, type: 'CREATIVE_MAILING', pole: 'CREATIVE' },
      { name: "Intégration emailing auto + Anim co", days: 0.3, hours: 2, type: 'INTEGRATION', pole: 'INTEGRATION' },
      { name: "Post réseaux sociaux du mois", days: 0.2, hours: 2, type: 'SOCIAL', pole: 'SOCIAL' }
    ]
  },
  {
    client: "MY FRENCH PERFUME",
    totalDaysSold: 5,
    totalAdsCount: 3.5,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 2, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Stratégie créative et brief", days: 0.5, type: 'ADS_STRATEGY', pole: 'ADS' },
      { name: "Stratégie mailing auto", days: 0.5, type: 'ADS_MAILING', pole: 'ADS' },
      { name: "Reporting", days: 0.5, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 0.5, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' },
      { name: "Design mailing auto + Anim co", days: 0.5, type: 'CREATIVE_MAILING', pole: 'CREATIVE' },
      { name: "Intégration emailing auto + Anim co", days: 0.3, hours: 2, type: 'INTEGRATION', pole: 'INTEGRATION' },
      { name: "Post réseaux sociaux du mois", days: 0.2, hours: 2, type: 'SOCIAL', pole: 'SOCIAL' }
    ]
  },
  {
    client: "JEAN MARC JOUBERT SHOPPING",
    totalDaysSold: 4.5,
    totalAdsCount: 3,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 1.5, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Stratégie créative et brief", days: 0.5, type: 'ADS_STRATEGY', pole: 'ADS' },
      { name: "Stratégie mailing auto", days: 0.5, type: 'ADS_MAILING', pole: 'ADS' },
      { name: "Reporting", days: 0.5, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 0.5, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' },
      { name: "Design mailing auto + Anim co", days: 0.5, type: 'CREATIVE_MAILING', pole: 'CREATIVE' },
      { name: "Intégration emailing auto + Anim co", days: 0.3, hours: 2, type: 'INTEGRATION', pole: 'INTEGRATION' },
      { name: "Post réseaux sociaux du mois", days: 0.2, hours: 2, type: 'SOCIAL', pole: 'SOCIAL' }
    ]
  },
  {
    client: "RESONANCE",
    totalDaysSold: 2,
    totalAdsCount: 1.5,
    priority: 'LOW',
    pole: 'ACQUISITION',
    clientType: 'ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 1, type: 'ADS_MANAGEMENT', pole: 'ADS' },
      { name: "Reporting", days: 0.5, type: 'ADS_REPORTING', pole: 'ADS' },
      { name: "Design créative (vidéo/statique)", days: 0.5, type: 'CREATIVE_DESIGN', pole: 'CREATIVE' }
    ]
  },
  // Clients non-ecommerce
  {
    client: "LE PASHA",
    totalDaysSold: 0.286, // 2h
    totalAdsCount: 0.286,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.286, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "OPTICODIO",
    totalDaysSold: 0.286, // 2h (assumé comme les autres)
    totalAdsCount: 0.286,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.286, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "LE LOMA",
    totalDaysSold: 0.286, // 2h
    totalAdsCount: 0.286,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.286, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "LE DAYA HÔTEL & SPA",
    totalDaysSold: 0.286, // 2h
    totalAdsCount: 0.286,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.286, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "SECRETS DE FAMILLE",
    totalDaysSold: 0.714, // 5h
    totalAdsCount: 0.714,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.714, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "PROMOFAR",
    totalDaysSold: 1, // 7h
    totalAdsCount: 1,
    priority: 'HIGH',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 1, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "LA P'TITE FRANÇAISE",
    totalDaysSold: 0.071, // 30min
    totalAdsCount: 0.071,
    priority: 'LOW',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.071, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "COLLECTIF FITNESS",
    totalDaysSold: 0.071, // 30min
    totalAdsCount: 0.071,
    priority: 'LOW',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.071, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "ROMEO OPTICIENS",
    totalDaysSold: 0.071, // 30min
    totalAdsCount: 0.071,
    priority: 'LOW',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.071, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "JEAN MARC JOUBERT OFFICIEL",
    totalDaysSold: 0.286, // 2h
    totalAdsCount: 0.286,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.286, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "AQUA ENERGY",
    totalDaysSold: 0.143, // 1h
    totalAdsCount: 0.143,
    priority: 'LOW',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.143, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "RC CONTRACTOR",
    totalDaysSold: 0.143, // 1h
    totalAdsCount: 0.143,
    priority: 'LOW',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.143, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  },
  {
    client: "NEYRAT IMMOBILIER",
    totalDaysSold: 0.286, // 2h
    totalAdsCount: 0.286,
    priority: 'MEDIUM',
    pole: 'ACQUISITION',
    clientType: 'non-ecommerce',
    activities: [
      { name: "Gestion des comptes ads & stratégie", days: 0.286, type: 'ADS_MANAGEMENT', pole: 'ADS' }
    ]
  }
];

// Calculs automatiques par pôle et activités
export const totalDaysAcquisition = cleanNumber(projects.reduce((sum, p) => sum + p.totalDaysSold, 0), 1);
export const totalHoursAcquisition = cleanNumber(totalDaysAcquisition * HOURS_PER_DAY, 1);
export const totalAdsCount = cleanNumber(projects.reduce((sum, p) => sum + p.totalAdsCount, 0), 1);





// Couleurs par client
export const clientColors = [
  '#3B82F6', // Bleu
  '#EF4444', // Rouge  
  '#10B981', // Vert
  '#F59E0B', // Orange
  '#8B5CF6', // Violet
  '#EC4899', // Rose
  '#6B7280'  // Gris
];

// Fonction pour obtenir la couleur d'un client
export const getClientColor = (clientIndex: number) => {
  return clientColors[clientIndex % clientColors.length];
};

// Couleurs par pôle
export const poleColors = {
  ADS: '#3B82F6',        // Bleu
  CREATIVE: '#EF4444',   // Rouge  
  INTEGRATION: '#10B981', // Vert
  SOCIAL: '#8B5CF6'      // Violet
};

// Icônes par pôle
export const poleIcons = {
  ADS: '🎯',
  CREATIVE: '🎨', 
  INTEGRATION: '⚙️',
  SOCIAL: '📱'
};

// Fonction pour calculer les stats par pôle
export const getPoleStats = () => {
  const stats = {
    ADS: { days: 0, activities: [] as string[] },
    CREATIVE: { days: 0, activities: [] as string[] },
    INTEGRATION: { days: 0, activities: [] as string[] },
    SOCIAL: { days: 0, activities: [] as string[] }
  };

  projects.forEach(project => {
    project.activities.forEach(activity => {
      if (stats[activity.pole]) {
        stats[activity.pole].days += activity.days;
        if (!stats[activity.pole].activities.includes(activity.name)) {
          stats[activity.pole].activities.push(activity.name);
        }
      }
    });
  });

  // Nettoyer les résultats pour éviter les erreurs de précision
  Object.keys(stats).forEach(pole => {
    stats[pole as keyof typeof stats].days = cleanNumber(stats[pole as keyof typeof stats].days, 1);
  });

  return stats;
};

// Fonction pour obtenir le résumé par client et pôle
export const getClientPoleBreakdown = () => {
  const breakdown = projects.map(project => {
    const poles = {
      ADS: 0,
      CREATIVE: 0,
      INTEGRATION: 0,
      SOCIAL: 0
    };

    project.activities.forEach(activity => {
      poles[activity.pole] += activity.days;
    });

    // Nettoyer les résultats
    Object.keys(poles).forEach(pole => {
      poles[pole as keyof typeof poles] = cleanNumber(poles[pole as keyof typeof poles], 1);
    });

    return {
      client: project.client,
      totalDays: project.totalDaysSold,
      poles
    };
  });

  return breakdown.sort((a, b) => b.totalDays - a.totalDays);
};

// Fonction pour filtrer les projets par type de client
export const getFilteredProjects = (filter: 'all' | 'ecommerce' | 'non-ecommerce') => {
  if (filter === 'all') return projects;
  return projects.filter(project => project.clientType === filter);
};

// Types de filtres disponibles
export const clientTypeFilters = [
  { value: 'all', label: 'Tous les clients', icon: '📊' },
  { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { value: 'non-ecommerce', label: 'Non E-commerce', icon: '🏢' }
] as const; 