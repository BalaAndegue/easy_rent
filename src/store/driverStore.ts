// src/store/vehicleStore.ts

import { create } from 'zustand';
import { FilterOptions, Driver } from '../types';

interface driverState {
  drivers: Driver[];
  filteredDrivers: Driver[];
  filters: FilterOptions;
  activeTab: 'Général' | 'Statistics';
  setFilters: (filters: FilterOptions) => void;
  setActiveTab: (tab: 'Général' | 'Statistics') => void;
  applyFilters: () => void;
}

// Données de démonstration
const initialDrivers: Driver[] = [
  {
    id: 1,
    name: 'EMMANUEL',
    firstname: 'KANTE',
    age: 32,
    imageKey: 'chauffeur',
    gender: 'Man',
    seats: 2,
    fuel: 'Camerounian',
    available: true,
    pricePerDay: 249,
    rating: 5,
  },
  {
    id: 2,
    name: 'JORDAN',
    firstname: 'DOE',
    age: 33,
    imageKey: 'chauffeur1',
    gender: 'Man',
    seats: 2,
    fuel: 'Camerounian',
    available: true,
    pricePerDay: 249,
    rating: 5,
  },
  {
    id: 3,
    name: 'YVES',
    firstname: 'JEAN',
    age: 25,
    imageKey: 'chauffeur2',
    gender: 'Man',
    seats: 2,
    fuel: 'Camerounian',
    available: true,
    pricePerDay: 249,
    rating: 5,
  },
  
  
];

export const useDriverStore = create<driverState>((set, get) => ({
  drivers: initialDrivers,
  filteredDrivers: initialDrivers,
  filters: {},
  activeTab: 'Général',
  
  setFilters: (filters) => set({ filters }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  applyFilters: () => {
    const { drivers, filters } = get();
    
    const filtered = drivers.filter((vehicle) => {
      // Filtre par type de conducteur
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
    
    set({ filteredDrivers: filtered });
  },
}));