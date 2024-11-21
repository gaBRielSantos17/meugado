import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RelatorioScreen() {
  const [periodo, setPeriodo] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geração de Relatórios</Text>
      <TextInput
        style={styles.input}
        placeholder="Período (Ex: 01/01/2023 - 31/12/2023)"
        value={periodo}
        onChangeText={setPeriodo}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});