import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../ui/Card';
import { Achievement } from '../../models/Gamification';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface AchievementCarouselProps {
  achievements: Achievement[];
}

export function AchievementCarousel({ achievements }: AchievementCarouselProps) {
  if (achievements.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {achievements.map((a) => (
          <View key={a.id} style={styles.badge}>
            <Text style={styles.badgeIcon}>{a.icon}</Text>
            <Text style={styles.badgeTitle} numberOfLines={1}>
              {a.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  scroll: {
    gap: Spacing.md,
  },
  badge: {
    width: 80,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  badgeTitle: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
