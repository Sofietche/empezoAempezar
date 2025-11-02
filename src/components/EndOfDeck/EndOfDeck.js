import React from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from '../buttons/PrimaryButton';
import styles from './styles';

const EndOfDeck = ({ hasPlayers, onReset }) => (
  <View style={styles.endCard}>
    <Text style={styles.endTitle}>¡Fin de la partida!</Text>
    {hasPlayers ? (
      <Text style={styles.endSubtitle}>Puedes reiniciar para mezclar nuevas combinaciones.</Text>
    ) : (
      <Text style={styles.endSubtitle}>Reinicia para otra ronda con nuevos retos.</Text>
    )}
    <PrimaryButton label="Volver al inicio" onPress={onReset} style={styles.restartButton} />
  </View>
);

export default EndOfDeck;
