import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Colors, Gradients, FontSize, Spacing, BorderRadius } from '../../src/constants/theme';

export default function Welcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[...Gradients.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧠</Text>
          </View>
          <Text style={styles.title}>MindFlow</Text>
          <Text style={styles.subtitle}>Your Digital Well-being Companion</Text>
          <Text style={styles.description}>
            Track your screen habits, understand your digital load, and discover
            support designed for Monash students.
          </Text>
          <View style={styles.pillContainer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>🔒 Data stays on your device</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>🧘 Non-clinical support</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>🌍 SDG 3 aligned</Text>
            </View>
          </View>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(124,58,237,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 52,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.primaryLight,
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
    gap: Spacing.sm,
    alignItems: 'center',
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  pillText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  button: {
    width: '100%',
  },
});
