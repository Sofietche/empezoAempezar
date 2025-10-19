import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import GameCard from '../../components/GameCard/GameCard';
import EndOfDeck from '../../components/EndOfDeck/EndOfDeck';
import SecondaryButton from '../../components/buttons/SecondaryButton';
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
  <LinearGradient colors={['#02010A', '#0A0820', '#130F3A']} style={styles.gradient}>
    <ExpoStatusBar style="light" />
    <SafeAreaView style={styles.safeArea}>
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
    </SafeAreaView>
  </LinearGradient>
);

export default GameScreen;
