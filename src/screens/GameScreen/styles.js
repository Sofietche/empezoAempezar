import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  deckCounter: {
    color: '#D9D8FF',
    fontSize: 16,
    fontWeight: '600'
  },
  resetText: {
    color: '#FF5FA5',
    fontWeight: '600'
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: '#FF7A9B',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13
  }
});

export default styles;
