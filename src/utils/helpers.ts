// src/utils/colors.ts

export const COLORS = {
    primary: '#0066FF',
    secondary: '#FF9F00',
    background: '#F7F8FA',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#8E8E93',
    lightGrey: '#E5E5EA',
    success: '#4CD964',
    error: '#FF3B30',
    text: '#1C1C1E',
    textLight: '#6E6E73',
    border: '#C7C7CC',
  };
  
  // src/utils/helpers.ts
  
  export const formatCurrency = (amount: number): string => {
    return `${amount} €/j`;
  };
  
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };