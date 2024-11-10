import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações e Perfil</Text>
      <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} value={name} />
      <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Telefone" onChangeText={setPhone} value={phone} />
      <Button title="Salvar Alterações" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});
