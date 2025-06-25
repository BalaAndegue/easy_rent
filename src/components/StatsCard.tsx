import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../utils/colors';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  changePercentage?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  changePercentage,
}) => {
  //const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: COLORS.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS.textSecondary }]}>{title}</Text>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
      </View>
      
      <Text style={[styles.value, { color: COLORS.text }]}>{value}</Text>
      
      <View style={styles.footer}>
        <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
          {subtitle}
        </Text>
        {changePercentage !== undefined && (
          <Text style={[
            styles.change,
            { color: changePercentage >= 0 ? COLORS.success : COLORS.error }
          ]}>
            {changePercentage >= 0 ? '+' : ''}{changePercentage}% depuis le mois dernier
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    margin: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  change: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default StatsCard;