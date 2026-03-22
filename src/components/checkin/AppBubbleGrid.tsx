import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { APP_CATEGORIES, AppCategory, AppUsageEntry, CATEGORY_COLORS } from '../../models/DailyLog';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface AppBubbleGridProps {
  entries: AppUsageEntry[];
  onChange: (entries: AppUsageEntry[]) => void;
}

const TIME_CHIPS = [
  { label: '15m', value: 15 },
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '2h', value: 120 },
  { label: '3h+', value: 180 },
];

export function AppBubbleGrid({ entries, onChange }: AppBubbleGridProps) {
  const [expandedCategory, setExpandedCategory] = useState<AppCategory | null>(null);

  const getEntryMinutes = (category: AppCategory): number => {
    const entry = entries.find((e) => e.category === category);
    return entry?.minutesUsed ?? 0;
  };

  const handleBubbleTap = (category: AppCategory) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleTimeSelect = (category: AppCategory, minutes: number) => {
    const catInfo = APP_CATEGORIES.find((c) => c.value === category)!;
    const existing = entries.findIndex((e) => e.category === category);
    const currentMinutes = getEntryMinutes(category);
    const newMinutes = currentMinutes === minutes ? 0 : minutes;

    if (newMinutes === 0) {
      onChange(entries.filter((e) => e.category !== category));
    } else if (existing >= 0) {
      onChange(
        entries.map((e, i) =>
          i === existing ? { ...e, minutesUsed: newMinutes } : e
        )
      );
    } else {
      onChange([
        ...entries,
        { appName: catInfo.label, category, minutesUsed: newMinutes },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What did you use?</Text>
      <Text style={styles.subtitle}>Tap a category, then pick how long</Text>

      <View style={styles.grid}>
        {APP_CATEGORIES.map((cat) => {
          const isExpanded = expandedCategory === cat.value;
          const minutes = getEntryMinutes(cat.value);
          const isActive = minutes > 0;
          const color = CATEGORY_COLORS[cat.value];

          return (
            <View key={cat.value} style={styles.bubbleContainer}>
              <TouchableOpacity
                onPress={() => handleBubbleTap(cat.value)}
                style={[
                  styles.bubble,
                  isActive && { borderColor: color, backgroundColor: color + '20' },
                  isExpanded && { borderColor: color, borderWidth: 2 },
                ]}
                activeOpacity={0.7}
              >
                <Text style={styles.bubbleIcon}>{cat.icon}</Text>
                <Text
                  style={[styles.bubbleLabel, isActive && { color: Colors.textPrimary }]}
                  numberOfLines={1}
                >
                  {cat.label}
                </Text>
                {isActive && (
                  <Text style={[styles.bubbleTime, { color }]}>
                    {minutes >= 60
                      ? `${Math.floor(minutes / 60)}h${minutes % 60 > 0 ? ` ${minutes % 60}m` : ''}`
                      : `${minutes}m`}
                  </Text>
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.timeChips}>
                  {TIME_CHIPS.map((chip) => (
                    <TouchableOpacity
                      key={chip.value}
                      onPress={() => handleTimeSelect(cat.value, chip.value)}
                      style={[
                        styles.timeChip,
                        minutes === chip.value && {
                          backgroundColor: color + '30',
                          borderColor: color,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeChipText,
                          minutes === chip.value && { color },
                        ]}
                      >
                        {chip.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
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
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  grid: {
    gap: Spacing.md,
  },
  bubbleContainer: {
    gap: Spacing.sm,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  bubbleIcon: {
    fontSize: 28,
  },
  bubbleLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    flex: 1,
  },
  bubbleTime: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  timeChips: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingLeft: Spacing.xxxl,
  },
  timeChip: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  timeChipText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});
