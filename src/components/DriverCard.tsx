// src/components/DriverCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { Driver } from '../types';
import { driverImages } from '@assets/images/driverImages';

interface DriverCardProps {
  driver: Driver;
  onPress: (driver: Driver) => void;
  onFavoritePress?: (driver: Driver) => void;
  onCommentPress?: (driver: Driver) => void;
  onSharePress?: (driver: Driver) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ 
  driver, 
  onPress, 
  onFavoritePress,
  onCommentPress,
  onSharePress
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (onFavoritePress) {
      onFavoritePress(driver);
    }
  };

  const handleCommentPress = () => {
    if (onCommentPress) {
      onCommentPress(driver);
    }
  };

  const handleSharePress = () => {
    if (onSharePress) {
      onSharePress(driver);
    }
  };

  // Fonction pour rendre les étoiles de notation
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(driver.rating);
    const hasHalfStar = driver.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={16} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={16} color="#FFD700" />);
      }
    }

    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(driver)}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: driver.available ? COLORS.success : COLORS.error }]}>
          <Text style={styles.statusText}>
            {driver.available ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.typeLabel}>
            <Text style={styles.typeLabelText}>{driver.fuel}</Text>
          </View>
        </View>
      </View>

      <Image 
        source={driverImages[driver.imageKey as keyof typeof driverImages]} 
        style={styles.image}
      />
      
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.makeModel}>{driver.name} {driver.firstname}</Text>
          <View style={styles.ratingContainer}>
            {renderStars()}
            <Text style={styles.ratingText}>({driver.rating})</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="person-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{driver.gender}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{driver.seats} places</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{driver.age} ans</Text>
          </View>
        </View>

        {/* Nouvelle section pour les actions (like, comment, share) */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleFavoritePress}
          >
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={20} 
              color={isFavorite ? COLORS.error : COLORS.grey} 
            />
            <Text style={styles.actionText}>J'aime</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleCommentPress}
          >
            <Ionicons 
              name="chatbubble-ellipses-outline" 
              size={20} 
              color={COLORS.grey} 
            />
            <Text style={styles.actionText}>Commenter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleSharePress}
          >
            <Ionicons 
              name="share-social-outline" 
              size={20} 
              color={COLORS.grey} 
            />
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    zIndex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  typeLabel: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  typeLabelText: {
    fontSize: 12,
    color: COLORS.text,
  },
  favoriteButton: {
    backgroundColor: COLORS.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  makeModel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.textLight,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.textLight,
  },
  // Styles pour la nouvelle section d'actions
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    paddingTop: 12,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
});

export default DriverCard;