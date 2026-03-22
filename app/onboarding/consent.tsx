import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { ConsentToggle } from '../../src/components/ui/ConsentToggle';
import { useConsentContext } from '../../src/context/ConsentContext';
import { RETENTION_OPTIONS } from '../../src/models/ConsentRecord';
import { Colors, Gradients, FontSize, Spacing, BorderRadius, Glass } from '../../src/constants/theme';

export default function ConsentScreen() {
  const router = useRouter();
  const { grantConsent } = useConsentContext();

  const [dataCollection, setDataCollection] = useState(true);
  const [anonymizedReporting, setAnonymizedReporting] = useState(false);
  const [retentionDays, setRetentionDays] = useState(90);
  const [saving, setSaving] = useState(false);

  const handleAccept = async () => {
    if (!dataCollection) {
      Alert.alert(
        'Data Collection Required',
        'You must enable data collection to use MindFlow. Your data stays on your device.'
      );
      return;
    }
    setSaving(true);
    await grantConsent({ dataCollection, anonymizedReporting, retentionDays });
    setSaving(false);
    router.push('/onboarding/baseline-survey');
  };

  return (
    <LinearGradient colors={[...Gradients.dark]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Your Privacy Matters 🔐</Text>
          <Text style={styles.subtitle}>
            MindFlow is designed with your privacy in mind. Review and accept
            the following to continue.
          </Text>

          <View style={styles.glassCard}>
            <Text style={styles.sectionTitle}>How We Handle Your Data</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bullet}>📱 All data stored locally on your device</Text>
              <Text style={styles.bullet}>🙈 We never collect your name, email, or ID</Text>
              <Text style={styles.bullet}>🗑️ Delete all your data at any time</Text>
              <Text style={styles.bullet}>⚕️ Not clinical or medical advice</Text>
              <Text style={styles.bullet}>↩️ Consent can be withdrawn anytime</Text>
            </View>
          </View>

          <View style={styles.toggles}>
            <ConsentToggle
              label="Local Data Collection"
              description="Allow MindFlow to store your digital load entries on your device. Required to use the app."
              value={dataCollection}
              onValueChange={setDataCollection}
              required
            />
            <ConsentToggle
              label="Anonymized Reporting"
              description="Allow your anonymized data to be included in aggregated program evaluation reports. No personal information is ever shared."
              value={anonymizedReporting}
              onValueChange={setAnonymizedReporting}
            />
          </View>

          <View style={styles.glassCard}>
            <Text style={styles.sectionTitle}>Data Retention Period</Text>
            <Text style={styles.body}>
              Choose how long your data is kept. Older entries are automatically
              deleted.
            </Text>
            <View style={styles.retentionOptions}>
              {RETENTION_OPTIONS.map((days) => (
                <TouchableOpacity
                  key={days}
                  onPress={() => setRetentionDays(days)}
                  style={[
                    styles.retentionOption,
                    retentionDays === days && styles.retentionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.retentionText,
                      retentionDays === days && styles.retentionTextSelected,
                    ]}
                  >
                    {days} days
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="I Understand & Agree"
            onPress={handleAccept}
            size="lg"
            loading={saving}
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
  scroll: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxxl,
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
  glassCard: {
    ...Glass,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  bulletList: {
    gap: Spacing.sm,
  },
  bullet: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  body: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  toggles: {
    marginBottom: Spacing.xl,
  },
  retentionOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  retentionOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  retentionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  retentionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  retentionTextSelected: {
    color: Colors.primaryLight,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
