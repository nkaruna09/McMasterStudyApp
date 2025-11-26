import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';

export const PlaceCard = ({ place, onPress }) => {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(place.id);

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.imageContainer,
        { backgroundColor: place.type === 'Library' ? colors.maroon : colors.gold }
      ]}>
        <Ionicons 
          name={place.type === 'Library' ? 'book' : 'cafe'} 
          size={48} 
          color="white" 
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {place.name}
          </Text>
          <TouchableOpacity 
            onPress={() => toggleFavorite(place.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={colors.maroon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color={colors.darkGray} />
          <Text style={styles.location}>{place.location}</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < Math.floor(place.rating) ? 'star' : 'star-outline'}
                size={14}
                color={colors.gold}
              />
            ))}
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
          <Text style={styles.reviews}>({place.reviews} reviews)</Text>
        </View>

        <View style={styles.tags}>
          <View style={styles.tag}>
            <Ionicons name="volume-medium" size={12} color={colors.darkGray} />
            <Text style={styles.tagText}>{place.noiseLevel}</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="people" size={12} color={colors.darkGray} />
            <Text style={styles.tagText}>{place.crowdedness}</Text>
          </View>
        </View>

        <View style={styles.amenities}>
          {place.hasWifi && (
            <Ionicons name="wifi" size={16} color={colors.maroon} />
          )}
          {place.nearFood && (
            <Ionicons name="fast-food" size={16} color={colors.maroon} />
          )}
          {place.hasPowerOutlets && (
            <Ionicons name="flash" size={16} color={colors.maroon} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.maroon,
    flex: 1,
    marginRight: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: colors.darkGray,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.darkGray,
  },
  amenities: {
    flexDirection: 'row',
    gap: 8,
  },
});