import { DashboardData } from '../types/index';

export const mockData: DashboardData = {
  agencies: [ 
     {
    id: "1",
    name: "Express Rentals",
    location: "Paris, France",
    performance: 88,
    revenue: 500000,
    employees: 45,
    currency: "EUR",
  },
  {
    id: "2",
    name: "FastTrack Logistics",
    location: "Berlin, Germany",
    performance: 92,
    revenue: 750000,
    employees: 60,
    currency: "EUR",
  },
  {
    id: "3",
    name: "Skyline Transport",
    location: "New York, USA",
    performance: 85,
    revenue: 620000,
    employees: 50,
    currency: "USD",
  },
  {
    id: "4",
    name: "Urban Mobility",
    location: "Tokyo, Japan",
    performance: 90,
    revenue: 820000,
    employees: 75,
    currency: "JPY",
  },
  {
    id: "5",
    name: "Green Transit",
    location: "Sydney, Australia",
    performance: 87,
    revenue: 550000,
    employees: 40,
    currency: "AUD",
  },
  ],
  services: [ 
    {
    id: "1",
    title: "Location de voiture",
    description: "Service de location de véhicules haut de gamme pour particuliers et entreprises.",
    price: 80,
    popularity: 95,
    revenue: 120000,
    currency: "EUR",
    type: "location",
  },
  {
    id: "2",
    title: "Transport de colis",
    description: "Livraison rapide et sécurisée de colis à domicile ou en point relais.",
    price: 15,
    popularity: 85,
    revenue: 90000,
    currency: "USD",
    type: "transport",
  },
  {
    id: "3",
    title: "Organisation d'événements",
    description: "Planification et gestion d'événements professionnels et privés.",
    price: 5000,
    popularity: 80,
    revenue: 200000,
    currency: "GBP",
    type: "events",
  },
  {
    id: "4",
    title: "Service de chauffeur privé",
    description: "Mise à disposition de chauffeurs privés pour des déplacements sur mesure.",
    price: 120,
    popularity: 88,
    revenue: 95000,
    currency: "USD",
    type: "transport",
  },
  {
    id: "5",
    title: "Location d’espace de coworking",
    description: "Espaces de travail partagés équipés pour les professionnels et startups.",
    price: 250,
    popularity: 90,
    revenue: 150000,
    currency: "EUR",
    type: "location",
  },
  ],
  vehicles: {
    total: 342,
    changeFromLastMonth: 12,
    vehicles: [
      {
        id: 3,
        make: 'LEXUS',
        model: 'X5',
        year: 2024,
        imageKey: 'lexus',
        transmission: 'Automatic',
        seats: 2,
        fuel: 'SUV',
        available: true,
        pricePerDay: 249,
        rating: 5,
        locations: 342,
        likes:1000,
        comments:[],
        shares:1000,
      }
    ]
  },
  drivers: {
    total: 50, // Ajout de valeurs fictives
    changeFromLastMonth: 5
  },
  totalRevenue: {
    amount: 25000000,
    currency: 'XAF',
    changeFromLastMonth: 300000
  },
  occupationRate: {
    percentage: 85,
    changeFromLastMonth: 3
  },
  revenueChart: [], // À remplir avec des données réelles si nécessaire
  systemAlerts: [] // À remplir avec des alertes système réelles si nécessaire
};
