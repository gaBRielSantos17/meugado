import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CadastroAnimalScreen() {
  const [brinco, setBrinco] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [origem, setOrigem] = useState('');
  const [historico, setHistorico] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Animais</Text>

      <TextInput
        style={styles.input}
        placeholder="Brinco RFID"
        value={brinco}
        onChangeText={setBrinco}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexo"
        value={sexo}
        onChangeText={setSexo}
      />
      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={raca}
        onChangeText={setRaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Origem"
        value={origem}
        onChangeText={setOrigem}
      />
      <TextInput
        style={styles.input}
        placeholder="Histórico de Movimentação"
        value={historico}
        onChangeText={setHistorico}
        multiline
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Animal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 8 },
  button: { backgroundColor: '#4682B4', padding: 15, alignItems: 'center', marginTop: 20, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

