import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const BASE_DECK = [
  { id: 'q1', type: 'pregunta', text: '¿Cuál ha sido tu mejor anécdota en una previa?' },
  { id: 'q2', type: 'reto', text: 'Canta el coro de tu canción favorita a todo pulmón.' },
  { id: 'q3', type: 'reto', text: 'Toma un trago sin usar las manos.' },
  { id: 'q4', type: 'pregunta', text: '¿Quién es el alma de la fiesta del grupo?' },
  { id: 'q5', type: 'reto', text: 'Haz que todos se levanten a bailar por 30 segundos.' },
  { id: 'q6', type: 'pregunta', text: '¿Cuál es tu bebida infaltable para comenzar la noche?' },
  { id: 'q7', type: 'reto', text: 'Elige a alguien para hacer un brindis dramático.' },
  { id: 'q8', type: 'pregunta', text: '¿Qué es lo más épico que te pasó saliendo?' },
  { id: 'q9', type: 'reto', text: 'Cuenta un chiste; si nadie se ríe, toma dos tragos.' },
  { id: 'q10', type: 'pregunta', text: '¿Quién es el más probable a quedarse dormido primero y por qué?' },
  { id: 'q11', type: 'reto', text: 'Imita a otra persona del grupo durante una ronda.' },
  { id: 'q12', type: 'pregunta', text: '¿Qué canción no puede faltar para seguir?' }
];

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const neonColors = ['#00E5FF', '#FF00C3', '#8C54FF', '#FF7A00'];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [mode, setMode] = useState('libre');
  const [playerInputs, setPlayerInputs] = useState(['']);
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-12deg', '0deg', '12deg']
  });
  const opacity = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.8, 1, 0.8]
  });

  const cardPanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false
        }),
        onPanResponderRelease: (_, gestureState) => {
          if (Math.abs(gestureState.dx) > 120) {
            const direction = gestureState.dx > 0 ? width : -width;
            Animated.timing(pan, {
              toValue: { x: direction, y: gestureState.dy },
              duration: 220,
              useNativeDriver: true
            }).start(() => {
              pan.setValue({ x: 0, y: 0 });
              showNextCard();
            });
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 5
            }).start();
          }
        }
      }),
    [pan]
  );

  const currentCard = deck[cardIndex];

  const startGame = () => {
    const sanitizedPlayers = mode === 'jugadores'
      ? playerInputs.map((name) => name.trim()).filter(Boolean)
      : [];

    setPlayers(sanitizedPlayers);
    const randomized = shuffle(BASE_DECK).map((card, index) => {
      if (!sanitizedPlayers.length) {
        return card;
      }
      const assignedPlayer = sanitizedPlayers[index % sanitizedPlayers.length];
      return { ...card, player: assignedPlayer };
    });

    setDeck(randomized);
    setCardIndex(0);
    setScreen('game');
  };

  const resetGame = () => {
    setDeck([]);
    setCardIndex(0);
    setScreen('welcome');
  };

  const showNextCard = () => {
    setCardIndex((prev) => prev + 1);
  };

  const addPlayerInput = () => {
    setPlayerInputs((prev) => [...prev, '']);
  };

  const updatePlayerName = (text, index) => {
    setPlayerInputs((prev) => {
      const copy = [...prev];
      copy[index] = text;
      return copy;
    });
  };

  const removePlayerInput = (index) => {
    setPlayerInputs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const neonAccent = useMemo(() => neonColors[cardIndex % neonColors.length], [cardIndex]);

  const renderWelcome = () => (
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
            onPress={() => setMode('libre')}
            style={styles.modeButtonSpacing}
          />
          <ModeButton
            label="Con jugadores"
            active={mode === 'jugadores'}
            onPress={() => setMode('jugadores')}
          />
          </View>
        </View>
        {mode === 'jugadores' && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.playersContainer}
          >
            <Text style={styles.sectionTitle}>Jugadores</Text>
            <ScrollView
              style={styles.playersScroll}
              contentContainerStyle={styles.playersScrollContent}
            >
              {playerInputs.map((value, index) => (
                <View
                  key={`player-${index}`}
                  style={[
                    styles.playerInputRow,
                    index !== playerInputs.length - 1 && styles.playerInputRowSpacing
                  ]}
                >
                  <TextInput
                    value={value}
                    onChangeText={(text) => updatePlayerName(text, index)}
                    placeholder={`Nombre ${index + 1}`}
                    placeholderTextColor="#5C5C7A"
                    style={styles.playerInput}
                  />
                  {playerInputs.length > 1 && (
                    <TouchableOpacity
                      style={styles.removePlayerButton}
                      onPress={() => removePlayerInput(index)}
                    >
                      <Text style={styles.removePlayerText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.addPlayerButton} onPress={addPlayerInput}>
                <Text style={styles.addPlayerText}>+ Añadir jugador</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
        <TouchableOpacity
          style={[styles.primaryButton, { shadowColor: neonAccent }]}
          onPress={startGame}
        >
          <Text style={styles.primaryButtonText}>Comenzar partida</Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>Desliza cada carta hacia la izquierda o derecha para revelar la siguiente.</Text>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderGame = () => (
    <LinearGradient colors={['#02010A', '#0A0820', '#130F3A']} style={styles.gradient}>
      <ExpoStatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.gameHeader}>
          <Text style={styles.deckCounter}>
            Carta {Math.min(cardIndex + 1, deck.length)} / {deck.length}
          </Text>
          <TouchableOpacity onPress={resetGame}>
            <Text style={styles.resetText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          {currentCard ? (
            <Animated.View
              {...cardPanResponder.panHandlers}
              style={[
                styles.card,
                {
                  transform: [...pan.getTranslateTransform(), { rotate }],
                  opacity,
                  borderColor: neonAccent,
                  shadowColor: neonAccent
                }
              ]}
            >
              <LinearGradient
                colors={[`${neonAccent}55`, '#050513']}
                style={styles.cardGradient}
              >
                <Text style={styles.cardType}>{currentCard.type.toUpperCase()}</Text>
                <Text style={styles.cardText}>{currentCard.text}</Text>
                {currentCard.player && (
                  <View style={styles.playerBadge}>
                    <Text style={styles.playerBadgeLabel}>Jugador asignado</Text>
                    <Text style={styles.playerBadgeName}>{currentCard.player}</Text>
                  </View>
                )}
                <Text style={styles.swipeHint}>Desliza para pasar</Text>
              </LinearGradient>
            </Animated.View>
          ) : (
            <View style={styles.endCard}>
              <Text style={styles.endTitle}>¡Fin de la partida!</Text>
              {players.length ? (
                <Text style={styles.endSubtitle}>Puedes reiniciar para mezclar nuevas combinaciones.</Text>
              ) : (
                <Text style={styles.endSubtitle}>Reinicia para otra ronda con nuevos retos.</Text>
              )}
              <TouchableOpacity style={styles.primaryButton} onPress={resetGame}>
                <Text style={styles.primaryButtonText}>Volver al inicio</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {currentCard && (
          <TouchableOpacity style={styles.secondaryButton} onPress={showNextCard}>
            <Text style={styles.secondaryButtonText}>Siguiente carta</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );

  return screen === 'welcome' ? renderWelcome() : renderGame();
}

function ModeButton({ label, active, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.modeButton, style, active && styles.modeButtonActive]}
    >
      <Text style={[styles.modeButtonText, active && styles.modeButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? 0 : 20
  },
  safeArea: {
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
  modeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2D2D4F',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 10, 40, 0.4)'
  },
  modeButtonActive: {
    borderColor: '#5F5BFF',
    backgroundColor: 'rgba(95, 91, 255, 0.18)',
    shadowColor: '#5F5BFF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12
  },
  modeButtonText: {
    color: '#9C9CC5',
    fontWeight: '600',
    fontSize: 16
  },
  modeButtonTextActive: {
    color: '#FFFFFF'
  },
  playersContainer: {
    flex: 1,
    marginBottom: 24
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
  },
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
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1
  },
  hintText: {
    marginTop: 16,
    color: '#7474A5',
    fontSize: 13,
    textAlign: 'center'
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
  },
  endCard: {
    alignItems: 'center',
    paddingHorizontal: 12
  },
  endTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12
  },
  endSubtitle: {
    color: '#A0A0D6',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24
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
