import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LoadGauge } from '../../src/components/charts/LoadGauge';
import { DailySummaryCard } from '../../src/components/dashboard/DailySummaryCard';
import { SuggestionBanner } from '../../src/components/dashboard/SuggestionBanner';
import { Button } from '../../src/components/ui/Button';
import { useDigitalLoad } from '../../src/hooks/useDigitalLoad';
import { useSuggestions } from '../../src/hooks/useSuggestions';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';

export default function Dashboard() {
  const router = useRouter();
  const { logs, getTodayLog, computeLoadScore, getRecentLogs } =
    useDigitalLoad();
  const { activeSuggestions, refresh, dismiss } = useSuggestions(logs);

  const todayLog = getTodayLog();
  const loadScore = todayLog ? computeLoadScore(todayLog) : 0;
  const recentLogs = getRecentLogs(7);

  useEffect(() => {
    if (logs.length > 0) {
      refresh();
    }
  }, [logs.length]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>MindFlow</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-AU', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Text>
        </View>

        <View style={styles.gaugeContainer}>
          {todayLog ? (
            <LoadGauge score={loadScore} />
          ) : (
            <View style={styles.emptyGauge}>
              <Text style={styles.emptyGaugeText}>No data yet today</Text>
              <Button
                title="Log Your Digital Load"
                onPress={() => router.push('/(tabs)/track')}
                size="md"
                style={{ marginTop: Spacing.md }}
              />
            </View>
          )}
        </View>

        <DailySummaryCard log={todayLog} />

        {activeSuggestions.length > 0 && (
          <View style={styles.suggestionsSection}>
            <Text style={styles.sectionTitle}>Suggestions for You</Text>
            {activeSuggestions.map((suggestion) => (
              <SuggestionBanner
                key={suggestion.id}
                suggestion={suggestion}
                onDismiss={dismiss}
              />
            ))}
          </View>
        )}

        {recentLogs.length > 0 && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <View style={styles.weekStats}>
              <View style={styles.weekStat}>
                <Text style={styles.weekStatValue}>
                  {Math.round(
                    recentLogs.reduce((s, l) => s + l.screenTimeMinutes, 0) /
                      recentLogs.length /
                      60
                  )}h
                </Text>
                <Text style={styles.weekStatLabel}>Avg Screen Time</Text>
              </View>
              <View style={styles.weekStat}>
                <Text style={styles.weekStatValue}>
                  {(
                    recentLogs.reduce((s, l) => s + l.fatigueLevel, 0) /
                    recentLogs.length
                  ).toFixed(1)}
                </Text>
                <Text style={styles.weekStatLabel}>Avg Fatigue</Text>
              </View>
              <View style={styles.weekStat}>
                <Text style={styles.weekStatValue}>
                  {recentLogs.length}
                </Text>
                <Text style={styles.weekStatLabel}>Entries</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: Spacing.xxxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.primary,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  gaugeContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyGauge: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyGaugeText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
  suggestionsSection: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  statsSection: {
    marginTop: Spacing.xl,
  },
  weekStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  weekStat: {
    alignItems: 'center',
  },
  weekStatValue: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.primary,
  },
  weekStatLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
});
