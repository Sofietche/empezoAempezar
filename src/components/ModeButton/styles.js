import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2D2D4F',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 10, 40, 0.4)'
  },
  modeButtonActive: {
    borderColor: '#5F5BFF',
    backgroundColor: 'rgba(95, 91, 255, 0.18)',
    shadowColor: '#5F5BFF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12
  },
  modeButtonText: {
    color: '#9C9CC5',
    fontWeight: '600',
    fontSize: 16
  },
  modeButtonTextActive: {
    color: '#FFFFFF'
  }
});

export default styles;
