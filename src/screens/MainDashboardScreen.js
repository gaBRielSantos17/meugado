import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MainDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cadastro de Animal')}
        >
          <MaterialCommunityIcons name="cow" size={30} color="white" />
          <Text style={styles.buttonText}>Cadastro de Animais</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cadastro de Propriedade')}
        >
          <FontAwesome5 name="user" size={25} color="white" />
          <Text style={styles.buttonText}>Cadastro de Propriedades</Text>
        </TouchableOpacity> 
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Movimentação de Animais')}
        >
          <FontAwesome5 name="road" size={24} color="white" />
          <Text style={styles.buttonText}>Movimentação de Animais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Controle Sanitário')}
        >
          <FontAwesome5 name="syringe" size={24} color="white" />
          <Text style={styles.buttonText}>Controle Sanitário</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Relatórios')}
        >
          <FontAwesome5 name="file" size={24} color="white" />
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Integração SRBIPA')}
        >
          <FontAwesome5 name="network-wired" size={24} color="white" />
          <Text style={styles.buttonText}>Integração SRBIPA</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Configurações')}
        >
          <FontAwesome5 name="cogs" size={24} color="white" />
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Suporte e Ajuda')}
        >
          <FontAwesome5 name="phone" size={24} color="white" />
          <Text style={styles.buttonText}>Suporte e Ajuda</Text>
        </TouchableOpacity>
      </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    width: '40%',
    aspectRatio: 1,
  },
  buttonText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
});
