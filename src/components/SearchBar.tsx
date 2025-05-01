// src/components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

interface HeaderProps {
  title: string;
  placeholder?: string; // ✅ Ajout du placeholder
  showNotification?: boolean;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  placeholder,
  showNotification = true, 
  onMenuPress, 
  onNotificationPress 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{title}</Text>

      {/* ✅ Ajout du champ de recherche */}
      {placeholder && (
        <TextInput 
          style={styles.searchBar} 
          placeholder={placeholder} 
          placeholderTextColor={COLORS.textLight}
        />
      )}

      <View style={styles.iconContainer}>
        {showNotification && (
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  searchBar: { // ✅ Ajout du style manquant
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    fontSize: 14,
  },
});

export default Header;