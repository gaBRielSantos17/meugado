import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert} from 'react-native';
import { AUTH,DB } from '../../constants/firebaseConsts';
import { ref , set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function CadastroUsuarioScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('')
  const [token,setToken] = useState('')


 async  function signUpUser(){
    if( email && name && password && address ) 
    {
     await   createUserWithEmailAndPassword(AUTH ,email, password)
        .then( userCredential => {
          set(ref(DB,'users/' + userCredential.user.uid), {
            id : userCredential.user.uid,
            name : name,
            email : email,
            password : password,
            token:token
          })
          Alert.alert("Usuário",
            "Usuário cadastrado com sucesso",
            [    
              { text: "OK", onPress: () => navigation.navigate('Login') }
            ]
            );
        }
        
        )
        .catch(err => {
          console.log(`mensagem: ${err.message} code: ${err.code}`);
          if (err.code === 'auth/email-already-in-use') {
            Alert.alert("Atenção",'E-mail já existente');
            
            return;
          } else if (err.code === 'auth/internal-error') {
            Alert.alert("Atenção",'existem campos a serem preenchidos');

            return;
          }
          else if (err.code === 'auth/invalid-email') {
            Alert.alert("Atenção",'E-mail inválido, verifique espaços em branco ou caracteres inválidos');
            return;
          }
          else if (err.code === 'auth/weak-password') {
            Alert.alert("Atenção",'Sua senha deve ter no mínimo 6 caracteres');

            return;
          }
        });
      
    } 
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
       <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={signUpUser}>
        <Text style={styles.buttonText}>Salvar Usuário</Text>
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
