import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { SliderInput } from '../../src/components/ui/SliderInput';
import { Card } from '../../src/components/ui/Card';
import { CrisisDetectionBanner } from '../../src/components/safety/CrisisDetectionBanner';
import { useDigitalLoad } from '../../src/hooks/useDigitalLoad';
import { useCrisisDetection } from '../../src/hooks/useCrisisDetection';
import { DailyLog, APP_CATEGORIES, AppCategory, AppUsageEntry } from '../../src/models/DailyLog';
import { Colors, FontSize, Spacing, BorderRadius } from '../../src/constants/theme';
import { v4 as uuid } from 'uuid';

export default function TrackScreen() {
  const router = useRouter();
  const { addLog, getTodayLog } = useDigitalLoad();
  const { crisisDetected, scanText } = useCrisisDetection();

  const today = new Date().toISOString().split('T')[0];
  const existingLog = getTodayLog();

  const [screenTime, setScreenTime] = useState(existingLog?.screenTimeMinutes ?? 120);
  const [fatigue, setFatigue] = useState(existingLog?.fatigueLevel ?? 5);
  const [focus, setFocus] = useState(existingLog?.focusLevel ?? 5);
  const [mood, setMood] = useState(existingLog?.moodRating ?? 3);
  const [notes, setNotes] = useState(existingLog?.notes ?? '');
  const [appBreakdown, setAppBreakdown] = useState<AppUsageEntry[]>(
    existingLog?.appBreakdown ?? [
      { appName: 'Social Media', category: 'social_media' as AppCategory, minutesUsed: 60 },
    ]
  );
  const [saving, setSaving] = useState(false);

  const moodEmojis = ['😔', '😕', '😐', '🙂', '😊'];

  const addAppEntry = () => {
    setAppBreakdown([
      ...appBreakdown,
      { appName: '', category: 'other' as AppCategory, minutesUsed: 30 },
    ]);
  };

  const updateAppEntry = (index: number, updates: Partial<AppUsageEntry>) => {
    setAppBreakdown(
      appBreakdown.map((entry, i) =>
        i === index ? { ...entry, ...updates } : entry
      )
    );
  };

  const removeAppEntry = (index: number) => {
    if (appBreakdown.length > 1) {
      setAppBreakdown(appBreakdown.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const log: DailyLog = {
      id: existingLog?.id ?? uuid(),
      date: today,
      screenTimeMinutes: screenTime,
      appBreakdown,
      fatigueLevel: fatigue,
      focusLevel: focus,
      moodRating: mood,
      notes,
      createdAt: existingLog?.createdAt ?? new Date().toISOString(),
    };
    await addLog(log);
    setSaving(false);
    Alert.alert('Saved', 'Your digital load entry has been saved.', [
      { text: 'OK', onPress: () => router.push('/(tabs)') },
    ]);
  };

  const handleNotesBlur = () => {
    scanText(notes);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.date}>{today}</Text>

        {crisisDetected && <CrisisDetectionBanner />}

        <Card style={styles.section}>
          <SliderInput
            label="Screen Time"
            value={screenTime}
            min={0}
            max={960}
            step={15}
            onChange={setScreenTime}
            formatValue={(v) => `${Math.floor(v / 60)}h ${v % 60}m`}
            lowLabel="0h"
            highLabel="16h"
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>App Breakdown</Text>
          {appBreakdown.map((entry, index) => (
            <View key={index} style={styles.appEntry}>
              <View style={styles.appEntryHeader}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryScroll}
                >
                  {APP_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.value}
                      onPress={() =>
                        updateAppEntry(index, {
                          category: cat.value,
                          appName: cat.label,
                        })
                      }
                      style={[
                        styles.categoryChip,
                        entry.category === cat.value &&
                          styles.categoryChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          entry.category === cat.value &&
                            styles.categoryChipTextActive,
                        ]}
                      >
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {appBreakdown.length > 1 && (
                  <TouchableOpacity onPress={() => removeAppEntry(index)}>
                    <Text style={styles.removeBtn}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
              <SliderInput
                label="Minutes"
                value={entry.minutesUsed}
                min={0}
                max={480}
                step={15}
                onChange={(v) => updateAppEntry(index, { minutesUsed: v })}
                formatValue={(v) => `${Math.floor(v / 60)}h ${v % 60}m`}
              />
            </View>
          ))}
          <Button
            title="+ Add Category"
            onPress={addAppEntry}
            variant="outline"
            size="sm"
          />
        </Card>

        <Card style={styles.section}>
          <SliderInput
            label="Digital Fatigue"
            value={fatigue}
            min={1}
            max={10}
            onChange={setFatigue}
            lowLabel="Low"
            highLabel="Exhausted"
          />

          <SliderInput
            label="Focus Level"
            value={focus}
            min={1}
            max={10}
            onChange={setFocus}
            lowLabel="Distracted"
            highLabel="Deep Focus"
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.moodRow}>
            {moodEmojis.map((emoji, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setMood(i + 1)}
                style={[
                  styles.moodOption,
                  mood === i + 1 && styles.moodSelected,
                ]}
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (optional)</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            onBlur={handleNotesBlur}
            placeholder="How was your digital day?"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={existingLog ? 'Update Entry' : 'Save Entry'}
          onPress={handleSave}
          size="lg"
          loading={saving}
          style={styles.button}
        />
      </View>
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
    paddingBottom: 120,
  },
  date: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  appEntry: {
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingBottom: Spacing.md,
  },
  appEntryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryScroll: {
    flex: 1,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary + '15',
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  removeBtn: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    fontWeight: '500',
    marginLeft: Spacing.sm,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodOption: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  moodEmoji: {
    fontSize: 28,
  },
  notesInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  button: {
    width: '100%',
  },
});
