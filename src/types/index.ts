// src/types/index.ts
export type VehicleImageKey = 'bmw-x5' | 'jetour' | 'lexus';
export type DriverImageKey = 'chauffeur' | 'chauffeur1' | 'chauffeur2';

export interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    imageKey: VehicleImageKey;
    transmission: 'Automatic' | 'Manual';
    seats: number;
    fuel: string;
    available: boolean;
    pricePerDay: number;
    rating: number;
    locations:number;
    likes:number;
    comments?:Comment[];
    shares:number;
  }

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}
  export interface Driver {
    id: number;
    name: string;
    firstname: string;
    age: number;
    imageKey: DriverImageKey;
    gender: 'Man' | 'Woman';
    seats: number;
    fuel: string;
    available: boolean;
    pricePerDay: number;
    rating: number;
  }

export interface WorkingHours {
	start: string;
	end: string;
}

export interface ScheduledRide {
	date: string;
	time: string;
	destination: string;
}


export interface Scheduling {
	working_hours: WorkingHours;
	days_off: { start: string; end: string }[];
	scheduled_ranges: { start: string; end: string }[];
}

export interface DriverProps {
    photo: string;
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    license_number: string;
    license_type: string;
    address: string;
    phone: string;
    email: string;
    location?: string;
    documents?:{
        id_card:string;
        driver_licence:string;
    };
    vehicle_assigned?: {
        id: number;
        brand: string;
        model: string;
        year: number;
    }[];
    rating: number;
    insurance_provider?: string;
    insurance_policy?: string;
    profile_picture?: string; // Optional
    isSelected?: boolean | undefined;
    available: boolean;
    created_at: Date;
    status?: "Active" | "Available" | "Out_of_Service" | "Emergency";
    status_updated_at?: Date;
    status_updated_by?: string;
    scheduling?: Scheduling;
}

export interface FilterDriverProps {
    ratingRange: [number, number];
    ageRange: [number, number];
    location?: string; // Optional
}

export interface DriverListProps {
    drivers: DriverProps[];
    filters: FilterDriverProps;
}

export interface DriverCardProps extends DriverProps {
    onSelect: (driver: DriverProps | null) => void;
    isSelected: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}
  
  export interface FilterOptions {
    vehicleType?: string;
    passengers?: number;
    priceRange?: {
      min: number;
      max: number;
    };
  }




export interface Revenue {
  month: string;
  consultAmount: number;
  diverseAmount: number;
}

export interface SystemAlert {
  id: string;
  type: 'maintenance' | 'location' | 'payment' | 'driver' | 'client';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  count?: number;
}

export interface DashboardData {
  vehicles: {
    total: number;
    changeFromLastMonth: number;
    vehicles: Vehicle[];
  };
  drivers: {
    total: number;
    changeFromLastMonth: number;
  };
  totalRevenue: {
    amount: number;
    currency: string;
    changeFromLastMonth: number;
  };
  occupationRate: {
    percentage: number;
    changeFromLastMonth: number;
  };
  revenueChart: Revenue[];
  systemAlerts: SystemAlert[];
  agencies: Agency[];
  services: Service[];
}




export interface CarProps {
    id: number;
    type?: string;                // Optional
    brand?: string;               // Optional
    model?: string;               // Optional
    year?: number;                  // Optional
    rating?: number;              // Optional
    passenger?: number;           // Optional
    description: string;       // Optional
    pricePerDay: number;         // Optional
    vin?: string;        
    documents?:{
        registration_certificate: string;
        technical_inspection: string;
        insurance: string;
        tax_sticker: string[];
    };
    fonctionnalities: {          // Optional
        air_condition: boolean;
        usb_input: boolean;
        seat_belt: boolean;
        audio_input: boolean;
        child_seat: boolean;
        bluetooth: boolean;
        sleeping_bed: boolean;
        onboard_computer: boolean;
        gps: boolean;
        luggage: boolean;
        water: boolean;
        additional_covers: boolean;
    };

    engine: {                    // Optional
        type?: string;
        horsepower?: number;
        capacity?: number;
    };

    transmission?: string;        // Optional
    color?: string;               // Optional
    fuel_efficiency?: {           // Optional
        city?: string;
        highway?: string;
    };

    license_plate: string;       // Optional

    registration?: {              // Optional
        state?: string;
        expiry?: Date;
    };

    owner?: {                     // Optional
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
    };

    service_history: {           // Optional
        date?: Date;
        service_type?: string;
        mileage?: number;
        provider?: string;
    }[];

    insurance?: {                 // Optional
        provider?: string;
        policy_number?: string;
        expiry?: Date;
    };
    agency?:{
        id:number;
    }

    images: string[];            // Optional

    reviews: {                   // Optional
        id?: number;
        reviewer_name: string;
        reviewer_id?:number;
        comment: string;
        rating: number;
    }[];
    favorite? : boolean;
    available: boolean;
    onLike?: (id: number) => void;    // Optional
    onDislike?: (id: number) => void; // Optional
    onEdit?: (id: number) => void; // Optional
    onDelete?: (id: number) => void; // Optional
}

export interface FilterVehicleProps {
    type: string[];
    capacity: number | null;
    priceRange: [number, number];
}

export interface VehicleListProps {
    vehicles: CarProps[];
    setVehicles: (vehicles: CarProps[]) => void;
    filters: FilterVehicleProps;
}


export interface VehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (vehicleData: Partial<CarProps>) => void;
    initialData?: CarProps | null;
    title: string;
}




export interface Agency {
  id: string;
  name: string;
  location: string;
  performance: number;
  revenue: number;
  employees: number;
  currency: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  popularity: number;
  revenue: number;
  currency: string;
  type: 'location' | 'transport' | 'events';
}


export interface Agency {
  id: string;
  name: string;
  location: string;
  performance: number;
  revenue: number;
  employees: number;
  currency: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  popularity: number;
  revenue: number;
  currency: string;
  type: 'location' | 'transport' | 'events';
}