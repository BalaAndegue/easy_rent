import React , { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TextInput,Modal,FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { Vehicle, Comment } from '../types';
import { vehicleImages } from '@assets/images/vehicleImages';

interface CarCardProps {
  vehicle: Vehicle;
  onPress: (vehicle: Vehicle) => void;
  onFavoritePress?: (vehicle: Vehicle) => void;
  onCommentPress?: (vehicle: Vehicle) => void;
  onSharePress?: (vehicle: Vehicle) => void;
}

const CarCard: React.FC<CarCardProps> = ({ 
  vehicle, 
  onPress, 
  onFavoritePress,
  onCommentPress,
  onSharePress
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(vehicle.comments || []);

  const handleFavoritePress = () => {
    const newLikeStatus = !isFavorite;
    setIsFavorite(newLikeStatus);
    if (onFavoritePress) {
      onFavoritePress({
        ...vehicle,
        likes: newLikeStatus ? vehicle.likes + 1 : vehicle.likes - 1
      });
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'Vous', // Remplacez par le vrai nom d'utilisateur
        text: newComment,
        date: new Date().toLocaleDateString()
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      
      if (onCommentPress) {
        onCommentPress({
          ...vehicle,
          comments: [...comments, comment]
        });
      }
    }
  };

  const handleSharePress = () => {
    if (onSharePress) {
      onSharePress({
        ...vehicle,
        shares: vehicle.shares + 1
      });
    }
  };

  // Fonction pour rendre les étoiles de notation
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(vehicle.rating);
    const hasHalfStar = vehicle.rating % 1 >= 0.5;

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
  <>
    <TouchableOpacity style={styles.container} onPress={() => onPress(vehicle)}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: vehicle.available ? COLORS.success : COLORS.error }]}>
          <Text style={styles.statusText}>
            {vehicle.available ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.typeLabel}>
            <Text style={styles.typeLabelText}>{vehicle.fuel}</Text>
          </View>
        </View>
      </View>

      <Image 
        source={vehicleImages[vehicle.imageKey as keyof typeof vehicleImages]} 
        style={styles.image}
      />
      
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.makeModel}>{vehicle.make} {vehicle.model}</Text>
          <View style={styles.ratingContainer}>
            {renderStars()}
            <Text style={styles.ratingText}>({vehicle.rating})</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="car-sport-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{vehicle.transmission}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{vehicle.seats} places</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.grey} />
            <Text style={styles.detailText}>{vehicle.year}</Text>
          </View>
        </View>

        {/* Nouvelle section pour les actions (like, comment, share) */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFavoritePress}>
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={20} 
              color={isFavorite ? COLORS.error : COLORS.grey} 
            />
            <Text style={styles.actionText}>{vehicle.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => setCommentModalVisible(true)}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.grey} />
            <Text style={styles.actionText}>{vehicle.comments?.length || 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSharePress}>
            <Ionicons name="share-social-outline" size={20} color={COLORS.grey} />
            <Text style={styles.actionText}>{vehicle.shares}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    
    {/* Modal pour les commentaires */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Commentaires</Text>
            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noCommentsText}>Aucun commentaire pour le moment</Text>
            }
          />

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Ajouter un commentaire..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity 
              style={styles.commentSubmitButton} 
              onPress={handleAddComment}
              disabled={!newComment.trim()}
            >
              <Text style={styles.commentSubmitText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

  </>
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


  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  commentItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  noCommentsText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.textLight,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  commentSubmitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  commentSubmitText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default CarCard;