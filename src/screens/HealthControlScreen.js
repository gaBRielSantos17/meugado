import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataContext } from "../contexts/userIdContext";
import { useContext } from "react";
import { getAnimalsId } from "../services/getAnimalsId";
import { registerHealthControl } from "../services/registerHealthControl";
import { vacinas } from "../constants/cattleInfo";
import CustomDropdown from "../components/CustomDropDown";

export default function ControleSanitarioScreen() {
  const [tipoVacina, setTipoVacina] = useState("");
  const [idAnimal, setIdAnimal] = useState("");
  const [brinco, setBrinco] = useState("");
  const [animals, setAnimals] = useState([]);
  const [vacinaSelecionada, setVacinaSelecionada] = useState("");
  const [date, setDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const { idUser } = useContext(DataContext);

  
  const onChangeDate = (event, selectedDate) => {
    setShowStartPicker(false);
    console.log(selectedDate);
    if (selectedDate) setDate(selectedDate);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimalsId(idUser._j);
      setAnimals(
        data.map((prop) => ({
          title: `${prop.brincoRFID}`,
          idAnimal: prop.id,
          icon: "cow",
        }))
      );
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Sanitário</Text>
      <CustomDropdown
        data={vacinas}
        selectedItem={tipoVacina}
        setSelectedItem={setTipoVacina}
        placeholder="Selecione a Vacina"/>

      <TextInput
              style={styles.input}
              placeholder="Data da Movimentação"
              value={date}
              onChangeText={setDate}
            />

      <CustomDropdown
        data={
          animals && animals.length > 0
            ? animals
            : [{ brincoRFID: "Você não possui gado cadastrado no momento" }]
        }

        selectedItem={idAnimal}
        setSelectedItem={setIdAnimal}
        placeholder="Selecione o Animal"/>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          registerHealthControl(idAnimal, tipoVacina, date, idUser._j)
        }
      >
        <Text style={styles.buttonText}>Salvar Controle Sanitário</Text>
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
  dropdownButtonStyle: {
    width: "100%",
    height: "40",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
