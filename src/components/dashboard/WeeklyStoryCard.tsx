import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DailyLog } from '../../models/DailyLog';
import { Colors, Gradients, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface WeeklyStoryCardProps {
  logs: DailyLog[];
}

export function WeeklyStoryCard({ logs }: WeeklyStoryCardProps) {
  if (logs.length === 0) return null;

  const avgScreenTime = Math.round(
    logs.reduce((s, l) => s + l.screenTimeMinutes, 0) / logs.length / 60
  );
  const avgMood =
    logs.reduce((s, l) => s + l.moodRating, 0) / logs.length;
  const moodTrend = avgMood >= 3.5 ? '↗️' : avgMood >= 2.5 ? '→' : '↘️';
  const moodEmojis = ['', '😔', '😕', '😐', '🙂', '😊'];
  const avgMoodEmoji = moodEmojis[Math.round(avgMood)] || '😐';

  return (
    <LinearGradient
      colors={[...Gradients.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>THIS WEEK</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{avgScreenTime}h</Text>
          <Text style={styles.statLabel}>avg screen time</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {avgMoodEmoji} {moodTrend}
          </Text>
          <Text style={styles.statLabel}>mood trend</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{logs.length}</Text>
          <Text style={styles.statLabel}>check-ins</Text>
        </View>
      </View>
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
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xs,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
