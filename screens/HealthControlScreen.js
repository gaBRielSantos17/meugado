import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ControleSanitarioScreen() {
  const [tipoVacina, setTipoVacina] = useState('');
  const [dataVacina, setDataVacina] = useState('');
  const [idAnimal, setIdAnimal] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Sanitário</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de Vacina"
        value={tipoVacina}
        onChangeText={setTipoVacina}
      />
      <TextInput
        style={styles.input}
        placeholder="Data da Vacina"
        value={dataVacina}
        onChangeText={setDataVacina}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Animal"
        value={idAnimal}
        onChangeText={setIdAnimal}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar Controle Sanitário</Text>
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
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});