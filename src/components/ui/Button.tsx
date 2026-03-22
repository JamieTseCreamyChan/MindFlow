import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Spacing, FontSize } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const bgColors = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: 'transparent',
    danger: Colors.danger,
    ghost: 'transparent',
  };

  const textColors = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    outline: Colors.primary,
    danger: '#FFFFFF',
    ghost: Colors.primary,
  };

  const heights = { sm: 36, md: 48, lg: 56 };
  const fontSizes = { sm: FontSize.sm, md: FontSize.md, lg: FontSize.lg };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        {
          backgroundColor: bgColors[variant],
          height: heights[size],
          opacity: disabled ? 0.5 : 1,
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: variant === 'outline' ? Colors.primary : undefined,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: textColors[variant], fontSize: fontSizes[size] },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  text: {
    fontWeight: '600',
  },
});
