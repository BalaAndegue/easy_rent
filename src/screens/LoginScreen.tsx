// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '@utils/colors';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  route?: {
    params?: {
      prefillEmail?: string;
      prefillPassword?: string;
    };
  };
}
const LoginScreen: React.FC<LoginScreenProps> = ({ 
  navigation, 
  setIsAuthenticated,
  route 
}) => {
  const [email, setEmail] = useState(route?.params?.prefillEmail || '');
  const [password, setPassword] = useState(route?.params?.prefillPassword || '');
  const [loading, setLoading] = useState(false);

  const TEST_ACCOUNT = {
    email: 'test@example.com',
    password: 'password123'
  };

  const handleLogin = async () => {
    if (email === TEST_ACCOUNT.email && password === TEST_ACCOUNT.password) {
      setLoading(true);
      await AsyncStorage.setItem('userToken', 'dummy_token');
      setLoading(false);
      setIsAuthenticated(true);
      navigation.navigate('Main'); // Utilisez votre route principale ici
    } else {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
    }
  };

  const fillTestCredentials = () => {
    setEmail(TEST_ACCOUNT.email);
    setPassword(TEST_ACCOUNT.password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={fillTestCredentials}>
        <Text style={styles.testButtonText}>Utiliser le compte de test</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>

      <View style={styles.testInfo}>
        <Text style={styles.testInfoText}>Compte de test:</Text>
        <Text style={styles.testInfoText}>Email: test@example.com</Text>
        <Text style={styles.testInfoText}>Mot de passe: password123</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  input: {
    height: 50,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  testButton: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  testButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  testInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  testInfoText: {
    color: COLORS.textLight,
    fontSize: 12,
    marginBottom: 5,
  },
});

export default LoginScreen;