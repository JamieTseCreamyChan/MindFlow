import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
}

export function StreakCounter({ streak, longestStreak }: StreakCounterProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.fireEmoji}>🔥</Text>
        <View>
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.label}>
            {streak === 1 ? 'day streak' : 'day streak'}
          </Text>
        </View>
        {longestStreak > 0 && (
          <View style={styles.bestContainer}>
            <Text style={styles.bestLabel}>Best</Text>
            <Text style={styles.bestValue}>{longestStreak}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  fireEmoji: {
    fontSize: 36,
  },
  streakNumber: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.warningLight,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  bestContainer: {
    marginLeft: 'auto',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  bestLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  bestValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
});
