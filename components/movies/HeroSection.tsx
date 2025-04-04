import React from 'react';
import { StyleSheet, ImageBackground, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../Themed';

type HeroSectionProps = {
  movie: {
    title: string;
    description: string;
    imageUrl: string;
    rating: number;
  };
  onPlayPress: () => void;
  onFavoritePress: () => void;
};

export default function HeroSection({ movie, onPlayPress, onFavoritePress }: HeroSectionProps) {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: movie.imageUrl }} style={styles.backgroundImage}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
          style={styles.overlay}
        >
          <Pressable style={styles.favoriteButton} onPress={onFavoritePress}>
            <FontAwesome name="heart-o" size={24} color="#fff" />
          </Pressable>
          <View style={styles.content}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {movie.description}
            </Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{movie.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.playButton} onPress={onPlayPress}>
                <FontAwesome name="play" size={16} color="#000" />
                <Text style={styles.playButtonText}>Play</Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    opacity: 0.9,
    textAlign: 'center',
    maxWidth: '90%',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  rating: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playButtonText: {
    color: '#000',
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});