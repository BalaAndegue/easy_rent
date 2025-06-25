import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { useDriverStore } from '../store/driverStore';

interface DriverDetailsProps {
  route: RouteProp<RootStackParamList, 'DriverDetails'>;
}

const DriverDescription: React.FC<DriverDetailsProps> = ({ route }) => {
  const { driverId } = route.params;
  const { drivers } = useDriverStore();
  const driver = drivers.find(d => d.id === driverId);

  // Handle case where driver is not found
  if (!driver) {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.errorText}>Driver not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.descriptionText}>
        Experience luxury and performance with the {driver.age} {driver.name} {driver.firstname}. 
        This premium vehicle offers comfort, style, and cutting-edge technology for an 
        unforgettable driving experience.
      </Text>

      <Text style={styles.sectionTitle}>Specifications</Text>
      <View style={styles.specificationsContainer}>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Brand</Text>
          <Text style={styles.specValue}>{driver.name}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Model</Text>
          <Text style={styles.specValue}>{driver.firstname}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Year</Text>
          <Text style={styles.specValue}>{driver.age}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Gender</Text>
          <Text style={styles.specValue}>{driver.gender}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Fuel Type</Text>
          <Text style={styles.specValue}>{driver.fuel}</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specLabel}>Seats</Text>
          <Text style={styles.specValue}>{driver.seats}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  specificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specItem: {
    width: '50%',
    marginBottom: 12,
  },
  specLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    padding: 20,
  },
});

export default DriverDescription;