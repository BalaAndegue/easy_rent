
export const vehicleImages = {
  'bmw-x5': require('./cars/bmw-x5.jpg'),
  'jetour': require('./cars/jetour.jpg'),
  'lexus': require('./cars/lexus.jpg'),
  // Ajoutez toutes vos images ici
};

export type VehicleImageKey = keyof typeof vehicleImages;