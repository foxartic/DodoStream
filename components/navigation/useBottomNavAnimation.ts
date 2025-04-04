import { useRef, useCallback } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const NAVBAR_HEIGHT = 65;
const SHOW_THRESHOLD = 50;

export const useBottomNavAnimation = () => {
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);

  const translateY = scrollOffset.interpolate({
    inputRange: [0, NAVBAR_HEIGHT],
    outputRange: [0, NAVBAR_HEIGHT],
    extrapolate: 'clamp',
  });

  const opacity = scrollOffset.interpolate({
    inputRange: [0, NAVBAR_HEIGHT],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      const scrollDiff = currentScrollY - lastScrollY.current;

      if (
        (scrollDiff > 0 && !isScrollingDown.current && Math.abs(scrollDiff) > SHOW_THRESHOLD) ||
        (scrollDiff < 0 && isScrollingDown.current && Math.abs(scrollDiff) > SHOW_THRESHOLD)
      ) {
        isScrollingDown.current = scrollDiff > 0;
        Animated.spring(scrollOffset, {
          toValue: isScrollingDown.current ? NAVBAR_HEIGHT : 0,
          useNativeDriver: true,
          bounciness: 8,
          speed: 12,
        }).start();
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