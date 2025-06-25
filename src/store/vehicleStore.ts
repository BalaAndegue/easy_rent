// src/store/vehicleStore.ts

import { create } from 'zustand';
import { FilterOptions, Vehicle } from '../types';

interface VehicleState {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  filters: FilterOptions;
  activeTab: 'Général' | 'Statistics';
  setFilters: (filters: FilterOptions) => void;
  setActiveTab: (tab: 'Général' | 'Statistics') => void;
  applyFilters: () => void;
}

// Données de démonstration
const initialVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'BMW',
    model: 'X5',
    year: 2022,
    imageKey: 'bmw-x5',
    transmission: 'Automatic',
    seats: 2,
    fuel: 'SUV',
    available: true,
    pricePerDay: 249,
    rating: 5,
    locations:10,
    likes:200,
    comments:[],
    shares:108,
  },

  {
    id: 2,
    make: 'JETOUR',
    model: 'X5',
    year: 2024,
    imageKey: 'jetour',
    transmission: 'Automatic',
    seats: 2,
    fuel: 'SUV',
    available: true,
    pricePerDay: 249,
    rating: 5,
    locations:10,
    likes:200,
    comments:[],
    shares:108,
  },
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
    locations:10,
    likes:200,
    comments:[],
    shares:108,
  },
  // Ajoutez d'autres véhicules si nécessaire
];

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: initialVehicles,
  filteredVehicles: initialVehicles,
  filters: {},
  activeTab: 'Général',
  
  setFilters: (filters) => set({ filters }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  applyFilters: () => {
    const { vehicles, filters } = get();
    
    const filtered = vehicles.filter((vehicle) => {
      // Filtre par type de véhicule
      if (filters.vehicleType && vehicle.fuel !== filters.vehicleType) {
        return false;
      }
      
      // Filtre par nombre de passagers
      if (filters.passengers && vehicle.seats < filters.passengers) {
        return false;
      }
      
      // Filtre par fourchette de prix
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (vehicle.pricePerDay < min || vehicle.pricePerDay > max) {
          return false;
        }
      }
      
      return true;
    });
    
    set({ filteredVehicles: filtered });
  },
}));