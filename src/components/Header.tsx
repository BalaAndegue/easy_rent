// src/components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

interface HeaderProps {
  onCommentPress?: () => void;
  onProfilePress?: () => void;
  profileImage?: string; // URL ou require() de l'image de profil
}

const Header: React.FC<HeaderProps> = ({ 
  onCommentPress, 
  onProfilePress,
  profileImage 
}) => {
  return (
    <View style={styles.container}>
      {/* Icône de l'application à la place du titre */}

      <Image
        source={{ uri: 'https://i.pinimg.com/736x/51/2f/ee/512fee76586dc7070009826f55207dbe.jpg' }}
        style={{ width: 80, height: 80 }}
        resizeMode="contain"
      />
      
      
      <View style={styles.iconContainer}>
        {/* Icône de commentaires à la place des notifications 
        <TouchableOpacity onPress={onCommentPress} style={styles.iconButton}>
          <Ionicons name="chatbubble-ellipses" size={24} color={COLORS.primary} />
        </TouchableOpacity> */}
        
        {/* Photo de profil à la place du menu */}
        <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
          {profileImage ? (
            <Image 
              source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage} 
              style={styles.profileImage} 
            />
          ) : (
            <Ionicons name="person-circle" size={24} color={COLORS.black} />
          )}
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
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 16,
  },
});

export default Header;