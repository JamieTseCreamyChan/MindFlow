import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline, Circle as SvgCircle, Line } from 'react-native-svg';
import { Colors, FontSize, Spacing } from '../../constants/theme';
import { DailyLog } from '../../models/DailyLog';

interface MonthlyTrendLineProps {
  logs: DailyLog[];
  title?: string;
  dataKey?: 'fatigueLevel' | 'focusLevel' | 'moodRating';
  maxValue?: number;
}

export function MonthlyTrendLine({
  logs,
  title = 'Fatigue Trend',
  dataKey = 'fatigueLevel',
  maxValue = 10,
}: MonthlyTrendLineProps) {
  const width = 320;
  const height = 120;
  const padding = 20;

  const sorted = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (sorted.length < 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.empty}>Need at least 2 entries for trends</Text>
      </View>
    );
  }

  const points = sorted.map((log, i) => {
    const x = padding + (i / (sorted.length - 1)) * (width - padding * 2);
    const y =
      padding +
      (1 - log[dataKey] / maxValue) * (height - padding * 2);
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const avg =
    sorted.reduce((s, l) => s + l[dataKey], 0) / sorted.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.avg}>Average: {avg.toFixed(1)}</Text>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((frac) => (
          <Line
            key={frac}
            x1={padding}
            y1={padding + frac * (height - padding * 2)}
            x2={width - padding}
            y2={padding + frac * (height - padding * 2)}
            stroke={Colors.divider}
            strokeWidth={1}
          />
        ))}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={Colors.primary}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <SvgCircle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={Colors.primary}
          />
        ))}
      </Svg>
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
  },
  avg: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  empty: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
  },
});
