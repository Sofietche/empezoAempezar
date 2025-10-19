import React from 'react';
import { Animated, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

const GameCard = ({ card, neonAccent, animatedStyle, panHandlers }) => (
  <Animated.View
    {...panHandlers}
    style={[styles.card, animatedStyle, { borderColor: neonAccent, shadowColor: neonAccent }]}
  >
    <LinearGradient colors={[`${neonAccent}55`, '#050513']} style={styles.cardGradient}>
      <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
      <Text style={styles.cardText}>{card.text}</Text>
      {card.player && (
        <View style={styles.playerBadge}>
          <Text style={styles.playerBadgeLabel}>Jugador asignado</Text>
          <Text style={styles.playerBadgeName}>{card.player}</Text>
        </View>
      )}
      <Text style={styles.swipeHint}>Desliza para pasar</Text>
    </LinearGradient>
  </Animated.View>
);

export default GameCard;
