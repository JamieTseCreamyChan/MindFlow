import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { ConsentToggle } from '../../src/components/ui/ConsentToggle';
import { useConsentContext } from '../../src/context/ConsentContext';
import { RETENTION_OPTIONS } from '../../src/models/ConsentRecord';
import { Colors, FontSize, Spacing, BorderRadius } from '../../src/constants/theme';

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Privacy Matters</Text>
        <Text style={styles.subtitle}>
          MindFlow is designed with your privacy in mind. Please review and
          accept the following to continue.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Handle Your Data</Text>
          <Text style={styles.body}>
            {'\u2022'} All your tracking data is stored locally on your device{'\n'}
            {'\u2022'} We never collect your name, email, or student ID{'\n'}
            {'\u2022'} You can delete all your data at any time{'\n'}
            {'\u2022'} This app does not provide clinical or medical advice{'\n'}
            {'\u2022'} Consent can be withdrawn at any time
          </Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Retention Period</Text>
          <Text style={styles.body}>
            Choose how long your data is kept. Older entries will be
            automatically deleted.
          </Text>
          <View style={styles.retentionOptions}>
            {RETENTION_OPTIONS.map((days) => (
              <View
                key={days}
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
                  onPress={() => setRetentionDays(days)}
                >
                  {days} days
                </Text>
              </View>
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  body: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  toggles: {
    marginBottom: Spacing.xl,
  },
  retentionOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
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
    backgroundColor: Colors.primary + '10',
  },
  retentionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  retentionTextSelected: {
    color: Colors.primary,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  button: {
    width: '100%',
  },
});
