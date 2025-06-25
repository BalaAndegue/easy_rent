import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  VehicleDetails: { vehicleId: number };
  DriverDetails:{driverId: number}
  Booking: { vehicleId: number }; // Ajoutez cette ligne
  Drivers:undefined;
  Login: {
    prefillEmail?: string;
    prefillPassword?: string;
  };
  Register:undefined;
  // Ajoutez ici d'autres routes au besoin
};

// Ceci étend les types de React Navigation pour une meilleure autocomplétion
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

// Type utilitaire pour les props de navigation
export type VehicleDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VehicleDetails'
>;


export type DriverDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DriverDetails'
>;