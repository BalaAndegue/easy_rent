import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { Colors } from '../../constants/Colors';
import { COLORS } from '../utils/colors';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color = COLORS.primary,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.light,
    textAlign: 'center',
  },
});