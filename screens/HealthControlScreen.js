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
        <Text style={styles.buttonText}>Registrar Vacinação</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});
