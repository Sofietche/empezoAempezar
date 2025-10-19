import { StyleSheet } from 'react-native';
import { CARD_HEIGHT, CARD_WIDTH } from '../../constants/layout';

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 28,
    borderWidth: 1.5,
    backgroundColor: 'rgba(12, 9, 35, 0.9)',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 30,
    elevation: 10,
    overflow: 'hidden'
  },
  cardGradient: {
    flex: 1,
    padding: 28,
    justifyContent: 'space-between'
  },
  cardType: {
    color: '#8F8CFF',
    fontSize: 14,
    letterSpacing: 6,
    fontWeight: '700'
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 34
  },
  playerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.35)'
  },
  playerBadgeLabel: {
    color: '#6FD9FF',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  playerBadgeName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  swipeHint: {
    color: '#6B6B9C',
    fontSize: 13,
    textAlign: 'right'
  }
});

export default styles;
