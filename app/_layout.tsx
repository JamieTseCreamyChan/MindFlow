import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ConsentProvider } from '../src/context/ConsentContext';
import { Colors } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <ConsentProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.textPrimary,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="crisis/index"
          options={{
            title: 'Support Resources',
            presentation: 'modal',
          }}
        />
      </Stack>
    </ConsentProvider>
  );
}
