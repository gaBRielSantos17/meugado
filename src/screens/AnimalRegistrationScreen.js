import React, { useEffect, useState } from 'react';
import { cadastrarAnimal } from '../services/animalService';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataContext } from '../contexts/userIdContext';
import { useContext  } from 'react';
import { getPropertyUser } from '../services/getPropertyUser';

export default function CadastroAnimalScreen() {
  const [brincoRFID, setBrincoRFID] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [origem, setOrigem] = useState('');
  const [properties,setProperties] = useState([])
  const {idUser} = useContext(DataContext)

  const idades = Array.from({ length: 50 }, (_, i) => ({ title: (i + 1).toString(), icon: 'calendar' }));
  const sexos = [
    { title: 'M', icon: 'gender-male' },
    { title: 'F', icon: 'gender-female' }
  ];
  const racas = [
    { title: 'Nelore', icon: 'cow' },
    { title: 'Angus', icon: 'cow' },
    { title: 'Brahman', icon: 'cow' },
    { title: 'Senepol', icon: 'cow' },
    { title: 'Sindi', icon: 'cow' }
  ];
  useEffect(() => {
    const fetchData = async () => {
        const data = await getPropertyUser(idUser._j);
        setProperties(data.map(prop => ({ title: `${prop.nome} - ${prop.numero}`, icon: 'home' })));
    };

    fetchData();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Animais</Text>
      <TextInput
        style={styles.input}
        placeholder="Brinco RFID"
        value={brincoRFID}
        onChangeText={setBrincoRFID}
      />
       <SelectDropdown
        data={idades}
        onSelect={(selectedItem) => setIdade(selectedItem.title)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?.title || 'Selecione a Idade'}</Text>
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
        data={sexos}
        onSelect={(selectedItem) => setSexo(selectedItem.title)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?.title || 'Selecione o Sexo'}</Text>
            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}
      />
      <SelectDropdown
        data={racas}
        onSelect={(selectedItem) => setRaca(selectedItem.title)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem?.title || 'Selecione a Raça'}</Text>
            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}/>
     <SelectDropdown
  data={properties && properties.length > 0 
    ? properties
    : [{ title: "Você não possui propriedades no momento" }]
  }
  onSelect={(selectedItem) => {
    if (selectedItem.title !== "Você não possui propriedades no momento") {
      setOrigem(selectedItem.title);
    }
  }}
  renderButton={(selectedItem, isOpened) => (
    <View style={styles.dropdownButtonStyle}>
      <Icon name="home" style={styles.dropdownButtonIconStyle} />
      <Text style={styles.dropdownButtonTxtStyle}>
        {selectedItem?.title || 'Selecione a Propriedade'}
      </Text>
      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
    </View>
  )}
  renderItem={(item, index, isSelected) => (
    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
      <Icon name="map-marker" style={styles.dropdownItemIconStyle} />
      <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
    </View>
  )}
  disableAutoScroll={true}
  showsVerticalScrollIndicator={false}
/>
<TouchableOpacity style={styles.button} onPress={() => cadastrarAnimal(brincoRFID, idade, sexo, raca, origem,idUser._j)}>
  <Text style={styles.buttonText}>Salvar Animal</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
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
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});