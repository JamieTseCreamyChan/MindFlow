import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { LIKERT_LABELS } from '../../constants/surveyQuestions';

interface LikertScaleProps {
  questionId: string;
  questionText: string;
  value: number | null;
  onChange: (questionId: string, value: number) => void;
}

export function LikertScale({
  questionId,
  questionText,
  value,
  onChange,
}: LikertScaleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questionText}</Text>
      <View style={styles.options}>
        {[1, 2, 3, 4, 5].map((v) => (
          <TouchableOpacity
            key={v}
            onPress={() => onChange(questionId, v)}
            style={[
              styles.option,
              value === v && styles.optionSelected,
            ]}
          >
            <Text
              style={[
                styles.optionNumber,
                value === v && styles.optionNumberSelected,
              ]}
            >
              {v}
            </Text>
            <Text
              style={[
                styles.optionLabel,
                value === v && styles.optionLabelSelected,
              ]}
              numberOfLines={2}
            >
              {LIKERT_LABELS[v - 1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  question: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionSelected: {
    backgroundColor: Colors.primary + '15',
    borderColor: Colors.primary,
  },
  optionNumber: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  optionNumberSelected: {
    color: Colors.primary,
  },
  optionLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  optionLabelSelected: {
    color: Colors.primary,
  },
});
