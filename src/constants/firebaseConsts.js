
import { getAuth } from 'firebase/auth';
import { getDatabase} from 'firebase/database';
import { FIREBASE_APP } from '../../firebaseConfig';

export const DB = getDatabase(FIREBASE_APP,"https://mycattle-3e460-default-rtdb.firebaseio.com/")
export const AUTH = getAuth(FIREBASE_APP)