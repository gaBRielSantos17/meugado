import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function MainDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Cadastro de Propriedades" onPress={() => navigation.navigate('PropertyRegistration')} />
      <Button title="Cadastro de Animais" onPress={() => navigation.navigate('AnimalRegistration')} />
      <Button title="Movimentação de Animais" onPress={() => navigation.navigate('AnimalMovement')} />
      <Button title="Controle Sanitário" onPress={() => navigation.navigate('HealthControl')} />
      <Button title="Relatórios" onPress={() => navigation.navigate('Reports')} />
      <Button title="Integração SRBIPA" onPress={() => navigation.navigate('SRBIPAIntegration')} />
      <Button title="Configurações" onPress={() => navigation.navigate('Settings')} />
      <Button title="Suporte e Ajuda" onPress={() => navigation.navigate('Support')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-around'}
});
