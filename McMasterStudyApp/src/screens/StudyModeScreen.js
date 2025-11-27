import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useApp } from '../context/AppContext';
import { studyPlaces } from '../data/studyPlaces';

export const StudyModeScreen = () => {
  const { addStudySession, getStudyStats, studySessions } = useApp();
  
  // Timer states
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  // Pomodoro states
  const [pomodoroMode, setPomodoroMode] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState('work'); // 'work' or 'break'
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [workDuration] = useState(25 * 60); // 25 minutes in seconds
  const [breakDuration] = useState(5 * 60); // 5 minutes in seconds
  
  // Ambient sound state
  const [ambientSound, setAmbientSound] = useState(null);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
        
        // Pomodoro check
        if (pomodoroMode) {
          const targetDuration = pomodoroPhase === 'work' ? workDuration : breakDuration;
          if (seconds + 1 >= targetDuration) {
            handlePomodoroComplete();
          }
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, seconds, pomodoroMode, pomodoroPhase]);

  const handlePomodoroComplete = () => {
    if (pomodoroPhase === 'work') {
      setPomodoroCount((prev) => prev + 1);
      setPomodoroPhase('break');
      setSeconds(0);
      Alert.alert(
        '🎉 Work Session Complete!',
        'Time for a 5-minute break. Stand up, stretch, grab some water!',
        [{ text: 'Start Break', onPress: () => {} }]
      );
    } else {
      setPomodoroPhase('work');
      setSeconds(0);
      Alert.alert(
        '✨ Break Over!',
        'Ready to get back to work? Let\'s do this!',
        [{ text: 'Start Work', onPress: () => {} }]
      );
    }
  };

  const startStudySession = () => {
    if (!selectedLocation) {
      Alert.alert('Select Location', 'Please select where you\'re studying');
      setShowLocationPicker(true);
      return;
    }
    
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = new Date();
  };

  const pauseStudySession = () => {
    setIsPaused(true);
  };

  const resumeStudySession = () => {
    setIsPaused(false);
  };

  const endStudySession = () => {
    Alert.alert(
      'End Study Session',
      `You studied for ${formatTime(seconds)}. Save this session?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            // Save session
            const session = {
              id: Date.now(),
              locationId: selectedLocation.id,
              locationName: selectedLocation.name,
              duration: seconds,
              startTime: startTimeRef.current,
              endTime: new Date(),
              pomodoroCount: pomodoroMode ? pomodoroCount : 0,
              mode: pomodoroMode ? 'Pomodoro' : 'Normal',
            };
            
            addStudySession(session);
            
            // Reset
            setIsRunning(false);
            setIsPaused(false);
            setSeconds(0);
            setPomodoroCount(0);
            setPomodoroPhase('work');
            
            Alert.alert('Success', 'Study session saved! 🎓');
          },
        },
      ]
    );
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!pomodoroMode) return 0;
    const targetDuration = pomodoroPhase === 'work' ? workDuration : breakDuration;
    return (seconds / targetDuration) * 100;
  };

  const stats = getStudyStats();

  const ambientSounds = [
    { id: 'none', name: 'None', icon: 'volume-mute' },
    { id: 'library', name: 'Library', icon: 'book' },
    { id: 'cafe', name: 'Café', icon: 'cafe' },
    { id: 'rain', name: 'Rain', icon: 'rainy' },
    { id: 'white-noise', name: 'White Noise', icon: 'radio' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Study Mode</Text>
          <Text style={styles.subtitle}>Track your study sessions</Text>
        </View>

        {/* Location Selection */}
        {!isRunning && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Where are you studying?</Text>
            {selectedLocation ? (
              <TouchableOpacity
                style={styles.selectedLocation}
                onPress={() => setShowLocationPicker(!showLocationPicker)}
              >
                <Ionicons name="location" size={24} color={colors.maroon} />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{selectedLocation.name}</Text>
                  <Text style={styles.locationType}>{selectedLocation.type}</Text>
                </View>
                <Ionicons name="chevron-down" size={24} color={colors.darkGray} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.selectLocationButton}
                onPress={() => setShowLocationPicker(!showLocationPicker)}
              >
                <Ionicons name="add-circle" size={24} color={colors.maroon} />
                <Text style={styles.selectLocationText}>Select Location</Text>
              </TouchableOpacity>
            )}

            {showLocationPicker && (
              <View style={styles.locationPicker}>
                {studyPlaces.slice(0, 6).map((place) => (
                  <TouchableOpacity
                    key={place.id}
                    style={styles.locationOption}
                    onPress={() => {
                      setSelectedLocation(place);
                      setShowLocationPicker(false);
                    }}
                  >
                    <Ionicons
                      name={place.type === 'Library' ? 'book' : 'cafe'}
                      size={20}
                      color={colors.maroon}
                    />
                    <Text style={styles.locationOptionText}>{place.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Timer Display */}
        <View style={styles.timerSection}>
          <View style={[
            styles.timerCircle,
            isRunning && styles.timerCircleActive,
            isPaused && styles.timerCirclePaused
          ]}>
            {pomodoroMode && (
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${getProgress()}%` }]} />
              </View>
            )}
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            {pomodoroMode && (
              <View style={styles.pomodoroInfo}>
                <Text style={styles.pomodoroPhase}>
                  {pomodoroPhase === 'work' ? '📚 Focus Time' : '☕ Break Time'}
                </Text>
                <Text style={styles.pomodoroCount}>
                  Pomodoros: {pomodoroCount}
                </Text>
              </View>
            )}
          </View>

          {/* Timer Controls */}
          <View style={styles.controls}>
            {!isRunning ? (
              <TouchableOpacity
                style={styles.startButton}
                onPress={startStudySession}
              >
                <Ionicons name="play" size={32} color="white" />
                <Text style={styles.controlButtonText}>Start</Text>
              </TouchableOpacity>
            ) : (
              <>
                {isPaused ? (
                  <TouchableOpacity
                    style={styles.resumeButton}
                    onPress={resumeStudySession}
                  >
                    <Ionicons name="play" size={28} color="white" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.pauseButton}
                    onPress={pauseStudySession}
                  >
                    <Ionicons name="pause" size={28} color="white" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.stopButton}
                  onPress={endStudySession}
                >
                  <Ionicons name="stop" size={28} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Mode Toggle */}
        {!isRunning && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Study Mode</Text>
            <View style={styles.modeToggle}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  !pomodoroMode && styles.modeButtonActive,
                ]}
                onPress={() => setPomodoroMode(false)}
              >
                <Ionicons
                  name="timer"
                  size={24}
                  color={!pomodoroMode ? 'white' : colors.maroon}
                />
                <Text
                  style={[
                    styles.modeButtonText,
                    !pomodoroMode && styles.modeButtonTextActive,
                  ]}
                >
                  Normal Timer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  pomodoroMode && styles.modeButtonActive,
                ]}
                onPress={() => setPomodoroMode(true)}
              >
                <Ionicons
                  name="fitness"
                  size={24}
                  color={pomodoroMode ? 'white' : colors.maroon}
                />
                <Text
                  style={[
                    styles.modeButtonText,
                    pomodoroMode && styles.modeButtonTextActive,
                  ]}
                >
                  Pomodoro
                </Text>
                <Text style={[
                  styles.pomodoroDescription,
                  pomodoroMode && styles.pomodoroDescriptionActive
                ]}>
                  25min work / 5min break
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Ambient Sounds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎵 Ambient Sounds</Text>
          <View style={styles.soundsGrid}>
            {ambientSounds.map((sound) => (
              <TouchableOpacity
                key={sound.id}
                style={[
                  styles.soundButton,
                  ambientSound === sound.id && styles.soundButtonActive,
                ]}
                onPress={() => setAmbientSound(sound.id)}
              >
                <Ionicons
                  name={sound.icon}
                  size={24}
                  color={ambientSound === sound.id ? 'white' : colors.maroon}
                />
                <Text
                  style={[
                    styles.soundButtonText,
                    ambientSound === sound.id && styles.soundButtonTextActive,
                  ]}
                >
                  {sound.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Study Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalSessions}</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalHours}</Text>
              <Text style={styles.statLabel}>Hours Studied</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalPomodoros}</Text>
              <Text style={styles.statLabel}>Pomodoros</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.favoriteLocation || 'N/A'}</Text>
              <Text style={styles.statLabel}>Favorite Spot</Text>
            </View>
          </View>
        </View>

        {/* Recent Sessions */}
        {studySessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            {studySessions.slice(0, 5).map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <Ionicons name="location" size={16} color={colors.maroon} />
                  <Text style={styles.sessionLocation}>{session.locationName}</Text>
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionDuration}>
                    {formatTime(session.duration)}
                  </Text>
                  <Text style={styles.sessionMode}>{session.mode}</Text>
                  {session.pomodoroCount > 0 && (
                    <Text style={styles.sessionPomodoros}>
                      🍅 {session.pomodoroCount}
                    </Text>
                  )}
                </View>
                <Text style={styles.sessionDate}>
                  {new Date(session.endTime).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.maroon,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 12,
  },
  selectedLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  locationType: {
    fontSize: 14,
    color: colors.darkGray,
  },
  selectLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.maroon,
    borderStyle: 'dashed',
    gap: 8,
  },
  selectLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  locationPicker: {
    marginTop: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  locationOptionText: {
    fontSize: 15,
    color: colors.darkGray,
  },
  timerSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 8,
    borderColor: colors.lightGray,
    position: 'relative',
    overflow: 'hidden',
  },
  timerCircleActive: {
    borderColor: colors.maroon,
  },
  timerCirclePaused: {
    borderColor: colors.gold,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.lightGray,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.maroon,
  },
  timerText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.maroon,
  },
  pomodoroInfo: {
    marginTop: 12,
    alignItems: 'center',
  },
  pomodoroPhase: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.maroon,
    marginBottom: 4,
  },
  pomodoroCount: {
    fontSize: 14,
    color: colors.darkGray,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  startButton: {
    backgroundColor: colors.maroon,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  pauseButton: {
    backgroundColor: colors.gold,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeButton: {
    backgroundColor: colors.maroon,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#DC3545',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modeToggle: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.maroon,
  },
  modeButtonActive: {
    backgroundColor: colors.maroon,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.maroon,
    marginTop: 8,
  },
  modeButtonTextActive: {
    color: 'white',
  },
  pomodoroDescription: {
    fontSize: 11,
    color: colors.darkGray,
    marginTop: 4,
  },
  pomodoroDescriptionActive: {
    color: 'white',
    opacity: 0.9,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  soundButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.maroon,
    minWidth: 100,
  },
  soundButtonActive: {
    backgroundColor: colors.maroon,
  },
  soundButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.maroon,
    marginTop: 4,
  },
  soundButtonTextActive: {
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.maroon,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.darkGray,
    textAlign: 'center',
  },
  sessionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sessionLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.maroon,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  sessionDuration: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.maroon,
  },
  sessionMode: {
    fontSize: 12,
    color: colors.darkGray,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sessionPomodoros: {
    fontSize: 12,
    color: colors.darkGray,
  },
  sessionDate: {
    fontSize: 12,
    color: colors.darkGray,
  },
});