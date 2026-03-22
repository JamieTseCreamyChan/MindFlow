import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface MoodPickerProps {
  value: number | null;
  onChange: (value: number) => void;
}

const MOODS = [
  { emoji: '😔', label: 'Awful', value: 1 },
  { emoji: '😕', label: 'Meh', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😊', label: 'Great', value: 5 },
];

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <Text style={styles.subtitle}>Tap to select your mood</Text>
      <View style={styles.moodRow}>
        {MOODS.map((mood) => {
          const isSelected = value === mood.value;
          return (
            <TouchableOpacity
              key={mood.value}
              onPress={() => onChange(mood.value)}
              style={[styles.moodButton, isSelected && styles.moodSelected]}
              activeOpacity={0.7}
            >
              <Text style={[styles.emoji, isSelected && styles.emojiSelected]}>
                {mood.emoji}
              </Text>
              <Text
                style={[styles.moodLabel, isSelected && styles.labelSelected]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginBottom: Spacing.xxxl,
    textAlign: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  moodButton: {
    width: 64,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodSelected: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primary + '20',
    transform: [{ scale: 1.15 }],
  },
  emoji: {
    fontSize: 32,
  },
  emojiSelected: {
    fontSize: 36,
  },
  moodLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  labelSelected: {
    color: Colors.primaryLight,
    fontWeight: '600',
  },
});
