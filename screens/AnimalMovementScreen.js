import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovimentacaoScreen() {
  const [tipoEvento, setTipoEvento] = useState('');
  const [idAnimal, setIdAnimal] = useState('');
  const [dataMovimento, setDataMovimento] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentação e Rastreamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo de Evento"
        value={tipoEvento}
        onChangeText={setTipoEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Animal"
        value={idAnimal}
        onChangeText={setIdAnimal}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Movimento"
        value={dataMovimento}
        onChangeText={setDataMovimento}
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrar Movimento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  label: { fontSize: 16, marginTop: 10 }
});
