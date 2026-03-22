import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, BorderRadius, Spacing, FontSize, Shadows } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'gradient' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'gradient',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const heights = { sm: 36, md: 48, lg: 56 };
  const fontSizes = { sm: FontSize.sm, md: FontSize.md, lg: FontSize.lg };

  const textColor =
    variant === 'outline' || variant === 'ghost'
      ? Colors.primaryLight
      : '#FFFFFF';

  const content = loading ? (
    <ActivityIndicator color={textColor} />
  ) : (
    <Text style={[styles.text, { color: textColor, fontSize: fontSizes[size] }]}>
      {title}
    </Text>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[{ opacity: disabled ? 0.5 : 1 }, Shadows.sm, style]}
      >
        <LinearGradient
          colors={[...Gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, { height: heights[size] }]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const bgColors = {
    secondary: Colors.secondary,
    outline: 'transparent',
    danger: Colors.danger,
    ghost: 'transparent',
  };

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
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? Colors.glassBorder : undefined,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  text: {
    fontWeight: '600',
  },
});
