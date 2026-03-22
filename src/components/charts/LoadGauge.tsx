import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface LoadGaugeProps {
  score: number; // 1-10
  size?: number;
}

export function LoadGauge({ score, size = 160 }: LoadGaugeProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / 10, 1);
  const strokeDashoffset = circumference * (1 - progress);

  const getColor = () => {
    if (score <= 3) return Colors.secondary;
    if (score <= 6) return Colors.warning;
    return Colors.danger;
  };

  const getLabel = () => {
    if (score <= 3) return 'Low';
    if (score <= 6) return 'Moderate';
    return 'High';
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[styles.center, { width: size, height: size }]}>
        <Text style={[styles.score, { color: getColor() }]}>
          {score.toFixed(1)}
        </Text>
        <Text style={styles.label}>{getLabel()}</Text>
        <Text style={styles.subtitle}>Digital Load</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
