import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { DailyLog } from '../../models/DailyLog';
import { format, parseISO } from 'date-fns';

interface WeeklyBarChartProps {
  logs: DailyLog[];
  title?: string;
  dataKey?: 'screenTimeMinutes' | 'fatigueLevel' | 'focusLevel';
}

export function WeeklyBarChart({
  logs,
  title = 'Screen Time (hours)',
  dataKey = 'screenTimeMinutes',
}: WeeklyBarChartProps) {
  const maxVal = Math.max(...logs.map((l) => l[dataKey]), 1);
  const isMinutes = dataKey === 'screenTimeMinutes';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chart}>
        {logs.map((log) => {
          const val = log[dataKey];
          const height = (val / maxVal) * 120;
          const displayVal = isMinutes
            ? (val / 60).toFixed(1) + 'h'
            : String(val);
          return (
            <View key={log.id} style={styles.barContainer}>
              <Text style={styles.barValue}>{displayVal}</Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(height, 4),
                    backgroundColor:
                      val / maxVal > 0.8
                        ? Colors.danger
                        : val / maxVal > 0.5
                        ? Colors.warning
                        : Colors.primary,
                  },
                ]}
              />
              <Text style={styles.barLabel}>
                {format(parseISO(log.date), 'EEE')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    paddingBottom: Spacing.xl,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 28,
    borderRadius: BorderRadius.sm,
    marginVertical: Spacing.xs,
  },
  barValue: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  barLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
