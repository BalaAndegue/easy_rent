// src/components/FloatingActionButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../utils/colors';

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  position?: { bottom: number; right: number };
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  iconName,
  iconSize = 24,
  iconColor = COLORS.white,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  position = { bottom: 30, right: 30 },
}) => {
  const getButtonSize = () => {
    switch (size) {
      case 'small': return 40;
      case 'large': return 70;
      default: return 56; // medium
    }
  };

  const getButtonColor = () => {
    switch (variant) {
      case 'secondary': return COLORS.secondary;
      case 'primary': return COLORS.primary;
      default: return COLORS.primary; // primary
    }
  };

  return (
    <View style={[styles.container, position]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: getButtonSize(),
            height: getButtonSize(),
            borderRadius: getButtonSize() / 2,
            backgroundColor: getButtonColor(),
          },
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  disabledButton: {
    backgroundColor: COLORS.lightGrey,
    opacity: 0.6,
  },
});

export default FloatingActionButton;