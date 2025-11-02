import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  primaryButton: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#5F5BFF',
    alignItems: 'center',
    shadowColor: '#5F5BFF',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6
  },
  primaryButtonDisabled: {
    opacity: 0.6
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1
  },
  secondaryButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3A3770',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 16, 58, 0.7)'
  },
  secondaryButtonText: {
    color: '#D7D6FF',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default styles;
