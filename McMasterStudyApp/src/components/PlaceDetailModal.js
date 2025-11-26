import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

export const PlaceDetailModal = ({ place, visible, onClose }) => {
  const { favorites, toggleFavorite } = useApp();

  if (!place) return null;

  const isFavorite = favorites.includes(place.id);

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < Math.floor(rating) ? 'star' : 'star-outline'}
            size={18}
            color={colors.gold}
          />
        ))}
        <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="chevron-down" size={28} color={colors.darkGray} />
            </TouchableOpacity>
          </View>

          {/* Hero Image */}
          <View
            style={[
              styles.heroImage,
              {
                backgroundColor:
                  place.type === 'Library' ? colors.maroon : colors.gold,
              },
            ]}
          >
            <Ionicons
              name={place.type === 'Library' ? 'book' : 'cafe'}
              size={80}
              color="white"
            />
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* Title and Favorite */}
            <View style={styles.titleRow}>
              <Text style={styles.title}>{place.name}</Text>
              <TouchableOpacity
                onPress={() => toggleFavorite(place.id)}
                style={styles.favoriteButton}
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={32}
                  color={colors.maroon}
                />
              </TouchableOpacity>
            </View>

            {/* Rating */}
            <View style={styles.ratingRow}>
              {renderStars(place.rating)}
              <Text style={styles.reviewCount}>
                ({place.reviews} reviews)
              </Text>
            </View>

            {/* Location */}
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color={colors.maroon} />
              <Text style={styles.infoText}>{place.location}</Text>
            </View>

            {/* Hours */}
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color={colors.maroon} />
              <Text style={styles.infoText}>{place.hours}</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{place.description}</Text>

            {/* Environment Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Study Environment</Text>
              <View style={styles.environmentGrid}>
                <View style={styles.environmentCard}>
                  <Ionicons
                    name="volume-medium"
                    size={24}
                    color={colors.maroon}
                  />
                  <Text style={styles.environmentLabel}>Noise Level</Text>
                  <Text style={styles.environmentValue}>{place.noiseLevel}</Text>
                </View>
                <View style={styles.environmentCard}>
                  <Ionicons name="people" size={24} color={colors.maroon} />
                  <Text style={styles.environmentLabel}>Crowdedness</Text>
                  <Text style={styles.environmentValue}>
                    {place.crowdedness}
                  </Text>
                </View>
              </View>
            </View>

            {/* Amenities Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesContainer}>
                {place.amenities.map((amenity) => (
                  <View key={amenity} style={styles.amenityTag}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Quick Features */}
            <View style={styles.section}>
              <View style={styles.featuresRow}>
                {place.hasWifi && (
                  <View style={styles.featureItem}>
                    <Ionicons name="wifi" size={20} color={colors.maroon} />
                    <Text style={styles.featureText}>WiFi</Text>
                  </View>
                )}
                {place.hasPowerOutlets && (
                  <View style={styles.featureItem}>
                    <Ionicons name="flash" size={20} color={colors.maroon} />
                    <Text style={styles.featureText}>Outlets</Text>
                  </View>
                )}
                {place.nearFood && (
                  <View style={styles.featureItem}>
                    <Ionicons
                      name="fast-food"
                      size={20}
                      color={colors.maroon}
                    />
                    <Text style={styles.featureText}>Food Nearby</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Reviews Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Recent Reviews ({place.reviews})
              </Text>
              
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  {renderStars(5)}
                  <Text style={styles.reviewDate}>2 days ago</Text>
                </View>
                <Text style={styles.reviewText}>
                  Perfect spot for studying! Very quiet and plenty of outlets.
                  The atmosphere is great for concentration.
                </Text>
              </View>

              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  {renderStars(4)}
                  <Text style={styles.reviewDate}>1 week ago</Text>
                </View>
                <Text style={styles.reviewText}>
                  Great atmosphere but can get crowded during exam season.
                  Would recommend arriving early to secure a spot.
                </Text>
              </View>

              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  {renderStars(5)}
                  <Text style={styles.reviewDate}>2 weeks ago</Text>
                </View>
                <Text style={styles.reviewText}>
                  Excellent lighting and comfortable seating. One of my favorite
                  places to study on campus.
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Ionicons name="create" size={20} color="white" />
                <Text style={styles.primaryButtonText}>Write a Review</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="notifications" size={20} color={colors.maroon} />
                <Text style={styles.secondaryButtonText}>
                  Notify when available
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="share-social" size={20} color={colors.maroon} />
                <Text style={styles.secondaryButtonText}>Share Location</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
  },
  heroImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.maroon,
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkGray,
    marginLeft: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: colors.darkGray,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkGray,
    marginVertical: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 12,
  },
  environmentGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  environmentCard: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  environmentLabel: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 8,
  },
  environmentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
    marginTop: 4,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  amenityText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  featureItem: {
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: colors.darkGray,
  },
  reviewCard: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.darkGray,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.darkGray,
  },
  actionButtons: {
    marginTop: 24,
    marginBottom: 40,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.maroon,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.maroon,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
});