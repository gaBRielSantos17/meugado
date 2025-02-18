import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing'
import { reportMovement } from "../services/reportMovement"; // Certifique-se que o caminho está correto

const ReportScreen = () => {
  const [movementType, setMovementType] = useState(""); // Tipo de movimentação
  const [startDate, setStartDate] = useState(""); // Data inicial
  const [endDate, setEndDate] = useState(""); // Data final


  const generatePDF = async () => {
    const reportData = await reportMovement(movementType, startDate, endDate);

    const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: Arial, sans-serif; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Relatório de Movimentações</h1>
        <h2>Tipo: ${movementType}</h2>
        <table>
          <tr>
            <th>Idade</th>
            <th>Origem</th>
            <th>Raça</th>
            <th>Sexo</th>
            <th>Data do Movimento</th>
            <th>Brinco RFID</th>
          </tr>
          ${reportData.map(data => `
            <tr>
              <td>${data.idade || "N/A"}</td>
              <td>${data.origem || "N/A"}</td>
              <td>${data.raca || "N/A"}</td>
              <td>${data.sexo || "N/A"}</td>
              <td>${data.dataMovimento || "N/A"}</td>
              <td>${data.brincoRFID || "N/A"}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;
  
    try {
      const {uri} = await Print.printToFileAsync({ 
        html: htmlContent,
        base64: false
      });
      Alert.alert("PDF Gerado", `O relatório foi salvo!!`);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })

    //  await Print.printAsync({htmlContent})
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      Alert.alert("Erro", "Falha ao gerar PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geração de Relatório</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tipo de Movimentação</Text>
        <Picker
          selectedValue={movementType}
          style={styles.picker}
          onValueChange={(itemValue) => setMovementType(itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Vacinação" value="Vacinação" />
          <Picker.Item label="Abate" value="Abate" />
          <Picker.Item label="Venda" value="Venda" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data Inicial</Text>
        <TextInput 
          style={styles.dateInput}
          value={startDate}
          placeholder="DD/MM/YYYY"
          onChangeText={setStartDate}
          
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data Final</Text>
        <TextInput 
          style={styles.dateInput}
          value={endDate}
          placeholder="DD/MM/YYYY"
          onChangeText={setEndDate}
          
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePDF}>
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
