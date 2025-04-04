import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { View } from '@/components/Themed';
import HeroSection from '@/components/movies/HeroSection';
import MovieCarousel from '@/components/movies/MovieCarousel';
import ContinueWatchingCarousel from '@/components/movies/ContinueWatchingCarousel';
import { router } from 'expo-router';

// Sample data - Replace with actual API calls
const featuredMovie = {
  title: 'The Black Phone',
  description: 'In a suburban Colorado town in the 1970s, five children go missing, kidnapped by a sadistic killer known as "The Grabber". When Finney Shaw becomes his latest victim, he discovers he can communicate with the killer\'s previous victims through a disconnected black phone on the wall.',
  imageUrl: 'https://image.tmdb.org/t/p/original/p9ZUzCyy9wRTDuuQexkQ78R2BgF.jpg',
  rating: 8.8,
};

const topMovies = [
  {
    id: '1',
    title: 'Inception',
    rating: 8.8,
    imageUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    rating: 9.0,
    imageUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: '3',
    title: 'Interstellar',
    rating: 8.6,
    imageUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
];

const upcomingMovies = [
  {
    id: '4',
    title: 'Dune: Part Two',
    rating: 9.2,
    imageUrl: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  },
  {
    id: '5',
    title: 'Deadpool 3',
    rating: 8.5,
    imageUrl: 'https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
  },
  {
    id: '6',
    title: 'Joker: Folie à Deux',
    rating: 8.7,
    imageUrl: 'https://image.tmdb.org/t/p/w500/bw0l1oqLYEXIGQMrZnsuWlOZ9s2.jpg',
  },
];

const continueWatchingMovies = [
  {
    id: '7',
    title: 'The Matrix',
    rating: 8.7,
    imageUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    progress: 65,
  },
  {
    id: '8',
    title: 'Avatar',
    rating: 7.8,
    imageUrl: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
    progress: 30,
  },
  {
    id: '9',
    title: 'Oppenheimer',
    rating: 8.4,
    imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    progress: 85,
  },
];

export default function HomeScreen() {
  const handleMoviePress = (movieId: string) => {
    router.push(`/movie-details?id=${movieId}`);
  };

  const handlePlayPress = () => {
    // Navigate to the movie player screen
    router.push('/streaming/player');
  };

  const handleFavoritePress = () => {
    // Add to favorites functionality
    Alert.alert('Success', 'Added to favorites!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <HeroSection
          movie={featuredMovie}
          onPlayPress={handlePlayPress}
          onFavoritePress={handleFavoritePress}
        />
        <View style={styles.carouselsContainer}>
          <MovieCarousel
            title="Top Movies"
            movies={topMovies}
            onMoviePress={handleMoviePress}
          />
          <ContinueWatchingCarousel
            movies={continueWatchingMovies}
            onMoviePress={handleMoviePress}
          />
          <MovieCarousel
            title="Upcoming Movies"
            movies={upcomingMovies}
            onMoviePress={handleMoviePress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
  },
  carouselsContainer: {
    paddingTop: 16,
    backgroundColor: 'transparent',
  },
});
