import {set,ref,onValue,get,child} from 'firebase/database'
import { DB } from '../constants/firebaseConsts';
export const getAnimalsId = async (idUser) => {
  const dbRef = ref(DB);
  
  try {
      const snapshot = await get(child(dbRef, `animais/${idUser}`));
      if (snapshot.exists()) {
          console.log("animais", Object.values(snapshot.val()));
          return Object.values(snapshot.val());
      } else {
          return [];
      }
  } catch (error) {
      console.error(error);
      return [];
  }
};

