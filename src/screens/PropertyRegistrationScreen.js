import React, { useState, useEffect } from 'react';
import { registerProperty } from '../services/registerProperty';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation

export default function CadastroPropriedadeScreen() {
  const navigation = useNavigation(); // Use o hook useNavigation para acessar o objeto navigation

  const [nomePropriedade, setNomePropriedade] = useState('');
  const [numeroPropriedade, setNumeroPropriedade] = useState('');
  const [localizacao, setLocalizacao] = useState(null);
  const [tamanho, setTamanho] = useState('');
  const [tamanhoM2, setTamanhoM2] = useState('');
  const [licencaAmbiental, setLicencaAmbiental] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative a localização para usar o mapa.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocalizacao({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleTamanhoChange = (valor) => {
    setTamanho(valor);
    const tamanhoEmMetros = parseFloat(valor) * 10000; // 1 hectare = 10.000 m²
    setTamanhoM2(tamanhoEmMetros.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Propriedades</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Propriedade"
        value={nomePropriedade}
        onChangeText={setNomePropriedade}
      />
      <TextInput
        style={styles.input}
        placeholder="Número da Propriedade"
        value={numeroPropriedade}
        onChangeText={setNumeroPropriedade}
      />
      {localizacao && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: localizacao.latitude,
            longitude: localizacao.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={localizacao} title="Sua Localização" />
        </MapView>
      )}
      <TextInput
        style={styles.input}
        placeholder="Tamanho (em hectares)"
        value={tamanho}
        keyboardType="numeric"
        onChangeText={handleTamanhoChange}
      />
      {tamanhoM2 ? <Text style={styles.label}>Tamanho em m²: {tamanhoM2}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Licença Ambiental"
        value={licencaAmbiental}
        onChangeText={setLicencaAmbiental}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        if (localizacao) {
            registerProperty(nomePropriedade, numeroPropriedade, 
              localizacao.latitude, localizacao.longitude, tamanho, licencaAmbiental, navigation);
          }
        else {
          Alert.alert('Erro', 'Localização não disponível.');
          }
        }
      }>
    <Text style={styles.buttonText}>Salvar Propriedade</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 15,
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