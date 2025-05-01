// src/navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VehiclesScreen from '../screens/VehiclesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBar from '../components/TaBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Vehicles" component={VehiclesScreen} />
      <Tab.Screen name="Orders" component={DashboardScreen} options={{ tabBarLabel: "Orders" }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Support" component={DashboardScreen} options={{ tabBarLabel: "Support" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;