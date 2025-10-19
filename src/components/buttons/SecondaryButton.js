import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const SecondaryButton = ({ label, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.secondaryButton, style]} onPress={onPress}>
    <Text style={[styles.secondaryButtonText, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

export default SecondaryButton;
