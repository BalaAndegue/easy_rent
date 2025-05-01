// App.tsx

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/colors';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Vous pouvez ajouter ici des polices personnalisées si nécessaire
    // 'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    // 'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={COLORS.white} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}