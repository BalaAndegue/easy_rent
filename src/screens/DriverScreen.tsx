

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TabSelector from '../components/TabSelector';
import FilterButton from '../components/FilterButton';
import DriverCard from '../components/DriverCard';
import Button from '../components/Button';
import { COLORS } from '../utils/colors';
import { useDriverStore } from '../store/driverStore';
import { Driver } from '../types';



import FloatingActionButton from '../components/FloatingActionButton';
interface VehiclesScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

    // src/screens/VehiclesScreen.tsx (suite)

const DriversScreen: React.FC<VehiclesScreenProps> = ({ navigation }) => {
    const { filteredDrivers, activeTab, setActiveTab, filters, setFilters, applyFilters } = useDriverStore();
    const [isFilterVisible, setIsFilterVisible] = useState(false);
  
    const vehicleTypes = ['SUV', 'Sedan', 'Hatchback', 'Convertible'];
    const passengerOptions = ['2', '4', '5', '7+'];
    
    const onTabPress = (tab: string) => {
      setActiveTab(tab as 'Général' | 'Statistics');
    };
    
    const handleDriverPress = (driver: Driver) => {
      navigation.navigate('DriverDetails', { driverId: driver.id });
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
    console.log('Photo de profil pressée');
    // Navigation vers le profil utilisateur
    // navigation.navigate('Profile');
  };
    
    return (
      <SafeAreaView style={styles.container}>
        

        <Header
        onCommentPress={handleCommentPress}
        onProfilePress={handleProfilePress}
        profileImage={profileImage}
      />
        <SearchBar title="Easy-rent" placeholder="Search something here" />
        

        
        <Text style={styles.sectionTitle}>Vos Chauffeurs</Text>
        
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
          data={filteredDrivers}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <DriverCard
              driver={item}
              onPress={handleDriverPress}
            />
          )}
        />


        <FloatingActionButton
          onPress={() => console.log('Pressed')}
          iconName="add" // ou "chatbubble", "camera", etc.
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
  
  export default DriversScreen;