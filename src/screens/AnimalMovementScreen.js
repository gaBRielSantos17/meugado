import React, { useState, useEffect } from 'react';
import { animalMovement, getBrincos } from '../services/animalMovement'; // Supondo que você tenha um serviço para buscar os brincos
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MovimentacaoScreen() {
  const [tipoEvento, setTipoEvento] = useState('');
  const [brincoRFID, setBrincoRFID] = useState('');
  const [dataMovimento, setDataMovimento] = useState('');
  const [brincos, setBrincos] = useState([]);

  const eventos = [
    { title: 'Vacinação' },
    { title: 'Abate' },
    { title: 'Venda' },
    { title: 'Cria' },
    { title: 'Nascimento' },
    { title: 'Compra' }
  ];

  useEffect(() => {
    async function fetchBrincos() {
      const brincosLista = await getBrincos();
      setBrincos(brincosLista);
    }

    fetchBrincos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentação de Animais</Text>

      
      <SelectDropdown
        data={eventos}
        onSelect={(selectedItem) => setTipoEvento(selectedItem.title)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?.title || 'Tipos de Movimentações'}</Text>
            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}
      />

      
      <SelectDropdown
        data={brincos}
        onSelect={(selectedItem) => setIdAnimal(selectedItem)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem || 'Selecione um Brinco'}</Text>
            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Data da Movimentação"
        value={dataMovimento}
        onChangeText={setDataMovimento}
      />

      <TouchableOpacity style={styles.button} onPress={() => animalMovement(tipoEvento, brincoRFID, dataMovimento)}>
        <Text style={styles.buttonText}>Salvar Movimentação</Text>
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
  dropdownButtonStyle: {
    width: '100%',
    height:'40',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 15,
  },
  dropdownButtonIconStyle: {
    fontSize: 18,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 18,
    marginRight: 8,
  },
});

{/* <TextInput
        style={styles.input}
        placeholder="Tipo de Evento (Venda, Abate, etc.)"
        value={tipoEvento}
        onChangeText={setTipoEvento}
      /> */}