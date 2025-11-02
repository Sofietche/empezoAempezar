import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const PrimaryButton = ({ label, onPress, style, textStyle, disabled, loading }) => (
  <TouchableOpacity
    style={[
      styles.primaryButton,
      disabled || loading ? styles.primaryButtonDisabled : null,
      style
    ]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color="#0FF" />
    ) : (
      <Text style={[styles.primaryButtonText, textStyle]}>{label}</Text>
    )}
  </TouchableOpacity>
);

export default PrimaryButton;
