import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RelatoriosScreen() {
  const [periodo, setPeriodo] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geração de Relatórios</Text>

      <TextInput
        style={styles.input}
        placeholder="Período"
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
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' }
});
