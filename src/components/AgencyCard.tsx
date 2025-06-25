import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { Agency } from '../types/index';

interface AgencyCardProps {
  agency: Agency;
  onPress?: () => void;
  onDetailsPress?: () => void;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({
  agency,
  onPress,
  onDetailsPress
}) => {
  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return COLORS.performance.high;
    if (performance >= 60) return COLORS.performance.medium;
    return COLORS.performance.low;
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{agency.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={COLORS.secondary} />
            <Text style={styles.location}>{agency.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: getPerformanceColor(agency.performance) }]}>
            {agency.performance}%
          </Text>
          <Text style={styles.statLabel}>Performance</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>
            {formatNumber(agency.revenue)}
          </Text>
          <Text style={styles.statLabel}>{agency.currency}</Text>
          <Text style={styles.statSubLabel}>Revenu</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>
            {agency.employees}
          </Text>
          <Text style={styles.statLabel}>Employés</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onDetailsPress} style={styles.detailsButton}>
        <Text style={styles.detailsText}>Voir les détails</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color:COLORS.primary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: COLORS.secondary,
    marginLeft: 4,
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
  detailsButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  detailsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});



export default AgencyCard;