import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { DailyLog } from '../../models/DailyLog';

interface DailySummaryCardProps {
  log: DailyLog | null;
}

export function DailySummaryCard({ log }: DailySummaryCardProps) {
  if (!log) {
    return (
      <Card style={styles.card}>
        <Text style={styles.emptyTitle}>No check-in yet today</Text>
        <Text style={styles.emptyText}>
          Tap the Check In button to log your digital load
        </Text>
      </Card>
    );
  }

  const hours = Math.floor(log.screenTimeMinutes / 60);
  const mins = log.screenTimeMinutes % 60;
  const moodEmojis = ['', '😔', '😕', '😐', '🙂', '😊'];

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Today</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {hours}h {mins}m
          </Text>
          <Text style={styles.statLabel}>Screen</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{log.fatigueLevel}/10</Text>
          <Text style={styles.statLabel}>Fatigue</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{log.focusLevel}/10</Text>
          <Text style={styles.statLabel}>Focus</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{moodEmojis[log.moodRating]}</Text>
          <Text style={styles.statLabel}>Mood</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.divider,
  },
});
