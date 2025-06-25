import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { SystemAlert } from '../types';
import { COLORS } from '../utils/colors';

interface SystemAlertsProps {
  alerts: SystemAlert[];
  onAlertPress?: (alert: SystemAlert) => void;
}

const SystemAlerts: React.FC<SystemAlertsProps> = ({ alerts, onAlertPress }) => {
  //const { colors } = useTheme();

  const getAlertIcon = (type: SystemAlert['type']) => {
    switch (type) {
      case 'maintenance':
        return 'construct';
      case 'location':
        return 'location';
      case 'payment':
        return 'card';
      case 'driver':
        return 'person';
      case 'client':
        return 'people';
      default:
        return 'alert-circle';
    }
  };

  const getAlertColor = (priority: SystemAlert['priority']) => {
    switch (priority) {
      case 'high':
        return COLORS.error;
      case 'medium':
        return COLORS.warning;
      case 'low':
        return COLORS.info;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.surface }]}>
      <View style={styles.header}>
        <Ionicons name="alert-circle" size={20} color={COLORS.info} />
        <Text style={[styles.title, { color: COLORS.text }]}>Alertes système</Text>
      </View>
      <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
        Situations requérant votre attention
      </Text>

      <View style={styles.alertsList}>
        {alerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={styles.alertItem}
            onPress={() => onAlertPress?.(alert)}
          >
            <View style={styles.alertLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: getAlertColor(alert.priority) + '20' },
                ]}
              >
                <Ionicons
                  name={getAlertIcon(alert.type)}
                  size={16}
                  color={getAlertColor(alert.priority)}
                />
              </View>
              <View style={styles.alertContent}>
                <Text style={[styles.alertTitle, { color: COLORS.text }]}>
                  {alert.title}
                </Text>
                <Text style={[styles.alertDescription, { color: COLORS.textSecondary }]}>
                  {alert.description}
                </Text>
              </View>
            </View>
            {alert.count && (
              <View style={[styles.badge, { backgroundColor: getAlertColor(alert.priority) }]}>
                <Text style={[styles.badgeText, { color: COLORS.surface }]}>
                  {alert.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}``
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
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
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  alertsList: {
    gap: 12,
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default SystemAlerts;
