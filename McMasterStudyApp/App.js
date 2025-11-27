import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider } from './src/context/AppContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { StudyModeScreen } from './src/screens/StudyModeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { colors } from './src/constants/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Study') {
                iconName = focused ? 'timer' : 'timer-outline';
              } else if (route.name === 'My Places') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.maroon,
            tabBarInactiveTintColor: colors.darkGray,
            headerShown: false,
            tabBarStyle: {
              //paddingBottom: 5,
              //paddingTop: 5,
              //height: 60,
            },
            tabBarLabelStyle: {
              //fontSize: 11,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Study" component={StudyModeScreen} />
          <Tab.Screen name="My Places" component={FavoritesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}