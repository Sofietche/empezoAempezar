import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import ModeButton from '../../components/ModeButton/ModeButton';
import PlayerConfigurator from '../../components/PlayerConfigurator/PlayerConfigurator';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import styles from './styles';

const WelcomeScreen = ({
  mode,
  onModeChange,
  playerInputs,
  onAddPlayer,
  onUpdatePlayer,
  onRemovePlayer,
  onStartGame,
  neonAccent
}) => (
  <LinearGradient colors={['#02010A', '#08051F', '#0F0B33']} style={styles.gradient}>
    <ExpoStatusBar style="light" />
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logoText}>empezó a empezar</Text>
        <Text style={styles.subtitle}>Juego de previas con vibra futurista</Text>
      </View>
      <View style={styles.modeToggle}>
        <Text style={styles.sectionTitle}>Modo de juego</Text>
        <View style={styles.modeButtonsRow}>
          <ModeButton
            label="Libre"
            active={mode === 'libre'}
            onPress={() => onModeChange('libre')}
            style={styles.modeButtonSpacing}
          />
          <ModeButton
            label="Con jugadores"
            active={mode === 'jugadores'}
            onPress={() => onModeChange('jugadores')}
          />
        </View>
      </View>
      {mode === 'jugadores' && (
        <PlayerConfigurator
          players={playerInputs}
          onAdd={onAddPlayer}
          onUpdate={onUpdatePlayer}
          onRemove={onRemovePlayer}
        />
      )}
      <PrimaryButton
        label="Comenzar partida"
        onPress={onStartGame}
        style={[styles.primaryButton, { shadowColor: neonAccent }]}
      />
      <Text style={styles.hintText}>
        Desliza cada carta hacia la izquierda o derecha para revelar la siguiente.
      </Text>
    </SafeAreaView>
  </LinearGradient>
);

export default WelcomeScreen;
