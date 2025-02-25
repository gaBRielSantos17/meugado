import { AUTH, DB } from '../constants/firebaseConsts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { Alert } from "react-native";
import { handleAuthError } from "../helpers/handleAuthError";

export const signUpUser = async (email, name, address, password, token, navigation) => {
  if (!email || !name || !password || !address) {
    Alert.alert("Atenção", "Todos os campos são obrigatórios.");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(AUTH, email, password); // authentication
    await set(ref(DB, 'users/' + userCredential.user.uid), {
      id: userCredential.user.uid,
      name,
      address,
      email,
      token
    });
    Alert.alert("Usuário", "Usuário cadastrado com sucesso", [
      { text: "OK", onPress: () => navigation.navigate('Login') }
    ]);
  } catch (err) {
    handleAuthError(err);
  }
};