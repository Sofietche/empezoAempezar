import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  playersContainer: {
    flex: 1,
    marginBottom: 24
  },
  sectionTitle: {
    color: '#E0E0FF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12
  },
  playersScroll: {
    maxHeight: 220,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2D2D4F',
    backgroundColor: 'rgba(11, 8, 31, 0.6)'
  },
  playersScrollContent: {
    padding: 16
  },
  playerInputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  playerInputRowSpacing: {
    marginBottom: 12
  },
  playerInput: {
    flex: 1,
    backgroundColor: 'rgba(23, 18, 61, 0.8)',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3770'
  },
  removePlayerButton: {
    marginLeft: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 0, 95, 0.18)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  removePlayerText: {
    color: '#FF5FA5',
    fontSize: 18
  },
  addPlayerButton: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#3A3770',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 10, 40, 0.4)'
  },
  addPlayerText: {
    color: '#B7B6FF',
    fontSize: 15,
    fontWeight: '600'
  }
});

export default styles;
