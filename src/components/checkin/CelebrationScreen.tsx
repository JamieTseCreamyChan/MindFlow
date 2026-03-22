import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../ui/Card';
import { Achievement } from '../../models/Gamification';
import { Colors, Gradients, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface CelebrationScreenProps {
  xpEarned: number;
  streak: number;
  level: number;
  newAchievements: Achievement[];
}

export function CelebrationScreen({
  xpEarned,
  streak,
  level,
  newAchievements,
}: CelebrationScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.checkmark}>✅</Text>
      <Text style={styles.title}>Check-in complete!</Text>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>+{xpEarned}</Text>
          <Text style={styles.statLabel}>XP earned</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>day streak</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>Lv.{level}</Text>
          <Text style={styles.statLabel}>level</Text>
        </Card>
      </View>

      {newAchievements.length > 0 && (
        <View style={styles.achievementsSection}>
          <Text style={styles.achievementsTitle}>New achievements!</Text>
          {newAchievements.map((a) => (
            <LinearGradient
              key={a.id}
              colors={[...Gradients.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.achievementCard}
            >
              <Text style={styles.achievementIcon}>{a.icon}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>{a.title}</Text>
                <Text style={styles.achievementDesc}>{a.description}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  checkmark: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  streakEmoji: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  achievementsSection: {
    width: '100%',
  },
  achievementsTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  achievementIcon: {
    fontSize: 32,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  achievementDesc: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Spacing.xs,
  },
});
