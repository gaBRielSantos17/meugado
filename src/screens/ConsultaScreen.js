import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getAnimalByBrinco, getMovimentacoesByBrinco } from '../services/animalService';

export default function MovimentacaoAnimalScreen() {
  const [brinco, setBrinco] = useState('');
  const [animal, setAnimal] = useState(null);
  const [movimentacoes, setMovimentacoes] = useState([]);

  const buscarAnimal = async () => {
    if (!brinco.trim()) return;
    
    const dadosAnimal = await getAnimalByBrinco(brinco);
    setAnimal(dadosAnimal);

    if (dadosAnimal) {
      const historico = await getMovimentacoesByBrinco(brinco);
      setMovimentacoes(historico || []);
    } else {
      setMovimentacoes([]);
    }
  };

  const limparCampos = () => {
    setBrinco('');
    setAnimal(null);
    setMovimentacoes([]);
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
        <TouchableOpacity style={styles.button} onPress={buscarAnimal}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonClear]} onPress={limparCampos}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {animal && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Dados do Animal</Text>
          <Text>Origem: {animal.origem}</Text>
          <Text>Data de Nascimento: {animal.dataNascimento}</Text>
          <Text>Peso: {animal.ultimoPeso} kg</Text>
        </View>
      )}

      {movimentacoes.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Rastreamento</Text>
          <FlatList
            data={movimentacoes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.movimentacaoItem}>
                <Text>{item.data} - {item.local} ({item.tipo})</Text>
              </View>
            )}
          />
        </View>
      )}
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
  resultContainer: { marginTop: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  movimentacaoItem: { paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ddd' }
});
