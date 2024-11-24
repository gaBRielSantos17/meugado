import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReportScreen = () => {
  const [movementType, setMovementType] = useState(""); // Tipo de movimentação
  const [startDate, setStartDate] = useState(new Date()); // Data inicial
  const [endDate, setEndDate] = useState(new Date()); // Data final
  const [showStartPicker, setShowStartPicker] = useState(false); // Exibição do calendário inicial
  const [showEndPicker, setShowEndPicker] = useState(false); // Exibição do calendário final

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geração de Relatório</Text>

      {/* Seleção do tipo de movimentação */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tipo de Movimentação</Text>
        <Picker
          selectedValue={movementType}
          style={styles.picker}
          onValueChange={(itemValue) => setMovementType(itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Vacinação" value="vacinação" />
          <Picker.Item label="Abate" value="abate" />
          <Picker.Item label="Venda" value="venda" />
          <Picker.Item label="Cria" value="cria" />
          <Picker.Item label="Nascimento" value="nascimento" />
          <Picker.Item label="Compra" value="compra" />
        </Picker>
      </View>

      {/* Campos de data */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data Inicial</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowStartPicker(true)}
        >
          <Text>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data Final</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowEndPicker(true)}
        >
          <Text>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}
      </View>

      {/* Botão de gerar relatório */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReportScreen;
