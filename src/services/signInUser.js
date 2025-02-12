import { AUTH, DB } from '../constants/firebaseConsts';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { handleAuthError } from "../helpers/handleAuthError";

export const signInUser = async (email, password, navigation) => {
  console.log('funcionou aqui')
  try {
    const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
    console.log("executou")
    if(userCredential.user.uid){
      navigation.navigate('Menu Principal');
      return userCredential.user.uid
    }
  } catch (err) {
    handleAuthError(err);
  }
};