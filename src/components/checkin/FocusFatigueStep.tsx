import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface FocusFatigueStepProps {
  focusLevel: number;
  fatigueLevel: number;
  onFocusChange: (v: number) => void;
  onFatigueChange: (v: number) => void;
}

const FOCUS_OPTIONS = [
  { emoji: '🌫️', label: 'Foggy', value: 2 },
  { emoji: '😵‍💫', label: 'Scattered', value: 4 },
  { emoji: '😐', label: 'Okay', value: 6 },
  { emoji: '🎯', label: 'Focused', value: 8 },
  { emoji: '🧠', label: 'Laser', value: 10 },
];

const FATIGUE_OPTIONS = [
  { emoji: '⚡', label: 'Energized', value: 2 },
  { emoji: '🙂', label: 'Fine', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 6 },
  { emoji: '😴', label: 'Tired', value: 8 },
  { emoji: '🪫', label: 'Drained', value: 10 },
];

function EmojiScale({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: typeof FOCUS_OPTIONS;
  value: number;
  onChange: (v: number) => void;
}) {
  // Find the closest option to the current value
  const closest = options.reduce((prev, curr) =>
    Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
  );

  return (
    <View style={styles.scaleContainer}>
      <Text style={styles.scaleTitle}>{title}</Text>
      <View style={styles.scaleRow}>
        {options.map((opt) => {
          const isSelected = closest.value === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[styles.scaleOption, isSelected && styles.scaleSelected]}
              activeOpacity={0.7}
            >
              <Text style={[styles.scaleEmoji, isSelected && styles.scaleEmojiSelected]}>
                {opt.emoji}
              </Text>
              <Text style={[styles.scaleLabel, isSelected && styles.scaleLabelSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export function FocusFatigueStep({
  focusLevel,
  fatigueLevel,
  onFocusChange,
  onFatigueChange,
}: FocusFatigueStepProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your energy today</Text>

      <EmojiScale
        title="Focus Level"
        options={FOCUS_OPTIONS}
        value={focusLevel}
        onChange={onFocusChange}
      />

      <EmojiScale
        title="Digital Fatigue"
        options={FATIGUE_OPTIONS}
        value={fatigueLevel}
        onChange={onFatigueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  scaleContainer: {
    marginBottom: Spacing.xxl,
  },
  scaleTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  scaleRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  scaleOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  scaleSelected: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primary + '20',
  },
  scaleEmoji: {
    fontSize: 24,
  },
  scaleEmojiSelected: {
    fontSize: 28,
  },
  scaleLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  scaleLabelSelected: {
    color: Colors.primaryLight,
    fontWeight: '600',
  },
});
