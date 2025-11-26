import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaceCard } from '../components/PlaceCard';
import { FilterModal } from '../components/FilterModal';
import { PlaceDetailModal } from '../components/PlaceDetailModal';
import { studyPlaces } from '../data/studyPlaces';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { filters, addVisited } = useApp();

  const filteredPlaces = useMemo(() => {
    return studyPlaces.filter(place => {
      const matchesSearch = place.name.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesNoise = filters.noiseLevel === 'All' || 
        place.noiseLevel === filters.noiseLevel;
      
      const matchesCrowd = filters.crowdedness === 'All' || 
        place.crowdedness === filters.crowdedness;
      
      const matchesType = filters.type === 'All' || 
        place.type === filters.type;
      
      return matchesSearch && matchesNoise && matchesCrowd && matchesType;
    });
  }, [searchQuery, filters]);

  const handlePlacePress = (place) => {
    setSelectedPlace(place);
    addVisited(place.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Place Finder</Text>
        <Text style={styles.subtitle}>
          Discover the perfect study spot on campus
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={colors.darkGray} 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search study places..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.darkGray}
        />
        <TouchableOpacity 
          onPress={() => setShowFilters(true)}
          style={styles.filterButton}
        >
          <Ionicons name="options" size={20} color={colors.maroon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlaceCard 
            place={item} 
            onPress={() => handlePlacePress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              Showing {filteredPlaces.length} of {studyPlaces.length} places
            </Text>
          </View>
        }
      />

      <FilterModal 
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.darkGray,
  },
  filterButton: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 14,
    color: colors.darkGray,
  },
});