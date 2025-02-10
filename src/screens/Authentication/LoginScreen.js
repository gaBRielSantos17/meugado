import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AUTH,DB } from '../../constants/firebaseConsts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onValue ,ref} from 'firebase/database';
export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('')

 function signInUser () {
    signInWithEmailAndPassword(AUTH, email, password)
     .then(userCredential => {
        const userRef = ref(DB,'users/' + userCredential.user.uid)

        onValue(userRef, snapshot => {
           const data = snapshot.val()
          
           if(data.password === password){
             navigation.navigate('Menu Principal')
           }
        })
     })
     .catch(err => {
      console.log(err)
      if (err.code === 'auth/invalid-email') {
        Alert.alert('E-mail incorreto','verifique espaços em branco ou caracteres inválidos!')
      } 
      else if (err.code === 'auth/invalid-credential') {
        Alert.alert('Atenção','Credenciais Inválidas')
      }
      else if (err.code === 'auth/internal-error') {
        Alert.alert('Atenção','Erro interno')
      } else if (err.code === 'auth/user-not-found') {
        Alert.alert('Atenção','Usuário não encontrado!')
      } else if (err.code === 'auth/wrong-password') {
        Alert.alert('Atenção','Atenção, senha incorreta!')
      }
       else if (err.code === 'auth/weak-password') {
                  Alert.alert("Atenção",'Sua senha deve ter no mínimo 6 caracteres');
       }
    });
  }
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
      <TouchableOpacity style={styles.button} onPress={signInUser}>
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
