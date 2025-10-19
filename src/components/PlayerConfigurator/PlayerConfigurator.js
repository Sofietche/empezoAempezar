import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';

const PlayerConfigurator = ({
  players,
  onAdd,
  onUpdate,
  onRemove
}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.playersContainer}
  >
    <Text style={styles.sectionTitle}>Jugadores</Text>
    <ScrollView style={styles.playersScroll} contentContainerStyle={styles.playersScrollContent}>
      {players.map((value, index) => (
        <View
          key={`player-${index}`}
          style={[styles.playerInputRow, index !== players.length - 1 && styles.playerInputRowSpacing]}
        >
          <TextInput
            value={value}
            onChangeText={(text) => onUpdate(text, index)}
            placeholder={`Nombre ${index + 1}`}
            placeholderTextColor="#5C5C7A"
            style={styles.playerInput}
          />
          {players.length > 1 && (
            <TouchableOpacity style={styles.removePlayerButton} onPress={() => onRemove(index)}>
              <Text style={styles.removePlayerText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addPlayerButton} onPress={onAdd}>
        <Text style={styles.addPlayerText}>+ Añadir jugador</Text>
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default PlayerConfigurator;
