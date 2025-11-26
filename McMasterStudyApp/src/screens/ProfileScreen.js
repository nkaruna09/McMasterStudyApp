import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Make sure you have 'export' here!
export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color={colors.maroon} />
        </View>

        <Text style={styles.name}>McMaster Student</Text>
        <Text style={styles.email}>student@mcmaster.ca</Text>

        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={24} color={colors.maroon} />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications" size={24} color={colors.maroon} />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color={colors.maroon} />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="information-circle" size={24} color={colors.maroon} />
            <Text style={styles.menuText}>About</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 32,
  },
  menuItems: {
    width: '100%',
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 12,
  },
});