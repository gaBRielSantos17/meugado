import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function SupportScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suporte e Ajuda</Text>
      <Button title="Chat com Suporte" onPress={() => {}} />
      <Button title="Ver FAQ" onPress={() => {}} />
      <Button title="Relatar um Problema" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' }
});
