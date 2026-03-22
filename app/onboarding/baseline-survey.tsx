import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { LikertScale } from '../../src/components/survey/LikertScale';
import { useSurvey } from '../../src/hooks/useSurvey';
import { BASELINE_QUESTIONS } from '../../src/constants/surveyQuestions';
import { SurveyAnswer } from '../../src/models/SurveyResponse';
import { setItem, STORAGE_KEYS } from '../../src/services/storage';
import { v4 as uuid } from 'uuid';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';

export default function BaselineSurvey() {
  const router = useRouter();
  const { submitSurvey } = useSurvey();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = answeredCount / BASELINE_QUESTIONS.length;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    const surveyAnswers: SurveyAnswer[] = Object.entries(answers).map(
      ([questionId, value]) => ({ questionId, value })
    );
    await submitSurvey('baseline', surveyAnswers);
    await finishOnboarding();
  };

  const handleSkip = async () => {
    setSaving(true);
    await finishOnboarding();
  };

  const finishOnboarding = async () => {
    // Generate anonymous ID
    await setItem(STORAGE_KEYS.ANONYMOUS_ID, uuid());
    await setItem(STORAGE_KEYS.ONBOARDED, true);
    setSaving(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Digital Belonging Survey</Text>
        <Text style={styles.subtitle}>
          Help us understand your digital well-being baseline. This takes about
          2 minutes. Your responses are stored locally.
        </Text>

        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
          <Text style={styles.progressText}>
            {answeredCount} of {BASELINE_QUESTIONS.length} answered
          </Text>
        </View>

        {BASELINE_QUESTIONS.map((q) => (
          <LikertScale
            key={q.id}
            questionId={q.id}
            questionText={q.text}
            value={answers[q.id] ?? null}
            onChange={handleAnswer}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Submit Survey"
          onPress={handleSubmit}
          size="lg"
          loading={saving}
          disabled={answeredCount === 0}
          style={styles.button}
        />
        <Button
          title="Skip for Now"
          onPress={handleSkip}
          variant="ghost"
          size="md"
          style={styles.skipButton}
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
    padding: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  progressContainer: {
    marginBottom: Spacing.xl,
  },
  progressText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  button: {
    width: '100%',
  },
  skipButton: {
    width: '100%',
    marginTop: Spacing.sm,
  },
});
