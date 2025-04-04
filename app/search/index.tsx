import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, Pressable, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import debounce from 'lodash/debounce';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

type SearchResult = {
  id: string;
  title: string;
  year: string;
  posterUrl: string;
  rating: number;
  genres: string[];
};

type RecentSearch = {
  id: string;
  title: string;
  posterUrl: string;
  timestamp: number;
};

type TrendingSearch = {
  id: string;
  title: string;
  posterUrl: string;
  searchCount: number;
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<TrendingSearch[]>([]);

  // Mock data for demonstration
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Inception',
      year: '2010',
      posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      rating: 8.8,
      genres: ['Action', 'Sci-Fi']
    },
    {
      id: '2',
      title: 'The Dark Knight',
      year: '2008',
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 9.0,
      genres: ['Action', 'Crime', 'Drama']
    },
  ];

  const handleSearch = useCallback(
    debounce((query: string) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setSearchResults(mockSearchResults.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        ));
        setIsLoading(false);
      }, 500);
    }, 300),
    []
  );

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeRecentSearch = (id: string) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <Pressable
      style={[styles.movieCard, !isGridView && styles.movieCardList]}
      onPress={() => {}}
    >
      <Image
        source={{ uri: item.posterUrl }}
        style={[styles.moviePoster, !isGridView && styles.moviePosterList]}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={[styles.gradient, !isGridView && styles.gradientList]}
      />
      <View style={[styles.movieInfo, !isGridView && styles.movieInfoList]}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieYear}>{item.year}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={12} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.genreContainer}>
          {item.genres.map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies and shows"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            autoFocus
          />
          {searchQuery ? (
            <Pressable onPress={handleClearSearch} style={styles.clearButton}>
              <FontAwesome name="times-circle" size={20} color="#666" />
            </Pressable>
          ) : null}
        </View>
        <Pressable
          style={styles.viewToggle}
          onPress={() => setIsGridView(!isGridView)}
        >
          <FontAwesome
            name={isGridView ? 'th-list' : 'th-large'}
            size={20}
            color="#fff"
          />
        </Pressable>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : searchQuery ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          numColumns={isGridView ? 2 : 1}
          key={isGridView ? 'grid' : 'list'}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <FontAwesome name="search" size={64} color="#666" />
              <Text style={styles.emptyStateText}>
                No results found. Try searching for something else!
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.suggestionsContainer}>
          {/* Recent Searches Section */}
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.recentSearchItem}
                  onPress={() => setSearchQuery(item.title)}
                >
                  <Image
                    source={{ uri: item.posterUrl }}
                    style={styles.recentSearchImage}
                  />
                  <Text style={styles.recentSearchText}>{item.title}</Text>
                  <Pressable
                    onPress={() => removeRecentSearch(item.id)}
                    style={styles.removeButton}
                  >
                    <FontAwesome name="times" size={16} color="#666" />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          )}

          {/* Trending Searches Section */}
          {trendingSearches.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Searches</Text>
              {trendingSearches.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.trendingSearchItem}
                  onPress={() => setSearchQuery(item.title)}
                >
                  <FontAwesome name="fire" size={16} color="#ff4757" />
                  <Text style={styles.trendingSearchText}>{item.title}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#000',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    padding: 8,
  },
  viewToggle: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsList: {
    padding: 16,
  },
  movieCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  movieCardList: {
    width: SCREEN_WIDTH - 32,
    flexDirection: 'row',
    height: 150,
  },
  moviePoster: {
    width: '100%',
    aspectRatio: 2/3,
  },
  moviePosterList: {
    width: 100,
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  gradientList: {
    width: '100%',
    height: '100%',
  },
  movieInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'transparent',
  },
  movieInfoList: {
    position: 'relative',
    flex: 1,
    paddingLeft: 12,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    marginLeft: 4,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  genreTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 10,
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  suggestionsContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  recentSearchImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
  },
  removeButton: {
    padding: 8,
  },
  trendingSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  trendingSearchText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 12,
  },
});