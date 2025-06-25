import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import Header from '@components/Header';

type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

interface BookingScreenProps {
  route: BookingScreenRouteProp;
  navigation: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  const { vehicleId } = route.params;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [operationResult, setOperationResult] = useState<{success: boolean, message: string} | null>(null);

  // États pour les formulaires
  const [orangeMoneyData, setOrangeMoneyData] = useState({
    phone: '',
    secretCode: ''
  });

  const [mtnMoneyData, setMtnMoneyData] = useState({
    phone: '',
    secretCode: ''
  });

  const [paypalData, setPaypalData] = useState({
    email: '',
    password: ''
  });

  const paymentMethods = [
    { id: 'orange', name: 'Orange Money', icon: 'phone-portrait-outline' },
    { id: 'mtn', name: 'MTN Mobile Money', icon: 'phone-portrait-outline' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
  ];

  const handlePayment = () => {
    // Simulation de traitement de paiement
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% de chance de succès pour la démo
      if (selectedPayment === 'orange') {
        setOperationResult({
          success,
          message: success 
            ? 'Paiement Orange Money effectué avec succès!' 
            : 'Échec du paiement. Code secret incorrect.'
        });
      } else if (selectedPayment === 'mtn') {
        setOperationResult({
          success,
          message: success 
            ? 'Paiement MTN Mobile Money effectué avec succès!' 
            : 'Échec du paiement. Vérifiez vos informations.'
        });
      } else if (selectedPayment === 'paypal') {
        setOperationResult({
          success,
          message: success 
            ? 'Paiement PayPal effectué avec succès!' 
            : 'Échec du paiement. Identifiants incorrects.'
        });
      }
    }, 1500);
  };

  const resetForm = () => {
    setOperationResult(null);
    setSelectedPayment(null);
    setOrangeMoneyData({ phone: '', secretCode: '' });
    setMtnMoneyData({ phone: '', secretCode: '' });
    setPaypalData({ email: '', password: '' });
  };

  const renderPaymentForm = () => {
    if (operationResult) {
      return (
        <View style={styles.resultContainer}>
          <Ionicons 
            name={operationResult.success ? "checkmark-circle" : "close-circle"} 
            size={60} 
            color={operationResult.success ? COLORS.success : COLORS.error} 
          />
          <Text style={styles.resultText}>{operationResult.message}</Text>
          <TouchableOpacity style={styles.doneButton} onPress={resetForm}>
            <Text style={styles.doneButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (selectedPayment) {
      case 'orange':
        return <OrangeMoneyForm 
                 data={orangeMoneyData} 
                 onChange={setOrangeMoneyData} 
                 onSubmit={handlePayment} 
               />;
      case 'mtn':
        return <MTNMoneyForm 
                 data={mtnMoneyData} 
                 onChange={setMtnMoneyData} 
                 onSubmit={handlePayment} 
               />;
      case 'paypal':
        return <PayPalForm 
                 data={paypalData} 
                 onChange={setPaypalData} 
                 onSubmit={handlePayment} 
               />;
      default:
        return null;
    }
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => operationResult ? resetForm() : navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}> Payement pour le vehicule : {vehicleId}</Text>
        <View style={{ width: 24 }} /> {/* Pour l'alignement */}
        
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!selectedPayment ? (
          <>
            <Text style={styles.sectionTitle}>Choisissez votre mode de paiement</Text>
            
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.paymentMethod}
                onPress={() => setSelectedPayment(method.id)}
              >
                <Ionicons name="notifications" size={24} color={COLORS.primary} />
                <Text style={styles.methodName}>{method.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            {!operationResult && (
              <TouchableOpacity 
                style={styles.backToMethods} 
                onPress={resetForm}
              >
                <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
                <Text style={styles.backText}>Retour aux méthodes</Text>
              </TouchableOpacity>
            )}
            
            {renderPaymentForm()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Composants pour les différents formulaires de paiement
const OrangeMoneyForm = ({ data, onChange, onSubmit }: { 
  data: { phone: string, secretCode: string }, 
  onChange: (data: { phone: string, secretCode: string }) => void,
  onSubmit: () => void 
}) => (
  <View style={styles.formContainer}>
    <Text style={styles.formTitle}>Paiement par Orange Money</Text>
    
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Numéro Orange Money</Text>
      <View style={styles.phoneInput}>
        <Text style={styles.prefix}>+237</Text>
        <TextInput
          style={styles.input}
          placeholder="656 616 751"
          keyboardType="phone-pad"
          value={data.phone}
          onChangeText={(text) => onChange({...data, phone: text})}
        />
      </View>
    </View>
    
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Code secret</Text>
      <TextInput
        style={styles.secretInput}
        placeholder="••••"
        secureTextEntry
        keyboardType="number-pad"
        value={data.secretCode}
        onChangeText={(text) => onChange({...data, secretCode: text})}
      />
    </View>
    
    <TouchableOpacity 
      style={styles.payButton} 
      onPress={onSubmit}
      disabled={!data.phone || !data.secretCode}
    >
      <Text style={styles.payButtonText}>Payer maintenant</Text>
    </TouchableOpacity>
  </View>
);

const MTNMoneyForm = ({ data, onChange, onSubmit }: { 
  data: { phone: string, secretCode: string }, 
  onChange: (data: { phone: string, secretCode: string }) => void,
  onSubmit: () => void 
}) => (
  <View style={styles.formContainer}>
    <Text style={styles.formTitle}>Paiement par MTN Mobile Money</Text>
    
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Numéro MTN</Text>
      <View style={styles.phoneInput}>
        <Text style={styles.prefix}>+237</Text>
        <TextInput
          style={styles.input}
          placeholder="656 616 751"
          keyboardType="phone-pad"
          value={data.phone}
          onChangeText={(text) => onChange({...data, phone: text})}
        />
      </View>
    </View>
    
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Code secret</Text>
      <TextInput
        style={styles.secretInput}
        placeholder="••••"
        secureTextEntry
        keyboardType="number-pad"
        value={data.secretCode}
        onChangeText={(text) => onChange({...data, secretCode: text})}
      />
    </View>
    
    <TouchableOpacity 
      style={styles.payButton} 
      onPress={onSubmit}
      disabled={!data.phone || !data.secretCode}
    >
      <Text style={styles.payButtonText}>Payer maintenant</Text>
    </TouchableOpacity>
  </View>
);

const PayPalForm = ({ data, onChange, onSubmit }: { 
  data: { email: string, password: string }, 
  onChange: (data: { email: string, password: string }) => void,
  onSubmit: () => void 
}) => (
  <View style={styles.formContainer}>
    <Text style={styles.formTitle}>Paiement par PayPal</Text>
    
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Email PayPal</Text>
      <TextInput
        style={styles.input}
        placeholder="email@exemple.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={data.email}
        onChangeText={(text) => onChange({...data, email: text})}
      />
    </View>
    
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.secretInput}
        placeholder="••••••••"
        secureTextEntry
        value={data.password}
        onChangeText={(text) => onChange({...data, password: text})}
      />
    </View>
    
    <TouchableOpacity 
      style={styles.payButton} 
      onPress={onSubmit}
      disabled={!data.email || !data.password}
    >
      <Text style={styles.payButtonText}>Se connecter et payer</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    paddingVertical: 1,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: COLORS.text,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  methodName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  backToMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flex: 1,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.text,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingBottom: 8,
  },
  prefix: {
    fontSize: 16,
    color: COLORS.text,
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    paddingVertical: 8,
  },
  secretInput: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonDisabled: {
    backgroundColor: COLORS.lightGrey,
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: COLORS.text,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;