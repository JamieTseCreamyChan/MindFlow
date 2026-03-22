import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing, Glass } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'glass' | 'solid' | 'outlined';
}

export function Card({ children, style, variant = 'glass' }: CardProps) {
  const variantStyles = {
    glass: {
      backgroundColor: Glass.background,
      borderWidth: Glass.borderWidth,
      borderColor: Glass.borderColor,
    },
    solid: {
      backgroundColor: Colors.surfaceSolid,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors.glassBorder,
    },
  };

  return (
    <View style={[styles.card, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
});
