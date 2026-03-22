import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../constants/theme';

interface CheckinProgressProps {
  totalSteps: number;
  currentStep: number;
}

export function CheckinProgress({ totalSteps, currentStep }: CheckinProgressProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < currentStep && styles.dotCompleted,
            i === currentStep && styles.dotActive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surface,
  },
  dotCompleted: {
    backgroundColor: Colors.primaryLight,
    width: 8,
  },
  dotActive: {
    backgroundColor: Colors.primaryLight,
    width: 24,
    borderRadius: 4,
  },
});
