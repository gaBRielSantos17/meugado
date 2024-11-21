import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";

const SRBIPAScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", 
        copyToCacheDirectory: true,
        multiple: true, 
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        if (file.name.endsWith(".pdf")) {
          setSelectedFile(file);
        } else {
          Alert.alert("Erro", "Por favor, selecione um arquivo no formato PDF.");
        }
      } else if (result.canceled) {
        Alert.alert("Seleção cancelada", "Nenhum arquivo foi selecionado.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao selecionar o arquivo.");
    }
  };

  const sendReport = async () => {
    if (!selectedFile) {
      Alert.alert("Erro", "Por favor, anexe um relatório antes de enviar.");
      return;
    }

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Erro",
          "O envio de e-mails não está disponível neste dispositivo."
        );
        return;
      }

      await MailComposer.composeAsync({
        recipients: ["jbielzinho4@gmail.com"],
        subject: "Relatório enviado pelo App SRBIPA",
        body: "Segue em anexo o relatório solicitado.",
        attachments: [selectedFile.uri],
      });

      setSelectedFile(null);

      Alert.alert("Sucesso", "Relatório enviado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o relatório.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integração com SRBIPA</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Text style={styles.uploadButtonText}>
          {selectedFile ? "Trocar Relatório" : "Anexar Relatório"}
        </Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.fileName}>Arquivo: {selectedFile.name}</Text>
      )}

      <TouchableOpacity style={styles.sendButton} onPress={sendReport}>
        <Text style={styles.sendButtonText}>Enviar Relatório</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  uploadButton: {
    width:'80%',
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign:'center',
    
  },
  fileName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    height:50,
  },
  sendButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SRBIPAScreen;
