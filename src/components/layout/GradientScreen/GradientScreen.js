import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import styles from './styles';

const GradientScreen = ({
  colors,
  children,
  statusBarStyle = 'light',
  gradientStyle,
  safeAreaStyle,
  contentStyle
}) => (
  <LinearGradient colors={colors} style={[styles.gradient, gradientStyle]}>
    <ExpoStatusBar style={statusBarStyle} />
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  </LinearGradient>
);

export default GradientScreen;
