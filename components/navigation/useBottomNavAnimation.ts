import { useRef, useCallback } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const NAVBAR_HEIGHT = 65;
const SHOW_THRESHOLD = 20; // Reduced threshold for more responsive animation

export const useBottomNavAnimation = () => {
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);

  const translateY = scrollOffset.interpolate({
    inputRange: [0, NAVBAR_HEIGHT],
    outputRange: [0, NAVBAR_HEIGHT + 20], // Add extra distance for more visible animation
    extrapolate: 'clamp',
  });

  const opacity = scrollOffset.interpolate({
    inputRange: [0, NAVBAR_HEIGHT / 2, NAVBAR_HEIGHT],
    outputRange: [1, 0.9, 0.7], // More gradual opacity change
    extrapolate: 'clamp',
  });

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Make animation more responsive by reducing the threshold check
      if (Math.abs(scrollDiff) > 5) {
        // Determine scroll direction
        const isScrollingDownNow = scrollDiff > 0;
        
        // Only trigger animation when direction changes or exceeds threshold
        if (
          (isScrollingDownNow && !isScrollingDown.current && Math.abs(scrollDiff) > SHOW_THRESHOLD) ||
          (!isScrollingDownNow && isScrollingDown.current && Math.abs(scrollDiff) > SHOW_THRESHOLD)
        ) {
          isScrollingDown.current = isScrollingDownNow;
          
          // Use spring for smoother animation
          Animated.spring(scrollOffset, {
            toValue: isScrollingDown.current ? NAVBAR_HEIGHT : 0,
            useNativeDriver: true,
            // Using only bounciness/speed configuration
            bounciness: 4, // Less bounce for smoother animation
            speed: 14,     // Slightly faster
            // Removed tension/friction parameters to avoid conflict
          }).start();
        }
      }

      lastScrollY.current = currentScrollY;
    },
    [scrollOffset]
  );

  return {
    translateY,
    opacity,
    handleScroll,
  };
};