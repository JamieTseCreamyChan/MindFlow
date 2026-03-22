import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  lowLabel?: string;
  highLabel?: string;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  lowLabel,
  highLabel,
}: SliderInputProps) {
  const steps = [];
  for (let i = min; i <= max; i += step) {
    steps.push(i);
  }

  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{displayValue}</Text>
      </View>
      <View style={styles.track}>
        {steps.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => onChange(s)}
            style={[
              styles.dot,
              s <= value && styles.dotActive,
              s === value && styles.dotCurrent,
            ]}
          />
        ))}
      </View>
      {(lowLabel || highLabel) && (
        <View style={styles.labels}>
          <Text style={styles.rangeLabel}>{lowLabel}</Text>
          <Text style={styles.rangeLabel}>{highLabel}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  value: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  track: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.primary + '40',
    borderColor: Colors.primary + '60',
  },
  dotCurrent: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
