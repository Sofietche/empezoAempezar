import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32
  },
  header: {
    marginTop: 24,
    marginBottom: 16
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#F5F5FF',
    letterSpacing: 4
  },
  subtitle: {
    marginTop: 8,
    color: '#C9C9E8',
    fontSize: 16,
    maxWidth: 320
  },
  modeToggle: {
    marginTop: 16,
    marginBottom: 16
  },
  sectionTitle: {
    color: '#E0E0FF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12
  },
  modeButtonsRow: {
    flexDirection: 'row'
  },
  modeButtonSpacing: {
    marginRight: 12
  },
  primaryButton: {
    shadowColor: '#5F5BFF'
  },
  hintText: {
    marginTop: 16,
    color: '#7474A5',
    fontSize: 13,
    textAlign: 'center'
  }
});

export default styles;
