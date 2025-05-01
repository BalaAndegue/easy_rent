// src/components/CarCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { Vehicle } from '../types';

interface CarCardProps {
  vehicle: Vehicle;
  onPress: (vehicle: Vehicle) => void;
  onFavoritePress?: (vehicle: Vehicle) => void;
}

const CarCard: React.FC<CarCardProps> = ({ 
  vehicle, 
  onPress, 
  onFavoritePress 
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (onFavoritePress) {
      onFavoritePress(vehicle);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(vehicle)}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: vehicle.available ? COLORS.success : COLORS.error }]}>
          <Text style={styles.statusText}>
            {vehicle.available ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.typeLabel}>
            <Text style={styles.typeLabelText}>{vehicle.fuel}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isFavorite ? COLORS.error : COLORS.grey} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <Image source={{ uri: vehicle.image }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.makeModel}>{vehicle.make} {vehicle.model}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{vehicle.rating}/5</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="car-sport-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{vehicle.transmission}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{vehicle.seats} places</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{vehicle.year}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    zIndex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  typeLabel: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  typeLabelText: {
    fontSize: 12,
    color: COLORS.text,
  },
  favoriteButton: {
    backgroundColor: COLORS.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  makeModel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.textLight,
  },
});

export default CarCard;