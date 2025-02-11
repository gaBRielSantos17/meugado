import { ref, set, push } from 'firebase/database';
import { Alert } from "react-native";
import { DB } from '../constants/firebaseConsts';

export const cadastrarAnimal = async (brincoRFID, idade, sexo, raca, origem, historico) => {
  if (!brincoRFID || !idade || !sexo || !raca || !origem) {
    Alert.alert("Atenção", "Os campos Brinco RFID, Idade, Sexo, Raça e Origem são obrigatórios.");
    return;
  }

  try {
    const novoAnimalRef = push(ref(DB, 'animais')); // Cria um novo ID único para o animal
    await set(novoAnimalRef, {
      id: novoAnimalRef.key,
      brincoRFID,
      idade,
      sexo,
      raca,
      origem,
      historico
    });

    Alert.alert("Sucesso", "Animal cadastrado com sucesso!");
  } catch (error) {
    Alert.alert("Erro", "Não foi possível cadastrar o animal. Tente novamente.");
    console.error("Erro ao cadastrar animal:", error);
  }
};
