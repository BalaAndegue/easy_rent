
import React, { useState }  from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import Button from '../components/Button';
import { useDriverStore } from '../store/driverStore';
import { formatCurrency } from '../utils/helpers';
import { DriverDetailsScreenNavigationProp } from '../types/navigation';
import { RootStackParamList } from '../types/navigation';

import TabSelectorO from '../components/TabSelectorO';
import { driverImages } from '@assets/images/driverImages';


import { Calendar } from 'react-native-calendars';
import DriverDescription from '@components/DriverDescription';


interface DriverDetailsScreenProps {
  navigation: DriverDetailsScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'DriverDetails'>;
}

const DriverDetailsScreen: React.FC<DriverDetailsScreenProps> = ({ navigation, route }) => {

  const { filteredDrivers, activeTab, setActiveTab, filters, setFilters, applyFilters } = useDriverStore();
  const { driverId } = route.params;
  const { drivers } = useDriverStore();
  const driver = drivers.find(d => d.id === driverId);

  const [editing, setEditing] = useState(false);
  const currentDate = new Date().toISOString().split('T')[0];

  const [markedDates, setMarkedDates] = useState({
    '2023-11-15': { selected: true, selectedColor: 'red', dotColor: 'white' }, // Jour de repos
    '2023-11-18': { selected: true, selectedColor: 'green' }, // Jour programmé
    [currentDate]: { selected: true, selectedColor: 'blue' }, // Aujourd'hui
    '2023-11-10': { disabled: true, disableTouchEvent: true } // Jour passé
  });

  const toggleEditing = () => setEditing(!editing);


  const onTabPress = (tab: string) => {
      setActiveTab(tab as 'Général' | 'Statistics');
    };
    
  
  if (!driver) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Driver not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{driver.name} {driver.firstname}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headinfo}>
          <View style={styles.circleContainer}>
            <Image 
              source={driverImages[driver.imageKey as keyof typeof driverImages]} 
              style={styles.circularImage}
            />
          </View>

          <View style={styles.infoHeader}>
              <View>
                <Text style={styles.carTitle}>{driver.name} {driver.firstname}</Text>
                <Text style={styles.yearText}>{driver.age} ans</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{formatCurrency(driver.pricePerDay)}</Text>
              </View>
          </View>  
        </View>


        <TabSelectorO
            tabs={['Details', 'ACtivity']}
            activeTab={activeTab}
            onTabPress={onTabPress}
        />            
        
        <View style={styles.infoSection}>
          
          <View style={styles.detailscontainer}>

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
                  <Text style={styles.specLabel}>gender</Text>
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
          <View style={styles.detailscontainer}>
                        <View style={styles.header}>
                          <Text style={styles.sectionTitle}>Scheduling & Availability</Text>
                          <TouchableOpacity onPress={toggleEditing}>
                            <Ionicons name={editing ? "checkmark" : "create-outline"} size={24} color="#1890ff" />
                          </TouchableOpacity>
                        </View>

                        <Calendar
                          style={styles.calendar}
                          markedDates={markedDates}
                          markingType={'multi-dot'}
                          theme={{
                            calendarBackground: '#fff',
                            todayTextColor: '#1890ff',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            arrowColor: '#1890ff',
                            monthTextColor: '#2d4150',
                          }}
                          onDayPress={editing ? (day: { dateString: string }) => {
                            // Logique d'édition
                            const newMark = markedDates[day.dateString]?.selectedColor === 'red' 
                              ? { selected: true, selectedColor: 'green' }
                              : { selected: true, selectedColor: 'red' };
                            
                            setMarkedDates({
                              ...markedDates,
                              [day.dateString]: newMark
                            });
                          } : undefined}
                        />

                        <View style={styles.legendContainer}>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: 'blue' }]} />
                            <Text style={styles.legendText}>Today</Text>
                          </View>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: 'green' }]} />
                            <Text style={styles.legendText}>Scheduled</Text>
                          </View>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
                            <Text style={styles.legendText}>Day Off</Text>
                          </View>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: '#d9e1e8' }]} />
                            <Text style={styles.legendText}>Past</Text>
                          </View>
                        </View>
          </View>
          
          <View >
            <DriverDescription route={route} />
          </View>   
        
              </View>
          
        
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceFooterContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceBig}>{formatCurrency(driver.pricePerDay)}</Text>
        </View>
        <Button 
          title="Book Now" 
          onPress={() => navigation.navigate('Booking', { vehicleId: driver.id })} 
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
  detailscontainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding:12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  headinfo:{
    marginBottom: 16,
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
   
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 110, // Compense la largeur du cercle + marge
    paddingTop: 10,  // Alignement vertical avec le cercle
    zIndex: 2,       // Place au-dessus du cercle
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
  circleContainer: {
    position: 'absolute',
    top: 10,       // Position en haut
    left: 10,      // Position à gauche
    marginLeft:10,
    zIndex: 1,     // Pour s'assurer qu'elle est au-dessus
  },
  circularImage: {
    width: 80,     // Taille du cercle
    height: 80,
    borderRadius: 40, // Moitié de la largeur/hauteur pour un cercle parfait
    borderWidth: 3,
    borderColor: '#1890ff', // Bleu vif
    shadowColor: '#1890ff', // Couleur de l'ombre (effet shazam)
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10, // Pour Android
    overflow: 'hidden', // Important pour garder l'image dans le cercle
  },

  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#2d4150',
  },
});

export default DriverDetailsScreen;

