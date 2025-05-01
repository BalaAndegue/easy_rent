// src/types/index.ts

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    image: string;
    transmission: 'Automatic' | 'Manual';
    seats: number;
    fuel: string;
    available: boolean;
    pricePerDay: number;
    rating: number;
  }
  
  export interface FilterOptions {
    vehicleType?: string;
    passengers?: number;
    priceRange?: {
      min: number;
      max: number;
    };
  }