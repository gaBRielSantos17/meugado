import { AUTH, DB } from '../constants/firebaseConsts';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { Alert } from "react-native";
import { handleAuthError } from "../helpers/handleAuthError";


export const signInUser = async (email, password, navigation) => {
  try {
    const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
    if(userCredential.user.uid){
      navigation.navigate('Menu Principal');
    }
  } catch (err) {
    handleAuthError(err);
  }
};