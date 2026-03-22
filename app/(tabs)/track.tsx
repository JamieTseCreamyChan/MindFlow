import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { CheckinProgress } from '../../src/components/checkin/CheckinProgress';
import { MoodPicker } from '../../src/components/checkin/MoodPicker';
import { ScreenTimeWheel } from '../../src/components/checkin/ScreenTimeWheel';
import { AppBubbleGrid } from '../../src/components/checkin/AppBubbleGrid';
import { FocusFatigueStep } from '../../src/components/checkin/FocusFatigueStep';
import { MicroJournal } from '../../src/components/checkin/MicroJournal';
import { CelebrationScreen } from '../../src/components/checkin/CelebrationScreen';
import { CrisisDetectionBanner } from '../../src/components/safety/CrisisDetectionBanner';
import { useDigitalLoad } from '../../src/hooks/useDigitalLoad';
import { useGamification } from '../../src/hooks/useGamification';
import { useCrisisDetection } from '../../src/hooks/useCrisisDetection';
import { DailyLog, AppUsageEntry } from '../../src/models/DailyLog';
import { Achievement } from '../../src/models/Gamification';
import { getPromptForDate } from '../../src/constants/journalPrompts';
import { Colors, Spacing } from '../../src/constants/theme';
import { v4 as uuid } from 'uuid';

const TOTAL_STEPS = 6;

export default function TrackScreen() {
  const router = useRouter();
  const { addLog, getTodayLog, logs } = useDigitalLoad();
  const { recordCheckin } = useGamification();
  const { crisisDetected, scanText } = useCrisisDetection();

  const today = new Date().toISOString().split('T')[0];
  const existingLog = getTodayLog();
  const prompt = getPromptForDate(today);

  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(existingLog?.moodRating ?? 0);
  const [hours, setHours] = useState(
    existingLog ? Math.floor(existingLog.screenTimeMinutes / 60) : 3
  );
  const [minutes, setMinutes] = useState(
    existingLog ? (existingLog.screenTimeMinutes % 60) : 0
  );
  const [appBreakdown, setAppBreakdown] = useState<AppUsageEntry[]>(
    existingLog?.appBreakdown ?? []
  );
  const [focus, setFocus] = useState(existingLog?.focusLevel ?? 6);
  const [fatigue, setFatigue] = useState(existingLog?.fatigueLevel ?? 4);
  const [journalEntry, setJournalEntry] = useState(existingLog?.journalEntry ?? '');
  const [saving, setSaving] = useState(false);

  // Celebration state
  const [celebrationData, setCelebrationData] = useState<{
    xpEarned: number;
    streak: number;
    level: number;
    newAchievements: Achievement[];
  } | null>(null);

  const handleMoodSelect = (value: number) => {
    setMood(value);
    setTimeout(() => setStep(1), 400);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSave = async () => {
    setSaving(true);
    const log: DailyLog = {
      id: existingLog?.id ?? uuid(),
      date: today,
      screenTimeMinutes: hours * 60 + minutes,
      appBreakdown,
      fatigueLevel: fatigue,
      focusLevel: focus,
      moodRating: mood || 3,
      notes: journalEntry,
      createdAt: existingLog?.createdAt ?? new Date().toISOString(),
      journalPrompt: prompt,
      journalEntry,
      checkinMethod: 'quick',
    };
    await addLog(log);

    const allLogs = [...logs.filter((l) => l.id !== log.id), log];
    const result = await recordCheckin(log, allLogs);

    setCelebrationData({
      xpEarned: result.xpEarned,
      streak: result.newStreak,
      level: result.newLevel,
      newAchievements: result.newlyUnlocked,
    });
    setSaving(false);
    setStep(TOTAL_STEPS - 1);
  };

  const handleJournalBlur = () => {
    scanText(journalEntry);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <MoodPicker value={mood} onChange={handleMoodSelect} />;
      case 1:
        return (
          <ScreenTimeWheel
            hours={hours}
            minutes={minutes}
            onChangeHours={setHours}
            onChangeMinutes={setMinutes}
          />
        );
      case 2:
        return (
          <AppBubbleGrid entries={appBreakdown} onChange={setAppBreakdown} />
        );
      case 3:
        return (
          <FocusFatigueStep
            focusLevel={focus}
            fatigueLevel={fatigue}
            onFocusChange={setFocus}
            onFatigueChange={setFatigue}
          />
        );
      case 4:
        return (
          <MicroJournal
            prompt={prompt}
            entry={journalEntry}
            onChangeEntry={setJournalEntry}
            onBlur={handleJournalBlur}
          />
        );
      case 5:
        if (celebrationData) {
          return (
            <CelebrationScreen
              xpEarned={celebrationData.xpEarned}
              streak={celebrationData.streak}
              level={celebrationData.level}
              newAchievements={celebrationData.newAchievements}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  const isCelebration = step === TOTAL_STEPS - 1 && celebrationData;

  return (
    <SafeAreaView style={styles.container}>
      {!isCelebration && (
        <CheckinProgress totalSteps={TOTAL_STEPS} currentStep={step} />
      )}

      {crisisDetected && <CrisisDetectionBanner />}

      <View style={styles.content}>{renderStep()}</View>

      {!isCelebration && step > 0 && (
        <View style={styles.footer}>
          <Button
            title="Back"
            onPress={handleBack}
            variant="ghost"
            size="md"
            style={styles.backBtn}
          />
          {step < TOTAL_STEPS - 2 ? (
            <Button
              title={step === 4 ? 'Skip' : 'Next'}
              onPress={handleNext}
              variant="gradient"
              size="md"
              style={styles.nextBtn}
            />
          ) : step === TOTAL_STEPS - 2 ? (
            <Button
              title="Save Check-in"
              onPress={handleSave}
              variant="gradient"
              size="md"
              loading={saving}
              style={styles.nextBtn}
            />
          ) : null}
          {step === 4 && (
            <Button
              title="Save Check-in"
              onPress={handleSave}
              variant="gradient"
              size="md"
              loading={saving}
              style={styles.nextBtn}
            />
          )}
        </View>
      )}

      {isCelebration && (
        <View style={styles.footer}>
          <Button
            title="Done"
            onPress={() => router.push('/(tabs)')}
            variant="gradient"
            size="lg"
            style={styles.doneBtn}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  backBtn: {
    flex: 1,
  },
  nextBtn: {
    flex: 2,
  },
  doneBtn: {
    flex: 1,
  },
});
