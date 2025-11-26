import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { studyPlaces, MCMASTER_CENTER } from '../data/studyPlaces';
import { colors } from '../constants/colors';
import { PlaceDetailModal } from '../components/PlaceDetailModal';
import { useApp } from '../context/AppContext';

export const MapScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapType, setMapType] = useState('standard'); // 'standard' or 'hybrid'
  const { addVisited } = useApp();

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
    addVisited(place.id);
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'Library':
        return colors.maroon;
      case 'Café':
        return colors.gold;
      case 'Common Area':
        return '#4A90E2';
      default:
        return colors.darkGray;
    }
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < Math.floor(rating) ? 'star' : 'star-outline'}
            size={12}
            color={colors.gold}
          />
        ))}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Campus Map</Text>
          <Text style={styles.subtitle}>McMaster University Study Places</Text>
        </View>
        
        {/* Map Type Toggle */}
        <TouchableOpacity 
          style={styles.mapTypeButton}
          onPress={() => setMapType(mapType === 'standard' ? 'hybrid' : 'standard')}
        >
          <Ionicons 
            name={mapType === 'standard' ? 'map' : 'map-outline'} 
            size={24} 
            color={colors.maroon} 
          />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={MCMASTER_CENTER}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {studyPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            pinColor={getMarkerColor(place.type)}
            onPress={() => handleMarkerPress(place)}
          >
            <View style={[styles.customMarker, { backgroundColor: getMarkerColor(place.type) }]}>
              <Ionicons 
                name={place.type === 'Library' ? 'book' : place.type === 'Café' ? 'cafe' : 'people'} 
                size={20} 
                color="white" 
              />
            </View>
            
            {/* Callout (info bubble when marker is pressed) */}
            <Callout onPress={() => handleMarkerPress(place)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <View style={styles.calloutInfo}>
                  {renderStars(place.rating)}
                  <Text style={styles.calloutReviews}>({place.reviews} reviews)</Text>
                </View>
                <View style={styles.calloutDetails}>
                  <Ionicons name="volume-medium" size={12} color={colors.darkGray} />
                  <Text style={styles.calloutText}>{place.noiseLevel}</Text>
                  <Text style={styles.calloutSeparator}>•</Text>
                  <Ionicons name="people" size={12} color={colors.darkGray} />
                  <Text style={styles.calloutText}>{place.crowdedness}</Text>
                </View>
                <Text style={styles.calloutAction}>Tap for details →</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.maroon }]} />
            <Text style={styles.legendText}>Library</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.gold }]} />
            <Text style={styles.legendText}>Café</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4A90E2' }]} />
            <Text style={styles.legendText}>Common Area</Text>
          </View>
        </View>
      </View>

      {/* Nearby Places List */}
      <View style={styles.nearbyContainer}>
        <Text style={styles.nearbyTitle}>Nearby Places</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.nearbyScroll}
        >
          {studyPlaces.slice(0, 5).map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.nearbyCard}
              onPress={() => handleMarkerPress(place)}
            >
              <View style={[styles.nearbyIcon, { backgroundColor: getMarkerColor(place.type) }]}>
                <Ionicons 
                  name={place.type === 'Library' ? 'book' : place.type === 'Café' ? 'cafe' : 'people'} 
                  size={24} 
                  color="white" 
                />
              </View>
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyName} numberOfLines={2}>{place.name}</Text>
                {renderStars(place.rating)}
                <View style={styles.nearbyTags}>
                  <View style={styles.nearbyTag}>
                    <Text style={styles.nearbyTagText}>{place.noiseLevel}</Text>
                  </View>
                  <View style={styles.nearbyTag}>
                    <Text style={styles.nearbyTagText}>{place.crowdedness}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Place Detail Modal */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.maroon,
  },
  subtitle: {
    fontSize: 14,
    color: colors.darkGray,
  },
  mapTypeButton: {
    padding: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  calloutContainer: {
    width: 200,
    padding: 8,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 4,
  },
  calloutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  calloutReviews: {
    fontSize: 11,
    color: colors.darkGray,
    marginLeft: 4,
  },
  calloutDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 11,
    color: colors.darkGray,
  },
  calloutSeparator: {
    fontSize: 11,
    color: colors.darkGray,
    marginHorizontal: 2,
  },
  calloutAction: {
    fontSize: 11,
    color: colors.maroon,
    fontWeight: '600',
    marginTop: 4,
  },
  legend: {
    position: 'absolute',
    top: 100,
    right: 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 8,
  },
  legendItems: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 11,
    color: colors.darkGray,
  },
  nearbyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  nearbyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.maroon,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  nearbyScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  nearbyCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 12,
    width: 160,
    marginRight: 12,
  },
  nearbyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  nearbyInfo: {
    gap: 4,
  },
  nearbyName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 4,
    height: 34,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 11,
    color: colors.darkGray,
    marginLeft: 4,
  },
  nearbyTags: {
    flexDirection: 'row',
    gap: 4,
  },
  nearbyTag: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  nearbyTagText: {
    fontSize: 10,
    color: colors.darkGray,
  },
});