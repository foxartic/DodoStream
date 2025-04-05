import React from 'react';
import { StyleSheet, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from '@/components/Themed';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const POSTER_HEIGHT = SCREEN_HEIGHT * 0.6;

type CastMember = {
  id: string;
  name: string;
  character: string;
  profileImage: string;
};

type MovieDetails = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  releaseDate: string;
  genres: string[];
  rating: number;
  cast: CastMember[];
};

export default function MovieDetailsScreen() {
  const params = useLocalSearchParams();
  const movieId = params.id as string;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
  const router = useRouter();
  // Mock data - In a real app, fetch movie details based on movieId
  const movieDetails: MovieDetails = {
    id: movieId,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    imageUrl: 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    duration: '2h 28m',
    releaseDate: '2010',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 88,
    cast: [
      { id: '1', name: 'Leonardo DiCaprio', character: 'Cobb', profileImage: 'https://example.com/cast1.jpg' },
      { id: '2', name: 'Joseph Gordon-Levitt', character: 'Arthur', profileImage: 'https://example.com/cast2.jpg' },
      { id: '3', name: 'Ellen Page', character: 'Ariadne', profileImage: 'https://example.com/cast3.jpg' },
    ]
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.posterContainer}>
          <Image source={{ uri: movieDetails.imageUrl }} style={styles.poster} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)', '#000']}
            style={styles.gradient}
          />
          <View style={[styles.headerButtons, { backgroundColor: 'transparent' }]}>
            <Pressable
              style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
              onPress={() => router.back()}
            >
              <FontAwesome name="arrow-left" size={24} color="#fff" />
            </Pressable>
            <Pressable
              onPress={handleFavoritePress}
              style={[styles.favoriteButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
            >
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color={isFavorite ? '#ff4757' : '#fff'}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.title}>{movieDetails.title}</Text>
            
            <View style={styles.metaInfo}>
              <Text style={styles.metaText}>{movieDetails.releaseDate} • {movieDetails.duration}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{movieDetails.rating}%</Text>
              </View>
            </View>

            <View style={styles.genreContainer}>
              {movieDetails.genres.map((genre, index) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Overview</Text>
              <Text
                style={[styles.description, isDescriptionExpanded && styles.descriptionExpanded]}
                numberOfLines={isDescriptionExpanded ? undefined : 3}
                onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {movieDetails.description}
              </Text>
            </View>
          </View>
          <View style={styles.castSection}>
            <Text style={styles.castTitle}>Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movieDetails.cast.map((member) => (
                <View key={member.id} style={styles.castMember}>
                  <View style={styles.castImagePlaceholder}>
                    <FontAwesome name="user" size={24} color="#fff" />
                  </View>
                  <Text style={styles.castName}>{member.name}</Text>
                  <Text style={styles.castCharacter}>{member.character}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={styles.playButton}>
              <FontAwesome name="play" size={16} color="#000" />
              <Text style={styles.playButtonText}>Play</Text>
            </Pressable>
            <Pressable style={styles.downloadButton}>
              <FontAwesome name="download" size={16} color="#fff" />
              <Text style={styles.downloadButtonText}>Download</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
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
  posterContainer: {
    height: POSTER_HEIGHT,
    width: '100%',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: POSTER_HEIGHT / 2,
  },
  headerButtons: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
  },
  favoriteButton: {
    padding: 12,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  descriptionHeader: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  metaText: {
    fontSize: 14,
    color: '#999',
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 4,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#fff',
  },
  descriptionContainer: {
    backgroundColor: 'transparent',
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#ccc',
  },
  descriptionExpanded: {
    marginBottom: 16,
  },
  castSection: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  castTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  castMember: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
    backgroundColor: 'transparent',
  },
  castImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  castName: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  castCharacter: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.6,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'column',
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  playButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  playButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  downloadButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    borderRadius: 8,
  },
  downloadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});