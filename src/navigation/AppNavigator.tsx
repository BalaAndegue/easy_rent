// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import { ParamListBase } from "@react-navigation/native";

// type RootStackParamList = {
//   Vehicles: undefined;
//   VehicleDetails: { vehicleId: string };
// };
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Vehicles" component={VehicleDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;