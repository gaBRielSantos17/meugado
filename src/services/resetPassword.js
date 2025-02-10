 
 import { sendPasswordResetEmail } from 'firebase/auth';
 import { Alert} from 'react-native';
import { AUTH } from '../constants/firebaseConsts';
import { handleAuthError } from '../helpers/handleAuthError'; 
 
 export const passwordReset = async (email,navigation) =>{
    if(!email){
      Alert.alert("Atenção", "O campo email é obrigatório");
      return
    }
    try{
       await sendPasswordResetEmail(AUTH,email)
       Alert.alert("Atenção", "Seu pedido foi processado! Confira seu e-mail para redefinir sua senha.");
       navigation.navigate('Login')
      }
     catch(err){
        handleAuthError(err)
    }
  }