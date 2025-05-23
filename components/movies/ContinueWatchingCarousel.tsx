import React from 'react';
import { StyleSheet, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../Themed';

type Movie = {
  id: string;
  title: string;
  rating: number;
  imageUrl: string;
  progress: number;
};

type ContinueWatchingCarouselProps = {
  movies: Movie[];
  onMoviePress: (movieId: string) => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.3;

export default function ContinueWatchingCarousel({ movies, onMoviePress }: ContinueWatchingCarouselProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Continue Watching</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movies.map((movie) => (
          <Pressable
            key={movie.id}
            style={styles.movieCard}
            onPress={() => onMoviePress(movie.id)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: movie.imageUrl }} style={styles.movieImage} />
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${movie.progress}%` }]} />
              </View>
            </View>
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle} numberOfLines={1}>
                {movie.title}
              </Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={12} color="#FFD700" />
                <Text style={styles.rating}>{movie.rating.toFixed(1)}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 6,
  },
  movieCard: {
    width: CARD_WIDTH,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  movieImage: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    borderRadius: 6,
    backgroundColor: '#2c3e50',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
  movieInfo: {
    marginTop: 6,
    backgroundColor: 'transparent',
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  rating: {
    marginLeft: 3,
    fontSize: 10,
    opacity: 0.8,
  },
});