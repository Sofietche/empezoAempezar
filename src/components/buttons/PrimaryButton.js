import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const PrimaryButton = ({ label, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.primaryButton, style]} onPress={onPress}>
    <Text style={[styles.primaryButtonText, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

export default PrimaryButton;
