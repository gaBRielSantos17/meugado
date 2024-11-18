import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CadastroPropriedadeScreen() {
  const [numeroPropriedade, setNumeroPropriedade] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [licencaAmbiental, setLicencaAmbiental] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Propriedades</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da Propriedade"
        value={numeroPropriedade}
        onChangeText={setNumeroPropriedade}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Tamanho"
        value={tamanho}
        onChangeText={setTamanho}
      />
      <TextInput
        style={styles.input}
        placeholder="Licença Ambiental"
        value={licencaAmbiental}
        onChangeText={setLicencaAmbiental}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar Propriedade</Text>
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