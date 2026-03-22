import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🧠</Text>
        </View>
        <Text style={styles.title}>MindFlow</Text>
        <Text style={styles.subtitle}>Digital Load Tracker</Text>
        <Text style={styles.description}>
          Track your digital well-being, understand your screen habits, and
          discover support services designed for Monash students.
        </Text>
        <View style={styles.pillContainer}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Non-clinical support</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Your data stays on device</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>SDG 3 aligned</Text>
          </View>
        </View>
        <Text style={styles.sdg}>
          Supporting UN SDG 3: Good Health and Well-being
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/onboarding/consent')}
          size="lg"
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  pill: {
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  pillText: {
    fontSize: FontSize.sm,
    color: Colors.secondary,
    fontWeight: '600',
  },
  sdg: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  button: {
    width: '100%',
  },
});
