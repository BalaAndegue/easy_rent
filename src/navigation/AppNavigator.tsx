
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';


import { RootStackParamList } from '../types/navigation';
import BookingScreen from '../screens/BookingScreen';
import DriversScreen from 'src/screens/DriverScreen';


//const Stack = createNativeStackNavigator();



const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
        <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Drivers" component={DriversScreen} />
      </Stack.Navigator>
    
  );
};

export default AppNavigator;
