import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from '../ui/Card';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface ScreenTimeWheelProps {
  hours: number;
  minutes: number;
  onChangeHours: (h: number) => void;
  onChangeMinutes: (m: number) => void;
}

const HOURS = Array.from({ length: 17 }, (_, i) => i); // 0-16
const MINUTES = [0, 15, 30, 45];

export function ScreenTimeWheel({
  hours,
  minutes,
  onChangeHours,
  onChangeMinutes,
}: ScreenTimeWheelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen time today?</Text>
      <Text style={styles.hint}>
        Check Settings → Screen Time on your iPhone
      </Text>

      <View style={styles.display}>
        <Text style={styles.timeText}>
          {hours}h {minutes.toString().padStart(2, '0')}m
        </Text>
      </View>

      <Text style={styles.label}>Hours</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.wheelRow}
      >
        {HOURS.map((h) => (
          <TouchableOpacity
            key={h}
            onPress={() => onChangeHours(h)}
            style={[styles.chip, hours === h && styles.chipActive]}
          >
            <Text style={[styles.chipText, hours === h && styles.chipTextActive]}>
              {h}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Minutes</Text>
      <View style={styles.minuteRow}>
        {MINUTES.map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => onChangeMinutes(m)}
            style={[styles.minuteChip, minutes === m && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, minutes === m && styles.chipTextActive]}
            >
              {m.toString().padStart(2, '0')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  hint: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    fontStyle: 'italic',
  },
  display: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  timeText: {
    fontSize: 56,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  wheelRow: {
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  minuteRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  chip: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minuteChip: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: Colors.primary + '30',
    borderColor: Colors.primaryLight,
  },
  chipText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.primaryLight,
  },
});
