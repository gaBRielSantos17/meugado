import { AUTH, DB } from '../constants/firebaseConsts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue, set, push } from 'firebase/database';
import { Alert } from "react-native";
import { handleAuthError } from "../helpers/handleAuthError";

export const registerHealthControl = async (idAnimal,brinco,tipoVacina, date,userId) => {
  if (!idAnimal || !tipoVacina || !date) {
    Alert.alert("Atenção", "Todos os campos são obrigatórios.");
    return;
  }
  console.log('data aqui',date)
  try {

    await push(ref(DB, 'controlHealth/' + idAnimal), {
      userId: userId,
      brincoRFID : brinco,
      tipoVacina : tipoVacina,
      dataVacina:new Date(date).toISOString()
    });
    Alert.alert("Usuário", "Controle de vacina cadastrado com sucesso");
  } catch (err) {
    console.log(err)
    Alert.alert("Atenção", "Não foi possível cadastrar controle de vacina.");
  }
};