import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type NavItem = {
  name: string;
  icon: keyof typeof FontAwesome.glyphMap;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', icon: 'home', href: '/' },
  { name: 'Search', icon: 'search', href: '/search' },
  { name: 'Downloads', icon: 'download', href: '/downloads' },
  { name: 'Settings', icon: 'cog', href: '/settings' },
];

type FloatingBottomNavProps = {
  translateY: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
};

export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({ translateY, opacity }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} asChild>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name={item.icon} size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 65,
    backgroundColor: '#1a1a1a',
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});