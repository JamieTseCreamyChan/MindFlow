import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { CRISIS_MESSAGE } from '../../constants/safetyKeywords';

interface CrisisDetectionBannerProps {
  onAcknowledge?: () => void;
}

export function CrisisDetectionBanner({ onAcknowledge }: CrisisDetectionBannerProps) {
  const router = useRouter();

  return (
    <View style={[styles.container, Shadows.md]}>
      <Text style={styles.title}>{CRISIS_MESSAGE.title}</Text>
      <Text style={styles.body}>{CRISIS_MESSAGE.body}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/crisis')}
      >
        <Text style={styles.buttonText}>View Support Resources</Text>
      </TouchableOpacity>
      <Text style={styles.disclaimer}>{CRISIS_MESSAGE.disclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.warningLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  body: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
