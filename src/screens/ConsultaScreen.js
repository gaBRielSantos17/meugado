// MovimentacaoAnimalScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getMovimentAnimalsId } from '../services/getMovementAnimals';
import { DataContext } from '../contexts/userIdContext';
import CattleTimeline from '../components/CattleTimeLine';
export default function MovimentacaoAnimalScreen() {
  const [brinco, setBrinco] = useState('');
  const [animalData, setAnimalData] = useState(null);
  const { idUser } = useContext(DataContext);

  const fetchAnimalData = async () => {
    if (!brinco) return;
    try {
      const data = await getMovimentAnimalsId(brinco);
      setAnimalData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do animal:', error);
    }
  };

  const limparCampos = () => {
    setBrinco('');
    setAnimalData(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Movimentação</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número do brinco"
        value={brinco}
        onChangeText={setBrinco}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchAnimalData}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonClear]} onPress={limparCampos}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {animalData && <CattleTimeline data={animalData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { backgroundColor: '#28a745', padding: 15, alignItems: 'center', borderRadius: 5, flex: 1, marginHorizontal: 5 },
  buttonClear: { backgroundColor: '#d9534f' },
  buttonText: { color: '#fff', fontSize: 16 },
});