

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TabSelector from '../components/TabSelector';
import FilterButton from '../components/FilterButton';
import CarCard from '../components/CarCard';
import Button from '../components/Button';
import { COLORS } from '../utils/colors';
import { useVehicleStore } from '../store/vehicleStore';
import { Vehicle } from '../types';


import FloatingActionButton from '../components/FloatingActionButton';


interface VehiclesScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

    

const VehiclesScreen: React.FC<VehiclesScreenProps> = ({ navigation }) => {
    const { filteredVehicles, activeTab, setActiveTab, filters, setFilters, applyFilters } = useVehicleStore();
    const [isFilterVisible, setIsFilterVisible] = useState(false);
  
    const vehicleTypes = ['SUV', 'Sedan', 'Hatchback', 'Convertible'];
    const passengerOptions = ['2', '4', '5', '7+'];
    
    const onTabPress = (tab: string) => {
      setActiveTab(tab as 'Général' | 'Statistics');
    };
    
    const handleVehiclePress = (vehicle: Vehicle) => {
      navigation.navigate('VehicleDetails', { vehicleId: vehicle.id });
    };
    
    const handleApplyFilters = () => {
      applyFilters();
      setIsFilterVisible(false);
    };
    const profileImage = "https://lh3.googleusercontent.com/a/ACg8ocLPBpiO162KoSOj0kwSHsJzbq2AE0cWeCXXndUR67WruxE8I6U=s288-c-no";
    const handleCommentPress = () => {
    console.log('Icône commentaires pressée');
    // Navigation vers l'écran des commentaires ou ouverture d'un modal
    // navigation.navigate('Comments');
  };

    const handleProfilePress = () => {
    //console.log('Photo de profil pressée');
    // Navigation vers le profil utilisateur
    navigation.navigate('Profile');
  };

    return (
      <SafeAreaView style={styles.container}>
        


        <Header
        onCommentPress={handleCommentPress}
        onProfilePress={handleProfilePress}
        profileImage={profileImage}
      />
        <SearchBar title="Easy-rent" placeholder="Search something here" />
        

        
        <Text style={styles.sectionTitle}>Vos véhicules</Text>
        
        <TabSelector
          tabs={['Général', 'Statistics']}
          activeTab={activeTab}
          onTabPress={onTabPress}
        />
        
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Filters</Text>
          <View style={styles.filterButtons}>
            <FilterButton 
              label="Vehicle type" 
              options={vehicleTypes} 
              onSelect={(type) => setFilters({ ...filters, vehicleType: type })}
            />
            <FilterButton 
              label="Passengers" 
              options={passengerOptions} 
              onSelect={(passengers) => setFilters({ ...filters, passengers: parseInt(passengers) })}
            />
            <FilterButton 
              label="Price range" 
              iconName="options" 
            />
          </View>
          <Button 
            title="Apply Filters" 
            onPress={handleApplyFilters} 
            style={styles.applyButton}
          />
        </View>
        
        <FlatList
          data={filteredVehicles}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <CarCard
              vehicle={item}
              onPress={handleVehiclePress}
            />
          )}
        />

        <FloatingActionButton
          onPress={() => console.log('Pressed')}
          iconName="chatbubble" // ou "chatbubble", "camera", etc.
          variant="primary"
          size="large"
        />
      
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
      color: COLORS.text,
    },
    filtersContainer: {
      marginTop: 8,
      marginHorizontal: 16,
      marginBottom: 8,
    },
    filtersTitle: {
      fontSize: 14,
      color: COLORS.textLight,
      marginBottom: 8,
    },
    filterButtons: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    applyButton: {
      alignSelf: 'flex-end',
      paddingHorizontal: 20,
      height: 36,
    },
    listContainer: {
      padding: 16,
    },
  });
  
  export default VehiclesScreen;