import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Switch, View as RNView } from 'react-native';
import { View, Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

type SettingItemProps = {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, value, onPress, rightElement }) => (
  <Pressable style={styles.settingItem} onPress={onPress}>
    <RNView style={styles.settingItemLeft}>
      <FontAwesome name={icon} size={20} color="#fff" style={styles.settingIcon} />
      <Text style={styles.settingLabel}>{label}</Text>
    </RNView>
    <RNView style={styles.settingItemRight}>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      {rightElement}
      {onPress && <FontAwesome name="angle-right" size={20} color="#666" />}
    </RNView>
  </Pressable>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hwDecoder, setHwDecoder] = useState(true);
  const [autoDeleteWatched, setAutoDeleteWatched] = useState(false);
  const [traktSync, setTraktSync] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <SettingsSection title="General">
          <SettingItem
            icon="adjust"
            label="Theme"
            value="Dark"
            onPress={() => {}}
          />
          <SettingItem
            icon="language"
            label="Language"
            value="English"
            onPress={() => {}}
          />
          <SettingItem
            icon="play-circle"
            label="Default Player"
            value="ExoPlayer"
            onPress={() => {}}
          />
          <SettingItem
            icon="home"
            label="Default Home Tab"
            value="Movies"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Streaming & Playback">
          <SettingItem
            icon="video-camera"
            label="Preferred Quality"
            value="1080p"
            onPress={() => {}}
          />
          <SettingItem
            icon="play"
            label="Auto Play Next Episode"
            rightElement={
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: '#666', true: '#2196F3' }}
                thumbColor={autoPlay ? '#fff' : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            icon="closed-captioning"
            label="Subtitles Settings"
            onPress={() => {}}
          />
          <SettingItem
            icon="microchip"
            label="Enable HW Decoder"
            rightElement={
              <Switch
                value={hwDecoder}
                onValueChange={setHwDecoder}
                trackColor={{ false: '#666', true: '#2196F3' }}
                thumbColor={hwDecoder ? '#fff' : '#f4f3f4'}
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Downloads">
          <SettingItem
            icon="folder"
            label="Download Path"
            value="Internal Storage"
            onPress={() => {}}
          />
          <SettingItem
            icon="download"
            label="Max Simultaneous Downloads"
            value="2"
            onPress={() => {}}
          />
          <SettingItem
            icon="trash"
            label="Auto Delete Watched"
            rightElement={
              <Switch
                value={autoDeleteWatched}
                onValueChange={setAutoDeleteWatched}
                trackColor={{ false: '#666', true: '#2196F3' }}
                thumbColor={autoDeleteWatched ? '#fff' : '#f4f3f4'}
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Account & Backup">
          <SettingItem
            icon="refresh"
            label="Trakt Sync"
            rightElement={
              <Switch
                value={traktSync}
                onValueChange={setTraktSync}
                trackColor={{ false: '#666', true: '#2196F3' }}
                thumbColor={traktSync ? '#fff' : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            icon="cloud-upload"
            label="Backup & Restore"
            onPress={() => {}}
          />
          <SettingItem
            icon="eraser"
            label="Clear Cache"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="About & Support">
          <SettingItem
            icon="refresh"
            label="Check for Updates"
            onPress={() => {}}
          />
          <SettingItem
            icon="bug"
            label="Report a Bug"
            onPress={() => {}}
          />
          <SettingItem
            icon="file-text"
            label="Privacy Policy & Terms"
            onPress={() => {}}
          />
          <SettingItem
            icon="info-circle"
            label="App Version"
            value="1.0.0"
          />
        </SettingsSection>
      </ScrollView>
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
    justifyContent: 'center',
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 8,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
});