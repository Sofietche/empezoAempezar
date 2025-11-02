import React from 'react';
import useGameState from './src/hooks/useGameState';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import GameScreen from './src/screens/GameScreen/GameScreen';

export default function App() {
  const {
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
    panHandlers,
    isLoadingDeck,
    deckError,
    startGame,
    showNextCard,
    resetGame,
    addPlayerInput,
    updatePlayerName,
    removePlayerInput
  } = useGameState();

  if (screen === 'welcome') {
    return (
      <WelcomeScreen
        mode={mode}
        onModeChange={setMode}
        playerInputs={playerInputs}
        onAddPlayer={addPlayerInput}
        onUpdatePlayer={updatePlayerName}
        onRemovePlayer={removePlayerInput}
        onStartGame={startGame}
        isLoading={isLoadingDeck}
        deckError={deckError}
        neonAccent={neonAccent}
      />
    );
  }

  return (
    <GameScreen
      deckLength={deck.length}
      cardIndex={cardIndex}
      currentCard={currentCard}
      players={players}
      neonAccent={neonAccent}
      animatedCardStyle={animatedCardStyle}
      panHandlers={panHandlers}
      onReset={resetGame}
      onNextCard={showNextCard}
      deckError={deckError}
    />
  );
}
