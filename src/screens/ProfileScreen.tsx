

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS } from '../utils/colors';

const ProfileScreen: React.FC = () => {
  const menuItems = [
    { icon: 'person-outline', title: 'Mes informations', screen: 'UserInfo' },
    { icon: 'car-outline', title: 'Mes locations', screen: 'MyRentals' },
    { icon: 'bookmark-outline', title: 'Mes favoris', screen: 'Favorites' },
    { icon: 'card-outline', title: 'Paiements', screen: 'Payments' },
    { icon: 'settings-outline', title: 'Paramètres', screen: 'Settings' },
    { icon: 'help-circle-outline', title: 'Aide et support', screen: 'Support' },
  ];

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
      
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>BA</Text>
          </View>
        </View>
        <Text style={styles.name}>Bala ANdegue</Text>
        <Text style={styles.email}>bala@gmail.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    marginBottom: -30,
    zIndex: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  email: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  editButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  logoutText: {
    marginLeft: 8,
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;