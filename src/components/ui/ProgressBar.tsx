import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients, BorderRadius } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0-1
  height?: number;
  gradient?: readonly string[];
}

export function ProgressBar({
  progress,
  height = 8,
  gradient,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const colors = gradient ?? Gradients.primary;

  return (
    <View style={[styles.track, { height }]}>
      <LinearGradient
        colors={[...colors] as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BorderRadius.full,
  },
});
