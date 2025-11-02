import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ModeButton = ({ label, active, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.modeButton, style, active && styles.modeButtonActive]}
  >
    <Text style={[styles.modeButtonText, active && styles.modeButtonTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default ModeButton;
