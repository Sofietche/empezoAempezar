import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GameCard from '../../components/GameCard/GameCard';
import EndOfDeck from '../../components/EndOfDeck/EndOfDeck';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import GradientScreen from '../../components/layout/GradientScreen/GradientScreen';
import styles from './styles';

const GameScreen = ({
  deckLength,
  cardIndex,
  currentCard,
  players,
  neonAccent,
  animatedCardStyle,
  panHandlers,
  onReset,
  onNextCard
}) => (
  <GradientScreen
    colors={['#02010A', '#0A0820', '#130F3A']}
    contentStyle={styles.container}
  >
    <View style={styles.gameHeader}>
      <Text style={styles.deckCounter}>
        Carta {Math.min(cardIndex + 1, deckLength)} / {deckLength}
      </Text>
      <TouchableOpacity onPress={onReset}>
        <Text style={styles.resetText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.cardContainer}>
      {currentCard ? (
        <GameCard
          card={currentCard}
          neonAccent={neonAccent}
          animatedStyle={animatedCardStyle}
          panHandlers={panHandlers}
        />
      ) : (
        <EndOfDeck hasPlayers={Boolean(players.length)} onReset={onReset} />
      )}
    </View>
    {currentCard && (
      <SecondaryButton label="Siguiente carta" onPress={onNextCard} />
    )}
  </GradientScreen>
);

export default GameScreen;
