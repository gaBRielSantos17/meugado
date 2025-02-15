import React, { useEffect, useState } from "react";
import { cadastrarAnimal } from "../services/animalService";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { sexos, idades, racas } from "../constants/cattleInfo";
import { DataContext } from "../contexts/userIdContext";
import { useContext } from "react";
import { getPropertyUser } from "../services/getPropertyUser";
import CustomDropdown from "../components/CustomDropDown";

export default function CadastroAnimalScreen() {
  const [brincoRFID, setBrincoRFID] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [raca, setRaca] = useState("");
  const [origem, setOrigem] = useState("");
  const [properties, setProperties] = useState([]);
  const { idUser } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPropertyUser(idUser._j);
      setProperties(
        data.map((prop) => ({
          title: `${prop.nome} - ${prop.numero}`,
          icon: "home",
        }))
      );
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
      <CustomDropdown
        data={idades}
        selectedItem={idade}
        setSelectedItem={setIdade}
        placeholder="Selecione a Idade"
      />

      <CustomDropdown
        data={sexos}
        selectedItem={sexo}
        setSelectedItem={setSexo}
        placeholder="Selecione o Sexo"
      />

      <CustomDropdown
        data={racas}
        selectedItem={raca}
        setSelectedItem={setRaca}
        placeholder="Selecione a Raça"
      />

      <CustomDropdown
        data={
          properties.length > 0
            ? properties
            : [{ title: "Você não possui propriedades no momento" }]
        }
        selectedItem={origem}
        setSelectedItem={setOrigem}
        placeholder="Selecione a Propriedade"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          cadastrarAnimal(brincoRFID, idade, sexo, raca, origem, idUser._j)
        }
      >
        <Text style={styles.buttonText}>Salvar Animal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
