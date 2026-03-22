import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DailyLog } from '../../models/DailyLog';
import { Gradients, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface WrappedCardProps {
  logs: DailyLog[];
  previousLogs?: DailyLog[];
}

export function WrappedCard({ logs, previousLogs }: WrappedCardProps) {
  if (logs.length < 3) return null;

  const totalCheckins = logs.length;
  const avgScreenTime = Math.round(
    logs.reduce((s, l) => s + l.screenTimeMinutes, 0) / logs.length / 60
  );
  const avgMood = (
    logs.reduce((s, l) => s + l.moodRating, 0) / logs.length
  ).toFixed(1);

  let screenTimeChange = '';
  if (previousLogs && previousLogs.length > 0) {
    const prevAvg =
      previousLogs.reduce((s, l) => s + l.screenTimeMinutes, 0) /
      previousLogs.length /
      60;
    const diff = avgScreenTime - prevAvg;
    if (Math.abs(diff) >= 0.5) {
      screenTimeChange =
        diff < 0
          ? `${Math.abs(Math.round(diff))}h less than last period! 🎉`
          : `${Math.round(diff)}h more than last period`;
    }
  }

  return (
    <LinearGradient
      colors={[...Gradients.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>YOUR DIGITAL WRAPPED</Text>
      <Text style={styles.headline}>
        You checked in {totalCheckins} times
      </Text>
      <Text style={styles.stat}>
        Averaging {avgScreenTime}h screen time & {avgMood}/5 mood
      </Text>
      {screenTimeChange !== '' && (
        <Text style={styles.comparison}>{screenTimeChange}</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  headline: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  stat: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 24,
  },
  comparison: {
    fontSize: FontSize.sm,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
});
