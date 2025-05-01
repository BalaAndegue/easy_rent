// src/components/FilterButton.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

interface FilterButtonProps {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  options?: string[];
  onSelect?: (option: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  iconName = 'chevron-down', 
  options = [],
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.selectedOption}>
          {selectedOption || 'All'}
        </Text>
        <Ionicons name={iconName} size={16} color={COLORS.grey} />
      </TouchableOpacity>
      
      {isOpen && options.length > 0 && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionItem}
              onPress={() => handleSelect(option)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
              {selectedOption === option && (
                <Ionicons name="checkmark" size={16} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  label: {
    fontSize: 12,
    color: COLORS.textLight,
    marginRight: 4,
  },
  selectedOption: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
    marginRight: 4,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default FilterButton;