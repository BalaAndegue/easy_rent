// App.tsx
/*
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
}*/


// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './src/utils/colors';
import { AuthProvider } from 'src/providers/AuthProvider';
import AuthNavigator from 'src/navigation/AuthNavigator';
import RootNavigator from 'src/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Vos polices personnalisées
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={COLORS.white} />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}