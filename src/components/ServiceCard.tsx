import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/colors';
import { Service } from '../types/index';

interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
  onManagePress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  onManagePress
}) => {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>
            {formatNumber(service.price)}
          </Text>
          <Text style={styles.statLabel}>{service.currency}</Text>
          <Text style={styles.statSubLabel}>Prix</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.performance.high }]}>
            {service.popularity}%
          </Text>
          <Text style={styles.statLabel}>Popularité</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.secondary }]}>
            {formatNumber(service.revenue)}
          </Text>
          <Text style={styles.statLabel}>{service.currency}</Text>
          <Text style={styles.statSubLabel}>Revenu</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onManagePress} style={styles.manageButton}>
        <Text style={styles.manageText}>Gérer</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.secondary,
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  statSubLabel: {
    fontSize: 10,
    color: COLORS.light,
    textAlign: 'center',
  },
  manageButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  manageText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});