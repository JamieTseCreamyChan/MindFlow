import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Card } from '../ui/Card';
import { Colors, FontSize, Spacing, BorderRadius } from '../../constants/theme';
import { Suggestion } from '../../models/Suggestion';

interface SuggestionBannerProps {
  suggestion: Suggestion;
  onDismiss: (id: string) => void;
}

export function SuggestionBanner({ suggestion, onDismiss }: SuggestionBannerProps) {
  const priorityColors = {
    low: Colors.secondary,
    medium: Colors.warning,
    high: Colors.danger,
  };

  return (
    <Card
      style={{
        ...styles.card,
        borderLeftColor: priorityColors[suggestion.priority],
        borderLeftWidth: 3,
      }}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            { backgroundColor: priorityColors[suggestion.priority] + '20' },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: priorityColors[suggestion.priority] },
            ]}
          >
            {suggestion.priority.toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDismiss(suggestion.id)}>
          <Text style={styles.dismiss}>Dismiss</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{suggestion.title}</Text>
      <Text style={styles.description}>{suggestion.description}</Text>
      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL(suggestion.serviceLink)}
      >
        <Text style={styles.linkText}>{suggestion.serviceName} →</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  dismiss: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  link: {
    paddingVertical: Spacing.sm,
  },
  linkText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primaryLight,
  },
});
