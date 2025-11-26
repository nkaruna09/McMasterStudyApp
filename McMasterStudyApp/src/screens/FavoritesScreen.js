import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceCard } from '../components/PlaceCard';
import { PlaceDetailModal } from '../components/PlaceDetailModal';
import { studyPlaces } from '../data/studyPlaces';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';

export const FavoritesScreen = () => {
  const { favorites, visited, addVisited } = useApp();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' or 'visited'

  const favoritePlaces = studyPlaces.filter((place) =>
    favorites.includes(place.id)
  );
  const visitedPlaces = studyPlaces.filter((place) =>
    visited.includes(place.id)
  );

  const handlePlacePress = (place) => {
    setSelectedPlace(place);
    addVisited(place.id);
  };

  const renderEmptyState = (type) => (
    <View style={styles.emptyState}>
      <Ionicons
        name={type === 'favorites' ? 'heart-outline' : 'bookmark-outline'}
        size={64}
        color={colors.darkGray}
      />
      <Text style={styles.emptyTitle}>
        {type === 'favorites' ? 'No Favorites Yet' : 'No Places Visited'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {type === 'favorites'
          ? 'Tap the heart icon on any study place to save it here for quick access.'
          : 'Places you view will appear here so you can easily find them again.'}
      </Text>
    </View>
  );

  const TabButton = ({ title, icon, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.tabButtonActive]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color={isActive ? colors.maroon : colors.darkGray}
      />
      <Text
        style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Places</Text>
        <Text style={styles.subtitle}>
          Your favorite and visited study spots
        </Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TabButton
          title={`Favorites (${favoritePlaces.length})`}
          icon="heart"
          isActive={activeTab === 'favorites'}
          onPress={() => setActiveTab('favorites')}
        />
        <TabButton
          title={`Visited (${visitedPlaces.length})`}
          icon="bookmark"
          isActive={activeTab === 'visited'}
          onPress={() => setActiveTab('visited')}
        />
      </View>

      {/* Content */}
      {activeTab === 'favorites' ? (
        favoritePlaces.length === 0 ? (
          renderEmptyState('favorites')
        ) : (
          <FlatList
            data={favoritePlaces}
            keyExtractor={(item) => `fav-${item.id}`}
            renderItem={({ item }) => (
              <PlaceCard place={item} onPress={() => handlePlacePress(item)} />
            )}
            contentContainerStyle={styles.listContent}
          />
        )
      ) : visitedPlaces.length === 0 ? (
        renderEmptyState('visited')
      ) : (
        <FlatList
          data={visitedPlaces}
          keyExtractor={(item) => `visited-${item.id}`}
          renderItem={({ item }) => (
            <PlaceCard place={item} onPress={() => handlePlacePress(item)} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <PlaceDetailModal
        place={selectedPlace}
        visible={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.maroon,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.darkGray,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabButtonActive: {
    backgroundColor: colors.lightGray,
    borderColor: colors.maroon,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.darkGray,
  },
  tabButtonTextActive: {
    color: colors.maroon,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
});