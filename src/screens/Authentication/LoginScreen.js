import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { signInUser } from '../../services/signInUser';
export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('')

  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Faça seu Login</Text>
      
      {/* Campos de texto para nome de usuário e senha */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {/* Botão de Login */}
      <TouchableOpacity style={styles.button} onPress={() => signInUser(email,password,navigation)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Link de esqueci minha senha e registro */}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => alert('Função de recuperação de senha')}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro de Usuario')}>
          <Text style={styles.linkText}>Registrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  logo: { width: 180, height: 100, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    width: '100%', 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 25, 
    marginBottom: 15 
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkContainer: { flexDirection: 'row', marginTop: 15 },
  linkText: { color: '#4CAF50', fontSize: 14 },
  separator: { color: '#4CAF50', fontSize: 14, marginHorizontal: 5 },
});
