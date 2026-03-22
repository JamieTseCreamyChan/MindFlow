import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyLog } from '../../models/DailyLog';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface HeatMapCalendarProps {
  logs: DailyLog[];
}

export function HeatMapCalendar({ logs }: HeatMapCalendarProps) {
  // Build a 4-week grid (28 days)
  const today = new Date();
  const days: { date: string; intensity: number }[] = [];

  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const log = logs.find((l) => l.date === dateStr);
    let intensity = 0;
    if (log) {
      // Composite intensity: screen time + fatigue
      const screenScore = Math.min(log.screenTimeMinutes / 480, 1);
      const fatigueScore = log.fatigueLevel / 10;
      intensity = (screenScore + fatigueScore) / 2;
    }
    days.push({ date: dateStr, intensity });
  }

  const getColor = (intensity: number) => {
    if (intensity === 0) return Colors.surface;
    if (intensity < 0.3) return '#06B6D4' + '40';
    if (intensity < 0.5) return '#06B6D4' + '80';
    if (intensity < 0.7) return '#F59E0B' + '80';
    return '#EF4444' + '80';
  };

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Map</Text>
      <View style={styles.dayLabels}>
        {weekDays.map((d, i) => (
          <Text key={i} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {days.map((day, i) => (
          <View
            key={day.date}
            style={[
              styles.cell,
              { backgroundColor: getColor(day.intensity) },
            ]}
          />
        ))}
      </View>
      <View style={styles.legend}>
        <Text style={styles.legendText}>Low</Text>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
          <View
            key={v}
            style={[styles.legendCell, { backgroundColor: getColor(v) }]}
          />
        ))}
        <Text style={styles.legendText}>High</Text>
      </View>
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
  dayLabels: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    borderRadius: 4,
    padding: 2,
    margin: 1,
    maxWidth: `${100 / 7 - 1}%`,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  legendCell: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  legendText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
