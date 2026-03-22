import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Gradients } from '../../src/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    home: '🏠',
    track: '✨',
    insights: '📊',
    settings: '⚙️',
  };
  return (
    <View style={styles.iconContainer}>
      <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>
        {icons[name] || '📱'}
      </Text>
      {focused && (
        <LinearGradient
          colors={[...Gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.activeIndicator}
        />
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryLight,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surfaceSolid,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 88,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: Colors.textPrimary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Check In',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="track" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="insights" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="settings" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
  activeIndicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginTop: 4,
  },
});
