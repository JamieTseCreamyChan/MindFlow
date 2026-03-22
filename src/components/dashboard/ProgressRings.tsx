import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface ProgressRingsProps {
  screenTimeProgress: number; // 0-1 (vs 6h goal)
  moodAverage: number; // 1-5
  streakProgress: number; // 0-1 (vs 7-day goal)
}

export function ProgressRings({
  screenTimeProgress,
  moodAverage,
  streakProgress,
}: ProgressRingsProps) {
  const size = 180;
  const center = size / 2;
  const strokeWidth = 10;

  const rings = [
    {
      radius: 75,
      progress: Math.min(screenTimeProgress, 1),
      color: '#06B6D4',
      label: 'Screen',
    },
    {
      radius: 60,
      progress: Math.min(moodAverage / 5, 1),
      color: '#8B5CF6',
      label: 'Mood',
    },
    {
      radius: 45,
      progress: Math.min(streakProgress, 1),
      color: '#EC4899',
      label: 'Streak',
    },
  ];

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {rings.map((ring) => {
          const circumference = 2 * Math.PI * ring.radius;
          const strokeDashoffset = circumference * (1 - ring.progress);
          return (
            <React.Fragment key={ring.label}>
              <Circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
              />
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={styles.legend}>
        {rings.map((ring) => (
          <View key={ring.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: ring.color }]} />
            <Text style={styles.legendText}>{ring.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  legend: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
