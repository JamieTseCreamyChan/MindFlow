import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface ConsentToggleProps {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  required?: boolean;
}

export function ConsentToggle({
  label,
  description,
  value,
  onValueChange,
  required = false,
}: ConsentToggleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>Required</Text>}
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.surface, true: Colors.primary + '60' }}
        thumbColor={value ? Colors.primaryLight : Colors.textMuted}
        disabled={required && value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  required: {
    fontSize: FontSize.xs,
    color: Colors.danger,
    fontWeight: '600',
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
});
