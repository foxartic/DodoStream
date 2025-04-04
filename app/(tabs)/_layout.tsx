import React from 'react';
import { Tabs } from 'expo-router';
import { ScrollView } from 'react-native';
import { FloatingBottomNav } from '@/components/navigation/FloatingBottomNav';
import { useBottomNavAnimation } from '@/components/navigation/useBottomNavAnimation';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { translateY, opacity, handleScroll } = useBottomNavAnimation();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
          }}
        />
        <Tabs.Screen
          name="downloads"
          options={{
            title: 'Downloads',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
          }}
        />
      </Tabs>
      <FloatingBottomNav translateY={translateY} opacity={opacity} />
    </>
  );
}
