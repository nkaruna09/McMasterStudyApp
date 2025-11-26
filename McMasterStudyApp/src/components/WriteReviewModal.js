import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export const WriteReviewModal = ({ visible, onClose, placeName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    // Validation
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating');
      return;
    }
    if (reviewText.trim().length < 10) {
      Alert.alert('Review Too Short', 'Please write at least 10 characters');
      return;
    }
    if (userName.trim().length === 0) {
      Alert.alert('Name Required', 'Please enter your name');
      return;
    }

    // Create review object
    const newReview = {
      id: Date.now(),
      userName: userName.trim(),
      rating,
      text: reviewText.trim(),
      date: new Date().toISOString(),
    };

    // Call the onSubmit callback
    onSubmit(newReview);

    // Reset form
    setRating(0);
    setReviewText('');
    setUserName('');
    
    // Close modal
    onClose();

    // Show success message
    Alert.alert('Success', 'Your review has been posted!');
  };

  const renderStarInput = () => {
    return (
      <View style={styles.starInputContainer}>
        <Text style={styles.starLabel}>Your Rating</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color={star <= rating ? colors.gold : colors.darkGray}
              />
            </TouchableOpacity>
          ))}
        </View>
        {rating > 0 && (
          <Text style={styles.ratingText}>
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </Text>
        )}
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
            <Text style={styles.headerTitle}>Write a Review</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.darkGray} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {/* Place Name */}
            <Text style={styles.placeName}>{placeName}</Text>

            {/* Star Rating Input */}
            {renderStarInput()}

            {/* Name Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your name"
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor={colors.darkGray}
              />
            </View>

            {/* Review Text Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Your Review</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Share your experience at this study place..."
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholderTextColor={colors.darkGray}
              />
              <Text style={styles.characterCount}>
                {reviewText.length} characters (minimum 10)
              </Text>
            </View>

            {/* Tips Section */}
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>💡 Tips for a great review:</Text>
              <Text style={styles.tipText}>• Mention the noise level and atmosphere</Text>
              <Text style={styles.tipText}>• Comment on seating comfort and space</Text>
              <Text style={styles.tipText}>• Note availability of outlets and WiFi</Text>
              <Text style={styles.tipText}>• Share best times to visit</Text>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.submitButton,
                (rating === 0 || reviewText.length < 10) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={rating === 0 || reviewText.length < 10}
            >
              <Text style={styles.submitButtonText}>Post Review</Text>
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
    maxHeight: '95%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.maroon,
  },
  scrollView: {
    padding: 20,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGray,
    marginBottom: 20,
  },
  starInputContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  starLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gold,
    marginTop: 8,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.darkGray,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  characterCount: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 4,
    textAlign: 'right',
  },
  tipsSection: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: colors.darkGray,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.maroon,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.maroon,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.darkGray,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});