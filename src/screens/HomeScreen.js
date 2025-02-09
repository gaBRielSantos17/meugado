import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação, se desejar
    if (username && password) {
      navigation.navigate('CattleDetails'); // Navega para a tela de detalhes do gado após o login
    } else {
      alert('Por favor, preencha o nome de usuário e a senha');
    }
  };

  const handlePasswordRecovery = () => {
    // Lógica para recuperar a senha pode ser implementada aqui
    alert('Função de recuperação de senha não implementada.');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png') } // Substitua pela URL da imagem de gado ou um caminho local
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={handlePasswordRecovery} style={styles.recoveryButton}>
        <Text style={styles.recoveryText}>Recuperar Senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  recoveryButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  recoveryText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
