import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Card } from '../../src/components/ui/Card';
import { MONASH_SERVICES, getEmergencyServices, getNonEmergencyServices } from '../../src/constants/monashServices';
import { Colors, FontSize, Spacing, BorderRadius } from '../../src/constants/theme';

export default function CrisisScreen() {
  const emergency = getEmergencyServices();
  const support = getNonEmergencyServices();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>We Care About Your Well-being</Text>
          <Text style={styles.subtitle}>
            You are not alone. The following services are available to support
            you. Please reach out if you need help.
          </Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            ⚠️ This app does not provide clinical or medical advice. If you are
            in immediate danger, please call 000.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Emergency & Crisis Services</Text>
        {emergency.map((service) => (
          <Card key={service.id} style={styles.emergencyCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <View style={styles.serviceActions}>
              {service.phone && (
                <TouchableOpacity
                  style={styles.phoneBtn}
                  onPress={() => Linking.openURL(`tel:${service.phone}`)}
                >
                  <Text style={styles.phoneBtnText}>
                    Call {service.phone}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => Linking.openURL(service.url)}
              >
                <Text style={styles.linkText}>Visit Website →</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <Text style={styles.sectionTitle}>Monash Support Services</Text>
        {support.map((service) => (
          <Card key={service.id} style={styles.serviceCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <View style={styles.serviceActions}>
              {service.phone && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${service.phone}`)}
                >
                  <Text style={styles.linkText}>{service.phone}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => Linking.openURL(service.url)}
              >
                <Text style={styles.linkText}>Learn More →</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Remember: reaching out for support is a sign of strength, not
            weakness. These services are free and confidential for Monash
            students.
          </Text>
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
  header: {
    marginBottom: Spacing.xl,
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
  },
  disclaimerBox: {
    backgroundColor: Colors.warning + '15',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  disclaimerText: {
    fontSize: FontSize.sm,
    color: Colors.warningLight,
    lineHeight: 22,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  emergencyCard: {
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.danger,
  },
  serviceCard: {
    marginBottom: Spacing.md,
  },
  serviceName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  serviceDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  serviceActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    alignItems: 'center',
  },
  phoneBtn: {
    backgroundColor: Colors.danger,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  phoneBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  linkText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primaryLight,
  },
  footer: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
