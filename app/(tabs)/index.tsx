import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StreakCounter } from '../../src/components/dashboard/StreakCounter';
import { ProgressRings } from '../../src/components/dashboard/ProgressRings';
import { AchievementCarousel } from '../../src/components/dashboard/AchievementCarousel';
import { WeeklyStoryCard } from '../../src/components/dashboard/WeeklyStoryCard';
import { DailySummaryCard } from '../../src/components/dashboard/DailySummaryCard';
import { SuggestionBanner } from '../../src/components/dashboard/SuggestionBanner';
import { useDigitalLoad } from '../../src/hooks/useDigitalLoad';
import { useGamification } from '../../src/hooks/useGamification';
import { useSuggestions } from '../../src/hooks/useSuggestions';
import { Colors, Gradients, FontSize, Spacing, Shadows } from '../../src/constants/theme';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const router = useRouter();
  const { logs, getTodayLog, getRecentLogs } = useDigitalLoad();
  const { progress, unlockedAchievements } = useGamification();
  const { activeSuggestions, refresh, dismiss } = useSuggestions(logs);

  const todayLog = getTodayLog();
  const recentLogs = getRecentLogs(7);

  useEffect(() => {
    if (logs.length > 0) refresh();
  }, [logs.length]);

  const screenTimeGoalHours = 6;
  const todayScreenHours = todayLog ? todayLog.screenTimeMinutes / 60 : 0;
  const avgMood =
    recentLogs.length > 0
      ? recentLogs.reduce((s, l) => s + l.moodRating, 0) / recentLogs.length
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <LinearGradient
          colors={['rgba(124,58,237,0.3)', 'rgba(59,130,246,0.1)', 'transparent']}
          style={styles.hero}
        >
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>
            {todayLog
              ? "Here's your digital vibe today"
              : 'Ready to check in?'}
          </Text>
        </LinearGradient>

        {/* Streak */}
        <StreakCounter
          streak={progress.currentStreak}
          longestStreak={progress.longestStreak}
        />

        {/* Progress Rings */}
        <ProgressRings
          screenTimeProgress={
            screenTimeGoalHours > 0
              ? 1 - todayScreenHours / screenTimeGoalHours
              : 0
          }
          moodAverage={avgMood}
          streakProgress={progress.currentStreak / 7}
        />

        {/* Today Summary */}
        <DailySummaryCard log={todayLog} />

        {/* Weekly Story */}
        <WeeklyStoryCard logs={recentLogs} />

        {/* Achievements */}
        <AchievementCarousel achievements={unlockedAchievements} />

        {/* Suggestions */}
        {activeSuggestions.map((s) => (
          <SuggestionBanner key={s.id} suggestion={s} onDismiss={dismiss} />
        ))}
      </ScrollView>

      {/* Floating Check-in Button */}
      <TouchableOpacity
        style={[styles.floatingBtn, Shadows.glow]}
        onPress={() => router.push('/(tabs)/track')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[...Gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.floatingBtnGradient}
        >
          <Text style={styles.floatingBtnText}>✨ Check In</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  hero: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: -Spacing.lg,
    marginTop: -Spacing.lg,
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    borderRadius: 28,
  },
  floatingBtnGradient: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    borderRadius: 28,
  },
  floatingBtnText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
