import React, { useState, useContext } from 'react';
import { ScrollHandlerContext } from './_layout';
import { StyleSheet, Pressable, Image, FlatList, Switch, Dimensions } from 'react-native';
import { View, Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type DownloadedMovie = {
  id: string;
  title: string;
  thumbnailUrl: string;
  progress: number;
  status: 'downloading' | 'downloaded' | 'paused';
  fileSize: string;
  resolution: string;
};

export default function DownloadsScreen() {
  const [smartDownloads, setSmartDownloads] = useState(false);
  const handleScroll = useContext(ScrollHandlerContext);
  const [downloads, setDownloads] = useState<DownloadedMovie[]>([
    {
      id: '1',
      title: 'Inception',
      thumbnailUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      progress: 65,
      status: 'downloading',
      fileSize: '1.2GB',
      resolution: '1080p'
    },
    {
      id: '2',
      title: 'The Dark Knight',
      thumbnailUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      progress: 100,
      status: 'downloaded',
      fileSize: '2.1GB',
      resolution: '4K'
    },
  ]);

  const renderDownloadItem = ({ item }: { item: DownloadedMovie }) => (
    <View style={styles.downloadItem}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.statusContainer}>
          {item.status === 'downloading' ? (
            <>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
              </View>
              <Text style={styles.statusText}>{`Downloading ${item.progress}%`}</Text>
            </>
          ) : (
            <Text style={styles.statusText}>Downloaded</Text>
          )}
          <Text style={styles.fileInfo}>{`${item.fileSize} | ${item.resolution}`}</Text>
        </View>
      </View>
      <Pressable style={styles.playButton} onPress={() => {}}>
        <FontAwesome name="play" size={20} color="#fff" />
      </Pressable>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="download" size={64} color="#666" />
      <Text style={styles.emptyTitle}>No Downloads Yet</Text>
      <Text style={styles.emptyText}>
        Your downloads will appear here. Save movies for offline viewing!
      </Text>
      <Pressable style={styles.browseButton} onPress={() => {}}>
        <Text style={styles.browseButtonText}>Browse Movies</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Downloads</Text>
        <Pressable style={styles.settingsButton} onPress={() => {}}>
          <FontAwesome name="gear" size={24} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.smartDownloads}>
        <View style={styles.smartDownloadsContent}>
          <Text style={styles.smartDownloadsTitle}>Smart Downloads</Text>
          <Text style={styles.smartDownloadsText}>
            Automatically manage your downloads for a seamless experience
          </Text>
        </View>
        <Switch
          value={smartDownloads}
          onValueChange={setSmartDownloads}
          trackColor={{ false: '#666', true: '#2196F3' }}
          thumbColor={smartDownloads ? '#fff' : '#f4f3f4'}
        />
      </View>

      <FlatList
        data={downloads}
        renderItem={renderDownloadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.downloadsList}
        ListEmptyComponent={EmptyState}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 8,
  },
  smartDownloads: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    marginBottom: 16,
  },
  smartDownloadsContent: {
    flex: 1,
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  smartDownloadsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  smartDownloadsText: {
    fontSize: 14,
    color: '#999',
  },
  downloadsList: {
    padding: 16,
  },
  downloadItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: 'transparent',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  statusText: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
  fileInfo: {
    fontSize: 12,
    color: '#999',
  },
  playButton: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: 'transparent',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});