import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';

interface MicroJournalProps {
  prompt: string;
  entry: string;
  onChangeEntry: (text: string) => void;
  onBlur: () => void;
}

export function MicroJournal({ prompt, entry, onChangeEntry, onBlur }: MicroJournalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick reflection</Text>

      <Card style={styles.promptCard}>
        <Text style={styles.promptLabel}>Today's prompt</Text>
        <Text style={styles.promptText}>"{prompt}"</Text>
      </Card>

      <TextInput
        style={styles.input}
        value={entry}
        onChangeText={onChangeEntry}
        onBlur={onBlur}
        placeholder="Write your thoughts... (optional)"
        placeholderTextColor={Colors.textMuted}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
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
    marginBottom: Spacing.xl,
  },
  promptCard: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  promptLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  promptText: {
    fontSize: FontSize.lg,
    color: Colors.primaryLight,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 28,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    minHeight: 140,
    borderWidth: 1,
    borderColor: Colors.border,
    lineHeight: 24,
  },
});
