import { Platform, StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0
  },
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1
  }
});

export default styles;
