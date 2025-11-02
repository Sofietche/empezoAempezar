import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import { BASE_DECK } from '../constants/deck';
import { NEON_COLORS } from '../constants/colors';
import { shuffle } from '../utils/shuffle';
import { fetchDeckFromFirebase } from '../services/decks/deckRepository';
import { isFirebaseConfigured } from '../services/firebase/app';

const { width } = Dimensions.get('window');

const SWIPE_THRESHOLD = 120;

const sanitizePlayers = (inputs) =>
  inputs.map((name) => name.trim()).filter(Boolean);

const assignPlayersToDeck = (cards, players) =>
  cards.map((card, index) => {
    if (!players.length) {
      return card;
    }
    const assignedPlayer = players[index % players.length];
    return { ...card, player: assignedPlayer };
  });

const useGameState = () => {
  const [screen, setScreen] = useState('welcome');
  const [mode, setMode] = useState('libre');
  const [playerInputs, setPlayerInputs] = useState(['']);
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isLoadingDeck, setIsLoadingDeck] = useState(false);
  const [deckError, setDeckError] = useState(null);

  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = useMemo(
    () =>
      pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-12deg', '0deg', '12deg']
      }),
    [pan]
  );

  const opacity = useMemo(
    () =>
      pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [0.8, 1, 0.8]
      }),
    [pan]
  );

  const resetPan = useCallback(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [pan]);

  const showNextCard = useCallback(() => {
    setCardIndex((prev) => prev + 1);
  }, []);

  const resetGame = useCallback(() => {
    setDeck([]);
    setCardIndex(0);
    setScreen('welcome');
    setIsLoadingDeck(false);
    resetPan();
  }, [resetPan]);

  const cardPanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false
        }),
        onPanResponderRelease: (_, gestureState) => {
          if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
            const direction = gestureState.dx > 0 ? width : -width;
            Animated.timing(pan, {
              toValue: { x: direction, y: gestureState.dy },
              duration: 220,
              useNativeDriver: true
            }).start(() => {
              resetPan();
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
    [pan, resetPan, showNextCard]
  );

  const neonAccent = useMemo(
    () => NEON_COLORS[cardIndex % NEON_COLORS.length],
    [cardIndex]
  );

  const addPlayerInput = useCallback(() => {
    setPlayerInputs((prev) => [...prev, '']);
  }, []);

  const updatePlayerName = useCallback((text, index) => {
    setPlayerInputs((prev) => {
      const copy = [...prev];
      copy[index] = text;
      return copy;
    });
  }, []);

  const removePlayerInput = useCallback((index) => {
    setPlayerInputs((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const buildDeck = useCallback(
    (cards, playersList) => assignPlayersToDeck(shuffle(cards), playersList),
    []
  );

  const startGame = useCallback(async () => {
    const sanitizedPlayers = mode === 'jugadores' ? sanitizePlayers(playerInputs) : [];

    setPlayers(sanitizedPlayers);

    setIsLoadingDeck(true);
    setDeckError(null);

    const launchWithDeck = (cards, errorMessage = null) => {
      const preparedDeck = buildDeck(cards, sanitizedPlayers);
      setDeck(preparedDeck);
      setCardIndex(0);
      setScreen('game');
      resetPan();
      setDeckError(errorMessage);
    };

    if (!isFirebaseConfigured()) {
      launchWithDeck(
        BASE_DECK,
        'Configura Firebase en src/config/firebaseConfig.js para sincronizar el mazo remoto. Se está usando el mazo local.'
      );
      setIsLoadingDeck(false);
      return;
    }

    try {
      const remoteDeck = await fetchDeckFromFirebase();
      const usingRemoteDeck = remoteDeck.length > 0;

      if (usingRemoteDeck) {
        launchWithDeck(remoteDeck, null);
      } else {
        launchWithDeck(
          BASE_DECK,
          'No se encontraron cartas en Firebase. Se utilizará el mazo local hasta que cargues contenido.'
        );
      }
    } catch (error) {
      console.warn('No se pudo cargar el mazo desde Firebase, usando mazo local.', error);
      launchWithDeck(
        BASE_DECK,
        'No pudimos sincronizar con Firebase. Se está usando el mazo local para continuar.'
      );
    } finally {
      setIsLoadingDeck(false);
    }
  }, [buildDeck, mode, playerInputs, resetPan]);

  const currentCard = deck[cardIndex];

  const animatedCardStyle = useMemo(
    () => ({
      transform: [...pan.getTranslateTransform(), { rotate }],
      opacity
    }),
    [opacity, pan, rotate]
  );

  return {
    screen,
    mode,
    setMode,
    playerInputs,
    players,
    deck,
    cardIndex,
    currentCard,
    neonAccent,
    animatedCardStyle,
    panHandlers: cardPanResponder.panHandlers,
    isLoadingDeck,
    deckError,
    startGame,
    showNextCard,
    resetGame,
    addPlayerInput,
    updatePlayerName,
    removePlayerInput
  };
};

export default useGameState;
