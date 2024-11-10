import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function IntegracaoSRBIPAScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integração com SRBIPA</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Relatório Geral</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' }
});
