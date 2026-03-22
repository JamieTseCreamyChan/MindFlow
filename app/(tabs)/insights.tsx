import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { WeeklyBarChart } from '../../src/components/charts/WeeklyBarChart';
import { MonthlyTrendLine } from '../../src/components/charts/MonthlyTrendLine';
import { HeatMapCalendar } from '../../src/components/insights/HeatMapCalendar';
import { WrappedCard } from '../../src/components/insights/WrappedCard';
import { useDigitalLoad } from '../../src/hooks/useDigitalLoad';
import { useSurvey } from '../../src/hooks/useSurvey';
import { useConsentContext } from '../../src/context/ConsentContext';
import { generateReport } from '../../src/services/aggregator';
import { CATEGORY_COLORS, AppCategory } from '../../src/models/DailyLog';
import { Colors, FontSize, Spacing, BorderRadius } from '../../src/constants/theme';

type TimeRange = 'week' | 'month';

export default function InsightsScreen() {
  const { logs, getRecentLogs } = useDigitalLoad();
  const { surveys } = useSurvey();
  const { consent } = useConsentContext();
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [exporting, setExporting] = useState(false);

  const days = timeRange === 'week' ? 7 : 30;
  const recentLogs = getRecentLogs(days);
  const previousLogs = getRecentLogs(days * 2).slice(days);

  const categoryTotals: Record<string, number> = {};
  for (const log of recentLogs) {
    for (const entry of log.appBreakdown) {
      categoryTotals[entry.category] =
        (categoryTotals[entry.category] || 0) + entry.minutesUsed;
    }
  }
  const totalCategoryTime = Object.values(categoryTotals).reduce(
    (s, v) => s + v,
    0
  );

  const handleExport = async () => {
    if (!consent?.anonymizedReporting) {
      Alert.alert(
        'Reporting Not Enabled',
        'Enable anonymized reporting in Settings to export reports.'
      );
      return;
    }
    setExporting(true);
    const report = await generateReport(recentLogs, surveys);
    setExporting(false);
    if (report) {
      await Share.share({
        message: JSON.stringify(report, null, 2),
        title: 'MindFlow Aggregated Report',
      });
    }
  };

  if (recentLogs.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyTitle}>No Insights Yet</Text>
          <Text style={styles.emptyText}>
            Start checking in to see your digital story unfold here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Your Digital Story</Text>

        {/* Time Range Toggle */}
        <View style={styles.toggleRow}>
          {(['week', 'month'] as TimeRange[]).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setTimeRange(range)}
              style={[
                styles.toggleBtn,
                timeRange === range && styles.toggleBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  timeRange === range && styles.toggleTextActive,
                ]}
              >
                {range === 'week' ? 'Weekly' : 'Monthly'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wrapped Card */}
        <WrappedCard logs={recentLogs} previousLogs={previousLogs} />

        {/* Heat Map */}
        <Card style={styles.chartCard}>
          <HeatMapCalendar logs={logs} />
        </Card>

        {/* Screen Time Chart */}
        <Card style={styles.chartCard}>
          <WeeklyBarChart
            logs={recentLogs.slice(0, 7)}
            title="Screen Time"
            dataKey="screenTimeMinutes"
          />
        </Card>

        {/* Trends */}
        <Card style={styles.chartCard}>
          <MonthlyTrendLine
            logs={recentLogs}
            title="Fatigue Trend"
            dataKey="fatigueLevel"
            maxValue={10}
          />
        </Card>

        <Card style={styles.chartCard}>
          <MonthlyTrendLine
            logs={recentLogs}
            title="Focus Trend"
            dataKey="focusLevel"
            maxValue={10}
          />
        </Card>

        {/* Categories */}
        {totalCategoryTime > 0 && (
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Categories</Text>
            {Object.entries(categoryTotals)
              .sort(([, a], [, b]) => b - a)
              .map(([category, minutes]) => {
                const pct = Math.round((minutes / totalCategoryTime) * 100);
                return (
                  <View key={category} style={styles.categoryRow}>
                    <View style={styles.categoryInfo}>
                      <View
                        style={[
                          styles.categoryDot,
                          {
                            backgroundColor:
                              CATEGORY_COLORS[category as AppCategory] ||
                              Colors.textMuted,
                          },
                        ]}
                      />
                      <Text style={styles.categoryName}>
                        {category.replace('_', ' ')}
                      </Text>
                    </View>
                    <View style={styles.categoryBar}>
                      <View
                        style={[
                          styles.categoryBarFill,
                          {
                            width: `${pct}%`,
                            backgroundColor:
                              CATEGORY_COLORS[category as AppCategory] ||
                              Colors.textMuted,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.categoryPct}>{pct}%</Text>
                  </View>
                );
              })}
          </Card>
        )}

        {/* Summary */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {Math.round(
                  recentLogs.reduce((s, l) => s + l.screenTimeMinutes, 0) /
                    recentLogs.length /
                    60
                )}h
              </Text>
              <Text style={styles.summaryLabel}>Avg Screen Time</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {(
                  recentLogs.reduce((s, l) => s + l.fatigueLevel, 0) /
                  recentLogs.length
                ).toFixed(1)}
              </Text>
              <Text style={styles.summaryLabel}>Avg Fatigue</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {(
                  recentLogs.reduce((s, l) => s + l.focusLevel, 0) /
                  recentLogs.length
                ).toFixed(1)}
              </Text>
              <Text style={styles.summaryLabel}>Avg Focus</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{recentLogs.length}</Text>
              <Text style={styles.summaryLabel}>Check-ins</Text>
            </View>
          </View>
        </Card>

        {consent?.anonymizedReporting && (
          <Button
            title="Export Anonymized Report"
            onPress={handleExport}
            variant="outline"
            loading={exporting}
            style={styles.exportBtn}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  pageTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  emptyIcon: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: Colors.primary },
  toggleText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  toggleTextActive: { color: '#FFFFFF' },
  chartCard: { marginBottom: Spacing.lg },
  chartTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryInfo: { flexDirection: 'row', alignItems: 'center', width: 120 },
  categoryDot: { width: 10, height: 10, borderRadius: 5, marginRight: Spacing.sm },
  categoryName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  categoryBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    marginHorizontal: Spacing.sm,
    overflow: 'hidden',
  },
  categoryBarFill: { height: 8, borderRadius: 4 },
  categoryPct: {
    width: 40,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'right',
    fontWeight: '600',
  },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  summaryItem: { width: '50%', paddingVertical: Spacing.md, alignItems: 'center' },
  summaryValue: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.primaryLight },
  summaryLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  exportBtn: { marginBottom: Spacing.xl },
});
