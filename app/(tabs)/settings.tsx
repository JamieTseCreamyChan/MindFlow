import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { ConsentToggle } from '../../src/components/ui/ConsentToggle';
import { useConsentContext } from '../../src/context/ConsentContext';
import { useDigitalLoad } from '../../src/hooks/useDigitalLoad';
import { RETENTION_OPTIONS } from '../../src/models/ConsentRecord';
import { clearAll, STORAGE_KEYS, setItem } from '../../src/services/storage';
import { Colors, FontSize, Spacing, BorderRadius } from '../../src/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { consent, updateConsent, withdrawConsent, hasValidConsent } =
    useConsentContext();
  const { logs } = useDigitalLoad();
  const [deleting, setDeleting] = useState(false);

  const handleToggleReporting = async (value: boolean) => {
    await updateConsent({ anonymizedReporting: value });
  };

  const handleRetentionChange = async (days: number) => {
    await updateConsent({ retentionDays: days });
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your tracking data, surveys, and consent records. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            await clearAll();
            setDeleting(false);
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleWithdrawConsent = () => {
    Alert.alert(
      'Withdraw Consent',
      'This will delete all your data and return you to the welcome screen. You can re-consent at any time.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw & Delete',
          style: 'destructive',
          onPress: async () => {
            await withdrawConsent();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Consent Management</Text>
          {consent && (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Consented On</Text>
                <Text style={styles.infoValue}>
                  {new Date(consent.consentedAt).toLocaleDateString('en-AU')}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Policy Version</Text>
                <Text style={styles.infoValue}>{consent.version}</Text>
              </View>
              <ConsentToggle
                label="Local Data Collection"
                description="Required for app functionality. All data stays on your device."
                value={consent.dataCollection}
                onValueChange={() => {}}
                required
              />
              <ConsentToggle
                label="Anonymized Reporting"
                description="Include your anonymized data in aggregated program evaluation reports."
                value={consent.anonymizedReporting}
                onValueChange={handleToggleReporting}
              />
            </>
          )}
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Data Retention</Text>
          <Text style={styles.description}>
            Entries older than your retention period are automatically deleted.
          </Text>
          <View style={styles.retentionOptions}>
            {RETENTION_OPTIONS.map((days) => (
              <TouchableOpacity
                key={days}
                onPress={() => handleRetentionChange(days)}
                style={[
                  styles.retentionOption,
                  consent?.retentionDays === days &&
                    styles.retentionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.retentionText,
                    consent?.retentionDays === days &&
                      styles.retentionTextSelected,
                  ]}
                >
                  {days} days
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Entries</Text>
            <Text style={styles.infoValue}>{logs.length}</Text>
          </View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/onboarding/baseline-survey')}
          >
            <Text style={styles.menuItemText}>Retake Baseline Survey</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Support Resources</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/crisis')}
          >
            <Text style={styles.menuItemText}>View Support Services</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              Linking.openURL('https://www.monash.edu/students/support/wellbeing')
            }
          >
            <Text style={styles.menuItemText}>Monash Wellbeing</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About MindFlow</Text>
          <Text style={styles.description}>
            MindFlow is a non-clinical digital well-being tool developed as part
            of Monash University's commitment to UN SDG 3: Good Health and
            Well-being. This app supports student self-tracking of digital load
            and provides rules-based suggestions linked to Monash support
            services.
          </Text>
          <Text style={styles.disclaimer}>
            This app does not provide clinical or medical advice.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </Card>

        <View style={styles.dangerZone}>
          <Button
            title="Withdraw Consent"
            onPress={handleWithdrawConsent}
            variant="outline"
            style={styles.dangerBtn}
          />
          <Button
            title="Delete All My Data"
            onPress={handleDeleteAll}
            variant="danger"
            loading={deleting}
            style={styles.dangerBtn}
          />
        </View>
      </ScrollView>
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
    paddingBottom: Spacing.xxxl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  retentionOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  retentionOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  retentionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  retentionText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  retentionTextSelected: {
    color: Colors.primary,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuItemText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
  disclaimer: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  version: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  dangerZone: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  dangerBtn: {
    width: '100%',
  },
});
