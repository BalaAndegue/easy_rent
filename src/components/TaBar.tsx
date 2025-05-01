// src/components/TabBar.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { COLORS } from '../utils/colors';


const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const validIcons = {
            Vehicles: "car",
            Orders: "document-text",
            Dashboard: "grid",
            Support: "chatbubble-ellipses",
            Profile: "person",
          } as const;

        const iconName = validIcons[route.name as keyof typeof validIcons];

        /*let iconName: string;
        if (route.name === 'Vehicles') {
          iconName = 'car';
        } else if (route.name === 'Orders') {
          iconName = 'document-text';
        } else if (route.name === 'Dashboard') {
          iconName = 'grid';
        } else if (route.name === 'Support') {
          iconName = 'chatbubble-ellipses';
        } else {
          iconName = 'person';
        }*/
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
            
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabButton}
          >
            
            <Ionicons
              name={isFocused ? iconName : `${iconName}-outline`}
              size={22}
              color={isFocused ? COLORS.primary : COLORS.grey}
            />
            <Text style={[
              styles.tabLabel,
              isFocused && styles.tabLabelFocused
            ]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    paddingBottom: 4,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 2,
  },
  tabLabelFocused: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default TabBar;