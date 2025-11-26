import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';

export const FilterModal = ({ visible, onClose }) => {
  const { filters, setFilters } = useApp();

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      noiseLevel: 'All',
      crowdedness: 'All',
      type: 'All',
      hasWifi: false,
      hasPowerOutlets: false,
      nearFood: false,
    });
  };

  const FilterOption = ({ label, value, onPress, isSelected }) => (
    <TouchableOpacity
      style={[styles.filterOption, isSelected && styles.filterOptionSelected]}
      onPress={onPress}
    >
      <Text style={[styles.filterOptionText, isSelected && styles.filterOptionTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.darkGray} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Noise Level</Text>
              <View style={styles.filterGroup}>
                {['All', 'Silent', 'Quiet', 'Moderate', 'Loud'].map((level) => (
                  <FilterOption
                    key={level}
                    label={level}
                    value={level}
                    isSelected={filters.noiseLevel === level}
                    onPress={() => updateFilter('noiseLevel', level)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Crowdedness</Text>
              <View style={styles.filterGroup}>
                {['All', 'Low', 'Moderate', 'High'].map((level) => (
                  <FilterOption
                    key={level}
                    label={level}
                    value={level}
                    isSelected={filters.crowdedness === level}
                    onPress={() => updateFilter('crowdedness', level)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Place Type</Text>
              <View style={styles.filterGroup}>
                {['All', 'Library', 'Café', 'Common Area', 'Outdoor'].map((type) => (
                  <FilterOption
                    key={type}
                    label={type}
                    value={type}
                    isSelected={filters.type === type}
                    onPress={() => updateFilter('type', type)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>WiFi Available</Text>
                <Switch
                  value={filters.hasWifi}
                  onValueChange={(value) => updateFilter('hasWifi', value)}
                  trackColor={{ false: '#ccc', true: colors.maroon }}
                  thumbColor={filters.hasWifi ? colors.gold : '#f4f3f4'}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Power Outlets</Text>
                <Switch
                  value={filters.hasPowerOutlets}
                  onValueChange={(value) => updateFilter('hasPowerOutlets', value)}
                  trackColor={{ false: '#ccc', true: colors.maroon }}
                  thumbColor={filters.hasPowerOutlets ? colors.gold : '#f4f3f4'}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Near Food</Text>
                <Switch
                  value={filters.nearFood}
                  onValueChange={(value) => updateFilter('nearFood', value)}
                  trackColor={{ false: '#ccc', true: colors.maroon }}
                  thumbColor={filters.nearFood ? colors.gold : '#f4f3f4'}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.applyButton}
              onPress={onClose}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.maroon,
  },
  scrollView: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 12,
  },
  filterGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterOptionSelected: {
    backgroundColor: colors.maroon,
    borderColor: colors.maroon,
  },
  filterOptionText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  filterOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.darkGray,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.maroon,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.maroon,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});