import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { studyPlaces } from '../data/studyPlaces';
import { colors } from '../constants/colors';
import { PlaceDetailModal } from '../components/PlaceDetailModal';

export const MapScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // McMaster University coordinates
  const initialRegion = {
    latitude: 43.2609,
    longitude: -79.9192,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus Map</Text>
        <Text style={styles.subtitle}>McMaster University Study Places</Text>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {studyPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            title={place.name}
            description={place.location}
            pinColor={colors.maroon}
            onPress={() => setSelectedPlace(place)}
          />
        ))}
      </MapView>

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
  map: {
    flex: 1,
  },
});