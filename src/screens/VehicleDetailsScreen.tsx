
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import Button from '../components/Button';
import { useVehicleStore } from '../store/vehicleStore';
import { formatCurrency } from '../utils/helpers';
import { VehicleDetailsScreenNavigationProp } from '../types/navigation';
import { RootStackParamList } from '../types/navigation';



import { vehicleImages } from '@assets/images/vehicleImages';

/*interface VehicleDetailsScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ VehicleDetails: { vehicleId: string } }, 'VehicleDetails'>;
}
*/


interface VehicleDetailsScreenProps {
  navigation: VehicleDetailsScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'VehicleDetails'>;
}

const VehicleDetailsScreen: React.FC<VehicleDetailsScreenProps> = ({ navigation, route }) => {
  const { vehicleId } = route.params;
 
  const { vehicles } = useVehicleStore();
  const vehicle = vehicles.find(v => v.id === vehicleId);
  
  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Vehicle not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vehicle.make} {vehicle.model}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image 
                  source={vehicleImages[vehicle.imageKey as keyof typeof vehicleImages]} 
                  style={styles.carImage}
              />
        
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={styles.carTitle}>{vehicle.make} {vehicle.model}</Text>
              <Text style={styles.yearText}>{vehicle.year}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{formatCurrency(vehicle.pricePerDay)}</Text>
            </View>
          </View>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="speedometer-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.featureText}>Automatic</Text>
            </View>
            <View style={styles.featureDivider} />
            <View style={styles.featureItem}>
              <Ionicons name="people-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.featureText}>{vehicle.seats} Seats</Text>
            </View>
            <View style={styles.featureDivider} />
            <View style={styles.featureItem}>
              <Ionicons name="flash-outline" size={24} color={COLORS.textLight} />
              <Text style={styles.featureText}>{vehicle.fuel}</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Experience luxury and performance with the {vehicle.year} {vehicle.make} {vehicle.model}. 
            This premium vehicle offers comfort, style, and cutting-edge technology for an 
            unforgettable driving experience.
          </Text>
          
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specificationsContainer}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Brand</Text>
              <Text style={styles.specValue}>{vehicle.make}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Model</Text>
              <Text style={styles.specValue}>{vehicle.model}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Year</Text>
              <Text style={styles.specValue}>{vehicle.year}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Transmission</Text>
              <Text style={styles.specValue}>{vehicle.transmission}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Fuel Type</Text>
              <Text style={styles.specValue}>{vehicle.fuel}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>{vehicle.seats}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceFooterContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceBig}>{formatCurrency(vehicle.pricePerDay)}</Text>
        </View>
        <Button 
          title="With driver" 
          onPress={() => navigation.navigate('Booking', { vehicleId: vehicle.id })} 
          style={styles.bookButton}
        />
        <Button 
          title="without Now" 
          onPress={() => navigation.navigate('Drivers')} 
          style={styles.bookButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  favoriteButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  carImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  infoSection: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  yearText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  priceContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureDivider: {
    width: 1,
    backgroundColor: COLORS.lightGrey,
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  specificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
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
    color: COLORS.text,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  priceFooterContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  priceBig: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bookButton: {
    width: 160,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default VehicleDetailsScreen;
