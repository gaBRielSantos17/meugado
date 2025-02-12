import {set,ref,onValue,get,child} from 'firebase/database'
import { DB } from '../constants/firebaseConsts'

export const getPropertyUser = async (idUser) => {
  const dbRef = ref(DB);
  
  try {
      const snapshot = await get(child(dbRef, `properties/${idUser}`));
      if (snapshot.exists()) {
          console.log("properties:", Object.values(snapshot.val())[0].id);
          return Object.values(snapshot.val());
      } else {
          return [];
      }
  } catch (error) {
      console.error(error);
      return [];
  }
};
